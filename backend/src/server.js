import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import url from 'url';

import authRouter from './routes/auth.js';
import gameRouter from './routes/game.js';
import { verifyToken } from './middleware/auth.js';
import { startSession, stopSession } from './services/gameSession.js';
import { supabase } from './services/supabase.js';
import { generateSummary } from './services/ai.js';
import * as roomManager from './services/roomManager.js';
import { generateCoachTip } from './services/coachTip.js';
import {
    initSessionRuntime,
    stopSessionRuntime,
    setSessionProfile,
    recordPlayerAction,
    recordStateUpdate,
    recordEventResolved,
    recordEventTriggered,
    getSessionContext
} from './services/sessionRuntime.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const isProd = String(process.env.NODE_ENV || '').toLowerCase() === 'production';

function isBattleSessionId(sessionId) {
    return typeof sessionId === 'string' && sessionId.startsWith('battle_');
}

function makeBattleSessionId(roomCode, userId) {
    const code = String(roomCode || '').trim().toUpperCase();
    return `battle_${code}_${userId}`;
}

function scheduleBattleCoach(ws, sessionId) {
    const sendTip = async () => {
        if (!ws || ws.readyState !== 1) return;
        try {
            const ctx = getSessionContext(sessionId);
            const tip = await generateCoachTip({ sessionCtx: ctx });
            if (ws.readyState === 1) ws.send(JSON.stringify({ type: 'coach_tip', tip }));
        } catch {
            // best-effort
        }

        // next in [18..32] seconds
        const nextDelay = 18000 + Math.floor(Math.random() * 14000);
        ws._battleCoachTimer = setTimeout(sendTip, nextDelay);
    };

    // first tip in [12..20] seconds
    const firstDelay = 12000 + Math.floor(Math.random() * 8000);
    ws._battleCoachTimer = setTimeout(sendTip, firstDelay);
}

// ─── Middleware ──────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── REST Routes ─────────────────────────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/game', gameRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// ─── HTTP + WebSocket Server ──────────────────────────────────────
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Map: userId → WebSocket (one active connection per user)
const connectedUsers = new Map();

function computeDisplayName(profile, authUser) {
    const p = profile || {};
    const u = authUser || {};
    return (
        p.username ||
        p.full_name ||
        u.user_metadata?.username ||
        u.user_metadata?.full_name ||
        'CEO'
    );
}

const broadcastToRoom = (code, message) => {
    const room = roomManager.getRoom(code);
    if (!room) return;

    const payload = typeof message === 'string' ? null : message;
    const wire = typeof message === 'string' ? message : JSON.stringify(message);

    // Feed Battle coach runtime with global challenges so tips can reference them.
    if (payload?.type === 'ai_global_challenge' && payload?.challenge) {
        for (const p of room.players) {
            const sid = makeBattleSessionId(room.code, p.id);
            recordEventTriggered(sid, {
                id: String(payload.challenge.id || 'ai_global_challenge'),
                title: String(payload.challenge.title || 'Global Challenge'),
                urgency: String(payload.challenge.urgency || 'HIGH'),
                severityMult: 1
            });
        }
    }

    room.players.forEach(p => {
        const playerWs = connectedUsers.get(p.id);
        if (playerWs && playerWs.readyState === 1) playerWs.send(wire);
    });
};

