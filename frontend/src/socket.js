import { getToken } from './api.js';
import { tts } from './tts.js';

function isLocalhost() {
    const h = window.location.hostname;
    return h === 'localhost' || h === '127.0.0.1';
}

function stripTrailingSlash(s) {
    return String(s || '').replace(/\/+$/, '');
}

function computeWsUrl() {
    const envUrl = import.meta?.env?.VITE_WS_URL;
    if (envUrl) return stripTrailingSlash(envUrl);

    // If we're on Vite dev server (likely :5173) but opened via LAN IP,
    // the backend still runs on :3001 on the same host.
    const port = String(window.location.port || '');
    const host = window.location.hostname;
    if (port === '5173' || port === '4173') {
        const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        return `${proto}//${host}:3001`;
    }

    const origin = isLocalhost() ? 'http://localhost:3001' : window.location.origin;
    return stripTrailingSlash(origin).replace(/^http/i, 'ws');
}

const WS_URL = computeWsUrl();

export class GameSocket {
    constructor(game) {
        this.game = game;
        this.ws = null;
        this.sessionId = null;
        this.startTime = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            const token = getToken();
            if (!token) return reject(new Error('No auth token found.'));

            this.ws = new WebSocket(`${WS_URL}?token=${token}`);

            this.ws.onopen = () => {
                console.log('[WS] Connected to Empire Protocol server');
                resolve();
            };

            this.ws.onmessage = (event) => {
                let msg;
                try {
                    msg = JSON.parse(event.data);
                } catch (e) {
                    console.error('[WS] Failed to parse message', e);
                    return;
                }

                try {
                    this._handleMessage(msg);
                } catch (e) {
                    console.error('[WS] Message handler error', e);
                }
            };

            this.ws.onerror = (err) => {
                console.error('[WS] Connection error:', err);
                reject(err);
            };

            this.ws.onclose = () => {
                console.log('[WS] Disconnected');
            };
        });
    }

    _handleMessage(msg) {
        switch (msg.type) {
            case 'connected':
                console.log('[WS]', msg.message);
                break;

            case 'session_started':
                this.sessionId = msg.sessionId;
                this.startTime = Date.now();
                console.log('[WS] Session started:', this.sessionId);
                break;

            case 'battle_session_started':
                this.sessionId = msg.sessionId;
                this.startTime = Date.now();
                console.log('[WS] Battle session started:', this.sessionId);
                break;

            case 'game_event':
                // Forward the server-sent event into the frontend event system
                if (this.game.events) {
                    this.game.events.receiveServerEvent(msg.event);
                }
                break;

            case 'game_summary':
                // Show the end-game AI summary screen
                if (this.game.showSummary) {
                    this.game.showSummary(msg.summary, msg.outcome);
                    // Speak the encouragement
                    if (msg.summary && msg.summary.encouragement) {
                        try {
                            tts?.speak?.(msg.summary.encouragement);
                        } catch {
                            // ignore TTS errors (no voices / blocked autoplay)
                        }
                    }
                }
                break;

            case 'coach_tip':
                if (this.game?.events?.notify) {
                    const t = msg.tip || {};
                    const esc = (s) => String(s)
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;');
                    const lines = [];
                    if (t.tip) {
                        lines.push(`💡 ${esc(t.tip)}`);
                        // Speak only the tip as it's the most important
                        try {
                            tts?.speak?.(`Coach tip: ${t.tip}`);
                        } catch {
                            // ignore TTS errors (no voices / blocked autoplay)
                        }
                    }
                    if (t.reason) lines.push(`Why: ${esc(t.reason)}`);
                    if (t.next_action) lines.push(`Next: ${esc(t.next_action)}`);
                    const text = lines.join('<br/>');
                    this.game.events.notify(text, 'info');
                }
                break;

            case 'room_created':
                if (this.game.onRoomCreated) this.game.onRoomCreated(msg.code, msg.room);
                break;

            case 'player_joined':
                if (this.game.onPlayerJoined) this.game.onPlayerJoined(msg.players, msg.room);
                break;

            case 'battle_started':
                if (this.game.onBattleStarted) this.game.onBattleStarted(msg.room);
                break;

            case 'chat':
                if (this.game.onChatMessage) this.game.onChatMessage(msg);
                break;

            case 'service_request':
                if (this.game.onServiceRequest) this.game.onServiceRequest(msg);
                break;

            case 'ai_global_challenge':
                if (this.game.onGlobalChallenge) this.game.onGlobalChallenge(msg.challenge);
                break;

            case 'player_state':
                if (this.game.onPlayerStateUpdate) this.game.onPlayerStateUpdate(msg);
                break;

            case 'error':
                console.error('[WS Error]', msg.message);
                if (this.game.events) this.game.events.notify('❌ ' + msg.message);
                break;
        }
    }

    // ─── Emit helpers ──────────────────────────────────────────────────────────

    startGame(sessionId) {
        this.sessionId = sessionId;
        this._send({ type: 'start_game', sessionId });
    }

    sendAction(actionId, buildingType, cost, effect) {
        this._send({
            type: 'player_action',
            sessionId: this.sessionId,
            actionId,
            buildingType,
            cost,
            effect,
            elapsedSecs: this._elapsed()
        });
    }

    sendEventResolved(eventId, actionId, cost) {
        this._send({
            type: 'event_resolved',
            sessionId: this.sessionId,
            eventId,
            actionId,
            cost,
            elapsedSecs: this._elapsed()
        });
    }

    sendGameOver(outcome, finalState) {
        this._send({
            type: 'game_over',
            sessionId: this.sessionId,
            outcome,
            finalState
        });
    }

    sendStateUpdate(snapshot) {
        this._send({
            type: 'state_update',
            sessionId: this.sessionId,
            elapsedSecs: this._elapsed(),
            ...snapshot
        });
    }

    // ─── Multiplayer Room Helpers ──────────────────────────────────────────

    createRoom() {
        this._send({ type: 'create_room' });
    }

    joinRoom(roomCode) {
        this._send({ type: 'join_room', roomCode });
    }

    startBattle(roomCode) {
        this._send({ type: 'start_battle', roomCode });
    }

    startBattleSession(roomCode) {
        this._send({ type: 'start_battle_session', roomCode });
    }

    sendChat(text, toId = null) {
        this._send({ type: 'chat', text, toId });
    }

    sendServiceRequest(toId, requestType, data) {
        this._send({ type: 'service_request', toId, requestType, data });
    }

    _send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        } else {
            console.warn('[WS] Cannot send — not connected:', data);
        }
    }

    _elapsed() {
        if (!this.startTime) return 0;
        return Math.floor((Date.now() - this.startTime) / 1000);
    }

    disconnect() {
        if (this.ws) this.ws.close();
    }
}
