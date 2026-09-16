import { supabase } from './supabase.js';
import { chooseNextEvent, EVENT_ARCHETYPES } from './director.js';
import { generateCoachTip } from './coachTip.js';
import { computeObserverContext } from './observer.js';
import {
    initSessionRuntime,
    stopSessionRuntime,
    setSessionProfile,
    recordEventTriggered,
    getSessionContext
} from './sessionRuntime.js';
import { normalizeEventPayload } from './referee.js';

const activeSessions = new Map();

// Events now fire FASTER and have more severe consequences
// Player must react quickly or suffer cascading penalties
const LEVEL_CONFIGS = {
    0: [], // No events for Level 0 (Tutorial/Demo)
    1: [
        { id: 'factory_accident', triggerAt: 20 },
        { id: 'staff_strike', triggerAt: 45 },
        { id: 'competitor_launch', triggerAt: 80 },
        { id: 'supply_crisis', triggerAt: 110 },
        { id: 'rd_breach', triggerAt: 140 },
        { id: 'market_opportunity', triggerAt: 165 }
    ],
    2: [
        { id: 'factory_accident', triggerAt: 15 },
        { id: 'staff_strike', triggerAt: 35 },
        { id: 'competitor_launch', triggerAt: 60 },
        { id: 'supply_crisis', triggerAt: 90 },
        { id: 'rd_breach', triggerAt: 120 },
        { id: 'market_opportunity', triggerAt: 150 },
        { id: 'factory_accident', triggerAt: 180 },
        { id: 'staff_strike', triggerAt: 210 }
    ],
    3: [
        { id: 'supply_crisis', triggerAt: 15 },
        { id: 'competitor_launch', triggerAt: 40 },
        { id: 'factory_accident', triggerAt: 70 },
        { id: 'staff_strike', triggerAt: 100 },
        { id: 'rd_breach', triggerAt: 130 },
        { id: 'market_opportunity', triggerAt: 160 },
        { id: 'supply_crisis', triggerAt: 200 },
        { id: 'competitor_launch', triggerAt: 240 },
        { id: 'staff_strike', triggerAt: 280 }
    ],
    4: [
        { id: 'rd_breach', triggerAt: 20 },
        { id: 'factory_accident', triggerAt: 50 },
        { id: 'supply_crisis', triggerAt: 80 },
        { id: 'competitor_launch', triggerAt: 110 },
        { id: 'staff_strike', triggerAt: 140 },
        { id: 'market_opportunity', triggerAt: 180 },
        { id: 'rd_breach', triggerAt: 220 },
        { id: 'supply_crisis', triggerAt: 260 },
        { id: 'factory_accident', triggerAt: 300 },
        { id: 'competitor_launch', triggerAt: 340 }
    ],
    5: [
        { id: 'factory_accident', triggerAt: 20 },
        { id: 'supply_crisis', triggerAt: 45 },
        { id: 'competitor_launch', triggerAt: 70 },
        { id: 'staff_strike', triggerAt: 95 },
        { id: 'rd_breach', triggerAt: 120 },
        { id: 'market_opportunity', triggerAt: 160 },
        { id: 'factory_accident', triggerAt: 200 },
        { id: 'supply_crisis', triggerAt: 240 },
        { id: 'competitor_launch', triggerAt: 280 },
        { id: 'staff_strike', triggerAt: 320 },
        { id: 'rd_breach', triggerAt: 360 },
        { id: 'factory_accident', triggerAt: 400 },
        { id: 'supply_crisis', triggerAt: 440 }
    ]
};

// Helper: Get full archetype for an ID
function getArchetype(id) {
    return EVENT_ARCHETYPES.find(a => a.id === id);
}