wss.on('connection', async (ws, req) => {
    // Parse token from query string: ws://localhost:3001?token=xxx
    const { query } = url.parse(req.url, true);
    const user = await verifyToken(query.token);

    if (!user) {
        ws.close(4001, 'Unauthorized');
        return;
    }

    const userId = user.sub;

    // WS tokens only give us the Supabase Auth user; fetch profile for username/full_name.
    let profile = null;
    try {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        profile = data || null;
    } catch {
        profile = null;
    }

    const displayName = computeDisplayName(profile, user);
    const mergedUser = { ...user, ...(profile || {}) };
    ws.userProfile = mergedUser;
    connectedUsers.set(userId, ws);
    console.log(`[WS] User ${userId} connected`);

    ws.send(JSON.stringify({ type: 'connected', message: 'Welcome to Empire Protocol!' }));

    ws.on('message', async (raw) => {
        let msg;
        try {
            msg = JSON.parse(raw.toString());
        } catch {
            return;
        }

        const { type, sessionId, roomCode: dataRoomCode } = msg; // Renamed roomCode from msg to dataRoomCode to avoid conflict
        const normalizedRoomCode = String(dataRoomCode || '').trim().toUpperCase();
        const battleSessionId = makeBattleSessionId(normalizedRoomCode || ws.roomCode, userId);

        // ── Room Management ─────────────────────────────────────
        if (type === 'create_room') {
            const room = roomManager.createRoom(userId, displayName || 'CEO', mergedUser);
            ws.roomCode = room.code;
            ws.send(JSON.stringify({ type: 'room_created', code: room.code, room }));
        }

        if (type === 'join_room') {
            const roomCode = normalizedRoomCode;
            try {
                const room = roomManager.joinRoom(roomCode, userId, displayName || 'Guest', mergedUser);
                ws.roomCode = roomCode;
                // Broadcast to all players in the room
                const broadcast = JSON.stringify({ type: 'player_joined', players: room.players, room });
                room.players.forEach(p => {
                    const playerWs = connectedUsers.get(p.id);
                    if (playerWs && playerWs.readyState === 1) playerWs.send(broadcast);
                });
            } catch (err) {
                ws.send(JSON.stringify({ type: 'error', message: err.message }));
            }
        }

        if (type === 'start_battle') {
            try {
                const room = roomManager.startGame(normalizedRoomCode, userId, broadcastToRoom);
                const broadcast = JSON.stringify({ type: 'battle_started', room });
                broadcastToRoom(normalizedRoomCode, broadcast);
            } catch (err) {
                ws.send(JSON.stringify({ type: 'error', message: err.message }));
            }
        }

        // Starts a runtime-only "battle session" so existing coach/observer agents work in BattleGround.
        if (type === 'start_battle_session') {
            const roomCode = normalizedRoomCode || String(ws.roomCode || '').trim().toUpperCase();
            const room = roomManager.getRoom(roomCode);
            if (!room) {
                ws.send(JSON.stringify({ type: 'error', message: 'Room not found.' }));
                return;
            }
            if (room.status !== 'PLAYING') {
                ws.send(JSON.stringify({ type: 'error', message: 'Battle not started yet.' }));
                return;
            }
            if (!room.players.some(p => p.id === userId)) {
                ws.send(JSON.stringify({ type: 'error', message: 'You are not in this room.' }));
                return;
            }

            // Initialize runtime (no DB writes for BattleGround)
            initSessionRuntime(battleSessionId, { userId, profile: mergedUser });
            setSessionProfile(battleSessionId, mergedUser);
            ws.battleSessionId = battleSessionId;

            // (Re)start coach timer
            if (ws._battleCoachTimer) clearTimeout(ws._battleCoachTimer);
            scheduleBattleCoach(ws, battleSessionId);

            ws.send(JSON.stringify({ type: 'battle_session_started', sessionId: battleSessionId }));
        }

        // ── Social (Chat & Requests) ───────────────────────────
        if (type === 'chat') {
            const { text, toId } = msg;
            const room = roomManager.getRoom(ws.roomCode);
            if (!room) return;

            const chatMsg = JSON.stringify({
                type: 'chat',
                fromId: userId,
                fromName: displayName || 'CEO',
                text,
                isPrivate: !!toId
            });

            if (toId) {
                // Private message
                const targetWs = connectedUsers.get(toId);
                if (targetWs) targetWs.send(chatMsg);
                ws.send(chatMsg); // Send back to self
            } else {
                // Public room message
                room.players.forEach(p => {
                    const playerWs = connectedUsers.get(p.id);
                    if (playerWs) playerWs.send(chatMsg);
                });
            }
        }

        if (type === 'service_request') {
            const { toId, requestType, data } = msg;
            const targetWs = connectedUsers.get(toId);
            if (targetWs) {
                targetWs.send(JSON.stringify({
                    type: 'service_request',
                    fromId: userId,
                    fromName: displayName || 'CEO',
                    requestType,
                    data
                }));
            }
        }

        // ── WebSocket Logic ──────────────────────────────────────────
        if (type === 'start_game') {
            if (!sessionId) return;
            console.log(`[WS] User ${userId} starting session ${sessionId}`);

            // Fetch profile once so coach tips can tailor tone/age.
            let profile = null;
            try {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single();
                profile = data || null;
                if (profile) setSessionProfile(sessionId, profile);
            } catch {
                // ok
            }

            await startSession(sessionId, userId, ws, profile);
            ws.send(JSON.stringify({ type: 'session_started', sessionId }));
        }

        // ── Player Action ───────────────────────────────────────
        if (type === 'player_action') {
            const { actionId, buildingType, cost, elapsedSecs, effect } = msg;
            recordPlayerAction(sessionId, { actionId, buildingType, cost, elapsedSecs, effect });
            if (!isBattleSessionId(sessionId)) {
                await supabase.from('action_logs').insert({
                    session_id: sessionId,
                    timestamp_secs: elapsedSecs || 0,
                    action_type: 'player_action',
                    action_data: { actionId, buildingType, cost, effect }
                });
            }
        }

        // ── Periodic State Update (for Observer/Coach) ───────────
        if (type === 'state_update') {
            // This is not persisted (cheap) — used for deterministic analysis & coaching.
            recordStateUpdate(sessionId, msg);

            // Multiplayer: broadcast snapshots so rivals can compare stats.
            if (ws.roomCode) {
                const room = roomManager.getRoom(ws.roomCode);
                if (room && room.status === 'PLAYING') {
                    broadcastToRoom(ws.roomCode, {
                        type: 'player_state',
                        fromId: userId,
                        fromName: displayName || 'CEO',
                        state: {
                            cash: msg.cash,
                            revenue: msg.revenue,
                            morale: msg.morale,
                            reputation: msg.reputation,
                            debt: msg.debt,
                            equity: msg.equity,
                            timeLeft: msg.timeLeft
                        }
                    });
                }
            }
        }

        // ── Event Resolved ──────────────────────────────────────
        if (type === 'event_resolved') {
            const { eventId, actionId, elapsedSecs, cost } = msg;
            recordEventResolved(sessionId, eventId);
            if (!isBattleSessionId(sessionId)) {
                await supabase.from('action_logs').insert({
                    session_id: sessionId,
                    timestamp_secs: elapsedSecs || 0,
                    action_type: 'event_resolved',
                    action_data: { eventId, actionId, cost }
                });
            }
        }

        // ── Game Over ───────────────────────────────────────────
        if (type === 'game_over') {
            // BattleGround doesn't write game_sessions or summaries yet.
            if (isBattleSessionId(sessionId)) return;
            const { outcome, finalState } = msg;
            stopSession(sessionId);

            // Fetch profile + logs
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            const { data: logs } = await supabase
                .from('action_logs')
                .select('*')
                .eq('session_id', sessionId);

            // Fetch session info to know which level was just played
            const { data: sessionInfo } = await supabase
                .from('game_sessions')
                .select('level')
                .eq('id', sessionId)
                .single();

            const levelPlayed = sessionInfo?.level || 1;

            const sessionData = {
                id: sessionId,
                level: levelPlayed,
                outcome,
                final_cash: finalState.cash,
                final_revenue: finalState.revenue,
                final_morale: finalState.morale,
                final_reputation: finalState.reputation
            };

            // Generate AI summary
            console.log(`[WS] Generating AI summary for user ${userId} (session ${sessionId})...`);
            const aiSummary = await generateSummary(sessionData, logs || [], profile || { age: 10, full_name: 'Unknown CEO' });

            // Update session in DB
            const { error: sessionError } = await supabase.from('game_sessions').update({
                ended_at: new Date().toISOString(),
                outcome,
                final_cash: finalState.cash,
                final_revenue: finalState.revenue,
                final_morale: finalState.morale,
                final_reputation: finalState.reputation,
                ai_summary: aiSummary
            }).eq('id', sessionId);

            if (sessionError) console.error(`[WS] Failed to update session ${sessionId}:`, sessionError.message);

            // Update profile stats
            const isWin = outcome === 'win';
            const nextUnlocked = isWin ? Math.max(profile?.last_unlocked_level || 1, levelPlayed + 1) : (profile?.last_unlocked_level || 1);

            const { error: profileError } = await supabase.from('profiles').update({
                total_games: (profile?.total_games || 0) + 1,
                total_wins: (profile?.total_wins || 0) + (isWin ? 1 : 0),
                last_unlocked_level: nextUnlocked,
                tutorial_completed: true // Any game over (win/loss) after starting means tutorial is passed or skipped
            }).eq('id', userId);

            if (profileError) console.error(`[WS] Failed to update profile for user ${userId}:`, profileError.message);

            // Send summary back to player
            ws.send(JSON.stringify({ type: 'game_summary', summary: aiSummary, outcome }));
            console.log(`[WS] Session ${sessionId} ended: ${outcome} (Unlocked: ${nextUnlocked})`);
        }
    });

    ws.on('close', () => {
        console.log(`[WS] User ${userId} disconnected`);
        connectedUsers.delete(userId);

        if (ws._battleCoachTimer) {
            clearTimeout(ws._battleCoachTimer);
            ws._battleCoachTimer = null;
        }
        if (ws.battleSessionId) {
            stopSessionRuntime(ws.battleSessionId);
            ws.battleSessionId = null;
        }

        // Multiplayer Cleanup: Remove from room if exists
        if (ws.roomCode) {
            const room = roomManager.leaveRoom(ws.roomCode, userId);
            if (room) {
                const broadcast = JSON.stringify({ type: 'player_joined', players: room.players, room });
                room.players.forEach(p => {
                    const playerWs = connectedUsers.get(p.id);
                    if (playerWs) playerWs.send(broadcast);
                });
            }
        }
    });

    ws.on('error', (err) => {
        console.error(`[WS] Error for user ${userId}:`, err.message);
    });
});

// ─── Start ───────────────────────────────────────────────────────
server.listen(PORT, () => {
    console.log(`\n🚀 Empire Protocol Backend running on http://localhost:${PORT}`);
    console.log(`📡 WebSocket available on ws://localhost:${PORT}`);
});
