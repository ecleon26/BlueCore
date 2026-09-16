function clampNumber(n, min, max, fallback) {
  const v = Number(n);
  if (!Number.isFinite(v)) return fallback;
  return Math.max(min, Math.min(max, v));
}

export function clampSeverityMult(severityMult) {
  return clampNumber(severityMult, 0.8, 1.2, 1);
}

export function normalizeEventPayload(event) {
  if (!event || typeof event !== 'object') return event;

  const normalized = { ...event };
  normalized.severityMult = clampSeverityMult(event.severityMult);

  // Clamp resolve action costs if present
  if (Array.isArray(normalized.resolveActions)) {
    normalized.resolveActions = normalized.resolveActions
      .map((a) => ({
        ...a,
        cost: clampNumber(a?.cost, 0, 8000, 0)
      }))
      .slice(0, 3);
  }

  return normalized;
}

/**
 * Battle fairness guard:
 * - Ensures a single identical event payload is used for all players.
 * - Clamps bounds so a director can't "bully" one player.
 */
export function refereeBattleEvent(event) {
  return normalizeEventPayload(event);
}