export async function startSession(sessionId, userId, ws, profile = null) {
    stopSession(sessionId);

    // Fetch level from game_sessions table for this sessionId
    const { data: sessionData } = await supabase
        .from('game_sessions')
        .select('level')
        .eq('id', sessionId)
        .single();

    const level = sessionData?.level || 1;

    initSessionRuntime(sessionId, { userId, profile });

    // If profile wasn't provided, try to fetch it once (for coach prompt).
    if (!profile) {
        try {
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
            if (data) setSessionProfile(sessionId, data);
        } catch {
            // ok
        }
    }

    const timeouts = [];
    const usedEventIds = new Set();
    const startTime = Date.now();
    const levelConfig = LEVEL_CONFIGS[level] || LEVEL_CONFIGS[1];

    levelConfig.forEach((config) => {
        const { id, triggerAt } = config;
        const delay = triggerAt * 1000;

        const t = setTimeout(async () => {
            if (ws.readyState !== 1) return;

            // Director picks archetype + parameters (severity) deterministically.
            const sessionCtx = getSessionContext(sessionId);
            const playerModel = computeObserverContext(sessionCtx || {}).playerModel;
            let chosen = chooseNextEvent({
                sessionId,
                elapsedSecs: triggerAt,
                playerModel,
                usedEventIds
            });

            // Fallback to the specific event ID from the Level Config if director returns null.
            if (!chosen) {
                const archetype = getArchetype(id);
                chosen = archetype ? { ...archetype, severityMult: 1 } : null;
            }
            if (!chosen) return;

            usedEventIds.add(chosen.id);
            const eventToSend = normalizeEventPayload({
                id: chosen.id,
                icon: chosen.icon,
                title: chosen.title,
                urgency: chosen.urgency,
                desc: chosen.desc,
                impact: chosen.impact,
                resolveBuilding: chosen.resolveBuilding,
                resolveActions: chosen.resolveActions,
                severityMult: chosen.severityMult || 1
            });

            recordEventTriggered(sessionId, eventToSend);

            ws.send(JSON.stringify({
                type: 'game_event',
                event: {
                    ...eventToSend
                }
            }));

            await supabase.from('action_logs').insert({
                session_id: sessionId,
                timestamp_secs: triggerAt,
                action_type: 'event_triggered',
                action_data: {
                    eventId: eventToSend.id,
                    title: eventToSend.title,
                    urgency: eventToSend.urgency,
                    severityMult: eventToSend.severityMult
                }
            });

            console.log(`[Session ${sessionId}] Fired event: ${eventToSend.id} at t=${triggerAt}s (sev=${eventToSend.severityMult})`);

            // Major event trigger ⇒ immediate coach nudge (best-effort).
            try {
                const ctx = getSessionContext(sessionId);
                const tip = await generateCoachTip({ sessionCtx: ctx });
                if (ws.readyState === 1) {
                    ws.send(JSON.stringify({ type: 'coach_tip', tip }));
                }
            } catch {
                // ok
            }
        }, delay);

        timeouts.push(t);
    });

    activeSessions.set(sessionId, { timeouts, userId, startTime });
    console.log(`[GameSession] Started session ${sessionId} for user ${userId}`);

    // Coach cadence: every 15–30 seconds (jittered), not every tick.
    const scheduleCoach = async () => {
        const session = activeSessions.get(sessionId);
        if (!session) return;
        if (ws.readyState !== 1) return;

        try {
            const ctx = getSessionContext(sessionId);
            const tip = await generateCoachTip({ sessionCtx: ctx });
            if (ws.readyState === 1) ws.send(JSON.stringify({ type: 'coach_tip', tip }));
        } catch {
            // ok
        }

        // next in [15..30] seconds
        const nextDelay = 15000 + Math.floor(Math.random() * 15000);
        const t = setTimeout(scheduleCoach, nextDelay);
        session.timeouts.push(t);
    };

    const firstDelay = 15000 + Math.floor(Math.random() * 15000);
    const coachTimer = setTimeout(scheduleCoach, firstDelay);
    activeSessions.get(sessionId)?.timeouts?.push(coachTimer);
}

export function stopSession(sessionId) {
    const session = activeSessions.get(sessionId);
    if (session) {
        session.timeouts.forEach(t => clearTimeout(t));
        activeSessions.delete(sessionId);
        stopSessionRuntime(sessionId);
        console.log(`[GameSession] Stopped session ${sessionId}`);
    }
}
