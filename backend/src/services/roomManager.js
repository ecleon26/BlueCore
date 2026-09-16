import * as challengeAgent from './challengeAgent.js';
import { refereeBattleEvent } from './referee.js';

const rooms = new Map();
const roomTimers = new Map();

/**
 * Generate a unique 6-character room code
 */
function generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code;
    do {
        code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    } while (rooms.has(code));
    return code;
}

export function createRoom(hostId, hostName, hostProfile = {}) {
    const code = generateRoomCode();
    const room = {
        code,
        hostId,
        players: [{
            id: hostId,
            name: hostName,
            isAdmin: true,
            age: hostProfile.age,
            style: hostProfile.play_style
        }],
        status: 'LOBBY',
        maxPlayers: 4,
        createdAt: Date.now(),
        // Challenge loop memory to prevent repetition
        _recentChallengeKeys: [],
        _lastChallengeAt: 0
    };
    rooms.set(code, room);
    return room;
}

function normalizeChallengeKey(challenge) {
    const title = String(challenge?.title || '').toLowerCase().replace(/\s+/g, ' ').trim();
    const key = String(challenge?.key || '').toLowerCase().replace(/\s+/g, ' ').trim();
    const building = String(challenge?.resolveBuilding || '').toLowerCase().trim();
    return `${key || title}|${building}`;
}

export function joinRoom(code, playerId, playerName, playerProfile = {}) {
    const room = rooms.get(code);
    if (!room) throw new Error('Room not found.');
    if (room.status !== 'LOBBY') throw new Error('Game already in progress.');
    if (room.players.length >= room.maxPlayers) throw new Error('Room is full.');

    // Check if player already in room
    if (room.players.find(p => p.id === playerId)) return room;

    room.players.push({
        id: playerId,
        name: playerName,
        isAdmin: false,
        age: playerProfile.age,
        style: playerProfile.play_style
    });
    return room;
}

export function leaveRoom(code, playerId) {
    const room = rooms.get(code);
    if (!room) return null;

    room.players = room.players.filter(p => p.id !== playerId);

    if (room.players.length === 0) {
        rooms.delete(code);
        return null;
    }

    // If host leaves, assign new host
    if (room.hostId === playerId) {
        room.hostId = room.players[0].id;
        room.players[0].isAdmin = true;
    }

    return room;
}

export function getRoom(code) {
    return rooms.get(code);
}

export function startGame(code, hostId, broadcastFn) {
    const room = rooms.get(code);
    if (!room) throw new Error('Room not found.');
    if (room.hostId !== hostId) throw new Error('Only host can start the game.');

    room.status = 'PLAYING';
    room.startTime = Date.now();

    // Start Challenge Loop
    startChallengeLoop(room, broadcastFn);

    return room;
}

function startChallengeLoop(room, broadcastFn) {
    const interval = 45000; // 45 seconds (prevents UI spam + keeps pacing readable)

    const t = setInterval(async () => {
        if (room.status !== 'PLAYING') {
            clearInterval(t);
            roomTimers.delete(room.code);
            return;
        }

        console.log(`[Room ${room.code}] Generating Global AI Challenge...`);
        const now = Date.now();
        // Hard cooldown in case timers drift
        if (room._lastChallengeAt && (now - room._lastChallengeAt) < 30000) return;

        const recent = Array.isArray(room._recentChallengeKeys) ? room._recentChallengeKeys.slice(-6) : [];
        let challenge = null;

        // Try a few times to avoid repeats (model can get sticky)
        for (let attempt = 0; attempt < 3; attempt++) {
            const candidate = await challengeAgent.generateGlobalChallenge(room.players, { recentKeys: recent });
            const normalizedKey = normalizeChallengeKey(candidate);
            if (!recent.includes(normalizedKey)) {
                challenge = candidate;
                break;
            }
        }

        if (!challenge) {
            // Guaranteed variety fallback
            challenge = challengeAgent.buildLibraryChallenge(recent);
        }

        challenge = refereeBattleEvent(challenge);
        const finalKey = normalizeChallengeKey(challenge);
        room._recentChallengeKeys = [...recent, finalKey].slice(-10);
        room._lastChallengeAt = now;

        broadcastFn(room.code, {
            type: 'ai_global_challenge',
            challenge
        });
    }, interval);

    roomTimers.set(room.code, t);
}

export function deleteRoom(code) {
    const timer = roomTimers.get(code);
    if (timer) {
        clearInterval(timer);
        roomTimers.delete(code);
    }
    rooms.delete(code);
}
