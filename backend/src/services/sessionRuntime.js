const sessions = new Map();

function clampNumber(n, min, max, fallback) {
  const v = Number(n);
  if (!Number.isFinite(v)) return fallback;
  return Math.max(min, Math.min(max, v));
}

export function initSessionRuntime(sessionId, { userId, profile } = {}) {
  if (!sessionId) return;
  sessions.set(sessionId, {
    sessionId,
    userId,
    profile: profile || null,
    createdAt: Date.now(),
    lastActions: [],
    activeEvents: new Set(),
    activeEventMeta: new Map(), // eventId -> { severityMult, urgency, title }
    state: null,
    prevState: null,
    stateUpdatedAt: 0,
    prevStateUpdatedAt: 0
  });
}

export function stopSessionRuntime(sessionId) {
  sessions.delete(sessionId);
}

export function setSessionProfile(sessionId, profile) {
  const s = sessions.get(sessionId);
  if (!s) return;
  s.profile = profile || null;
}

export function recordPlayerAction(sessionId, action) {
  const s = sessions.get(sessionId);
  if (!s) return;

  const entry = {
    t: clampNumber(action?.elapsedSecs, 0, 99999, 0),
    actionId: String(action?.actionId || 'unknown'),
    buildingType: String(action?.buildingType || 'SYSTEM'),
    cost: clampNumber(action?.cost, 0, 1_000_000_000, 0),
    effect: action?.effect ?? null
  };

  s.lastActions.push(entry);
  if (s.lastActions.length > 20) s.lastActions.splice(0, s.lastActions.length - 20);
}

export function recordStateUpdate(sessionId, snapshot) {
  const s = sessions.get(sessionId);
  if (!s) return;

  const now = Date.now();
  s.prevState = s.state;
  s.prevStateUpdatedAt = s.stateUpdatedAt;
  s.state = {
    t: clampNumber(snapshot?.elapsedSecs, 0, 99999, 0),
    cash: clampNumber(snapshot?.cash, -1_000_000_000, 1_000_000_000, 0),
    revenue: clampNumber(snapshot?.revenue, -1_000_000_000, 1_000_000_000, 0),
    morale: clampNumber(snapshot?.morale, 0, 100, 0),
    reputation: clampNumber(snapshot?.reputation, 0, 100, 0),
    debt: clampNumber(snapshot?.debt, 0, 1_000_000_000, 0),
    equity: clampNumber(snapshot?.equity, 0, 100, 100),
    timeLeft: clampNumber(snapshot?.timeLeft, 0, 99999, 0),
    factoryMult: clampNumber(snapshot?.factoryMult, 1, 3, 1),
    warehouseMult: clampNumber(snapshot?.warehouseMult, 1, 3, 1),
    rdMult: clampNumber(snapshot?.rdMult, 1, 3, 1)
  };
  s.stateUpdatedAt = now;
}

export function recordEventTriggered(sessionId, event) {
  const s = sessions.get(sessionId);
  if (!s) return;

  const eventId = String(event?.id || 'unknown_event');
  s.activeEvents.add(eventId);
  s.activeEventMeta.set(eventId, {
    severityMult: clampNumber(event?.severityMult, 0.8, 1.2, 1),
    urgency: String(event?.urgency || 'HIGH'),
    title: String(event?.title || eventId)
  });
}

export function recordEventResolved(sessionId, eventId) {
  const s = sessions.get(sessionId);
  if (!s) return;
  const id = String(eventId || '');
  if (!id) return;
  s.activeEvents.delete(id);
  s.activeEventMeta.delete(id);
}

export function getSessionRuntime(sessionId) {
  return sessions.get(sessionId) || null;
}

export function getSessionContext(sessionId) {
  const s = sessions.get(sessionId);
  if (!s) return null;

  const last5 = s.lastActions.slice(-5);
  const activeEvents = Array.from(s.activeEvents).map((id) => ({
    id,
    ...(s.activeEventMeta.get(id) || {})
  }));

  return {
    sessionId: s.sessionId,
    userId: s.userId,
    profile: s.profile,
    lastActions: last5,
    activeEvents,
    state: s.state,
    prevState: s.prevState
  };
}
