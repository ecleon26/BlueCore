import { clampSeverityMult, normalizeEventPayload } from './referee.js';

// Archetypes are existing client-supported events (frontend has penalty logic by id).
export const EVENT_ARCHETYPES = [
  {
    id: 'factory_accident',
    icon: '🔥',
    title: 'FACTORY ACCIDENT',
    urgency: 'CRITICAL',
    desc: 'A fire broke out on the production floor! Workers are evacuating.',
    impact: 'Factory revenue drops sharply and cash drains until resolved.',
    resolveBuilding: 'factory',
    resolveActions: [{ label: 'Emergency Safety Protocol (–$2,000)', id: 'safety_protocol', cost: 2000 }]
  },
  {
    id: 'staff_strike',
    triggerAt: 40,
    icon: '😤',
    title: 'STAFF STRIKE',
    urgency: 'HIGH',
    desc: 'Employees are walking out! Demands for higher pay are escalating fast.',
    impact: 'Morale drains every second until resolved.',
    resolveBuilding: 'hr',
    resolveActions: [{ label: 'Distribute Staff Bonus (–$3,000)', id: 'resolve_strike', cost: 3000 }]
  },
  {
    id: 'competitor_launch',
    icon: '📉',
    title: 'COMPETITOR PRODUCT LAUNCH',
    urgency: 'HIGH',
    desc: 'A rival launched a competing product and is capturing your market share!',
    impact: 'Store revenue is reduced and reputation drains until resolved.',
    resolveBuilding: 'media',
    resolveActions: [{ label: 'Announce Counter-Campaign (–$2,500)', id: 'counter_campaign', cost: 2500 }]
  },
  {
    id: 'supply_crisis',
    icon: '🚚',
    title: 'SUPPLY CHAIN CRISIS',
    urgency: 'CRITICAL',
    desc: 'Warehouse logistics collapsed. Suppliers are blocking deliveries!',
    impact: 'Factory + Warehouse revenue drops and cash drains until resolved.',
    resolveBuilding: 'warehouse',
    resolveActions: [{ label: 'Emergency Logistics Fix (–$4,000)', id: 'logistics_fix', cost: 4000 }]
  },
  {
    id: 'rd_breach',
    icon: '🔓',
    title: 'DATA BREACH AT R&D LAB',
    urgency: 'HIGH',
    desc: 'Hackers infiltrated the R&D servers! Trade secrets are at risk.',
    impact: 'Reputation drains quickly until resolved.',
    resolveBuilding: 'rd',
    resolveActions: [{ label: 'Deploy Security Patch (–$3,500)', id: 'security_patch', cost: 3500 }]
  },
  {
    id: 'market_opportunity',
    icon: '🚀',
    title: 'MARKET SURGE OPPORTUNITY!',
    urgency: 'OPPORTUNITY',
    desc: 'Global demand spiked! Act NOW to capture huge revenue for a short time.',
    impact: 'Use Media Tower to gain a temporary revenue boost.',
    resolveBuilding: 'media',
    resolveActions: [{ label: 'Broadcast Surge (–$1,000)', id: 'surge_broadcast', cost: 1000 }]
  }
];

function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStringToSeed(str) {
  const s = String(str || '');
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pickDeterministicWeighted(rng, choices) {
  const total = choices.reduce((sum, c) => sum + c.w, 0);
  let roll = rng() * total;
  for (const c of choices) {
    roll -= c.w;
    if (roll <= 0) return c.v;
  }
  return choices[choices.length - 1]?.v;
}

export function chooseNextEvent({ sessionId, elapsedSecs, playerModel, usedEventIds = new Set() }) {
  const rng = mulberry32(hashStringToSeed(`${sessionId}:${elapsedSecs}`));

  // Basic policy: pick an archetype that targets current weakness.
  // This is deterministic, cheap, and then parameterized via severity.
  const flags = playerModel?.flags || {};

  const pool = EVENT_ARCHETYPES.filter(e => !usedEventIds.has(e.id));
  if (pool.length === 0) return null;

  const weighted = pool.map((e) => {
    let w = 1;
    if (flags.moraleCritical && e.id === 'staff_strike') w += 3;
    if (flags.repCritical && (e.id === 'rd_breach' || e.id === 'competitor_launch')) w += 2;
    if (flags.debtActive && e.id === 'supply_crisis') w += 2;
    if (flags.eventActive && e.id !== 'market_opportunity') w -= 0.5;
    if (!flags.eventActive && e.id === 'market_opportunity') w += 1.5;
    return { v: e, w: Math.max(0.2, w) };
  });

  const archetype = pickDeterministicWeighted(rng, weighted);

  // Severity is bounded and mildly reacts to risk.
  const risk = Number(playerModel?.risk ?? 50);
  const severityMult = clampSeverityMult(0.9 + (risk / 100) * 0.3); // 0.9..1.2

  const event = normalizeEventPayload({
    ...archetype,
    severityMult,
    director: {
      chosenAt: elapsedSecs,
      severityMult
    }
  });

  return event;
}
