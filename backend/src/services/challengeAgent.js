import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

let _genAiClient = null;
function getClient() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;
  if (!_genAiClient) _genAiClient = new GoogleGenerativeAI(apiKey);
  return _genAiClient;
}

// NOTE: BattleGround currently spawns only these building types.
// Keeping the AI constrained ensures the UI can always anchor the popup to a real building.
const BUILDINGS = ['factory', 'warehouse', 'hq', 'rd', 'media', 'bank'];
const URGENCIES = ['CRITICAL', 'HIGH', 'OPPORTUNITY'];

const SCENARIO_LIBRARY = [
  {
    key: 'logistics_port_strike',
    icon: '🚢',
    title: 'PORT STRIKE FREEZES CONTAINERS',
    urgency: 'CRITICAL',
    department: 'Logistics',
    resolveBuilding: 'warehouse',
    desc: 'Dockworkers have stopped loading. Your inbound parts are stuck offshore and trucks are idle.',
    impact: 'Factory & Warehouse throughput drops for 30s unless a contingency route is activated.',
    action: { id: 'logistics_fix', label: 'Activate Contingency Routing', cost: [3500, 6500] }
  },
  {
    key: 'finance_fx_swing',
    icon: '💱',
    title: 'CURRENCY SHOCK HITS CASHFLOW',
    urgency: 'HIGH',
    department: 'Finance',
    resolveBuilding: 'bank',
    desc: 'Exchange rates moved sharply overnight. Suppliers demand recalculated invoices.',
    impact: 'Cash drain risk for 25s unless hedging is executed.',
    action: { id: 'submit_audit', label: 'Execute Emergency Hedge', cost: [2000, 5500] }
  },
  {
    key: 'hr_burnout_wave',
    icon: '😵',
    title: 'BURNOUT WAVE ACROSS TEAMS',
    urgency: 'HIGH',
    department: 'HR',
    resolveBuilding: 'hq',
    desc: 'Critical roles are burning out. Absences are spiking and mistakes are rising.',
    impact: 'Morale declines faster for 25s unless retention measures are funded.',
    action: { id: 'bonus', label: 'Deploy Retention Bonus Package', cost: [2500, 6000] }
  },
  {
    key: 'security_zero_day',
    icon: '🧩',
    title: 'ZERO‑DAY VULNERABILITY DISCOVERED',
    urgency: 'CRITICAL',
    department: 'Security',
    resolveBuilding: 'rd',
    desc: 'A vulnerability is actively exploited in a dependency used by your systems.',
    impact: 'Reputation bleed risk for 30s unless a hotfix is applied.',
    action: { id: 'security_patch', label: 'Roll Out Hotfix & Incident Response', cost: [3000, 7000] }
  },
  {
    key: 'pr_reputation_hit',
    icon: '📣',
    title: 'VIRAL BACKLASH ON SOCIAL MEDIA',
    urgency: 'HIGH',
    department: 'PR',
    resolveBuilding: 'media',
    desc: 'A clip is trending and framing your brand negatively. Narrative is moving fast.',
    impact: 'Reputation drops for 25s unless you control the story.',
    action: { id: 'pr_statement', label: 'Issue Verified Statement + Media Blitz', cost: [1500, 5000] }
  },
  {
    key: 'sales_demand_spike',
    icon: '🛍️',
    title: 'FLASH DEMAND SPIKE IN RETAIL',
    urgency: 'OPPORTUNITY',
    department: 'Sales',
    resolveBuilding: 'media',
    desc: 'A competitor stocked out. Customers are searching for alternatives right now.',
    impact: 'Short window to capture extra revenue for 20s if you push an offer.',
    action: { id: 'marketing_campaign', label: 'Launch 24‑Hour Promo Push', cost: [1000, 4000] }
  },
  {
    key: 'ops_vendor_failure',
    icon: '🧯',
    title: 'KEY VENDOR FAILURE',
    urgency: 'CRITICAL',
    department: 'Operations',
    resolveBuilding: 'hq',
    desc: 'A mission‑critical vendor just went offline. Escalations are flooding your inbox.',
    impact: 'Efficiency and revenue take a hit for 30s unless you activate a workaround.',
    action: { id: 'optimize', label: 'Activate War‑Room & Workaround Plan', cost: [2000, 6000] }
  },
  {
    key: 'manufacturing_quality_recall',
    icon: '🧪',
    title: 'QUALITY CONTROL FLAGS A RECALL RISK',
    urgency: 'CRITICAL',
    department: 'Manufacturing',
    resolveBuilding: 'factory',
    desc: 'A defect pattern is detected in the production line. Shipments may be compromised.',
    impact: 'Factory output drops for 30s unless a safety protocol is triggered.',
    action: { id: 'safety_protocol', label: 'Pause Line + Run Safety Protocol', cost: [2500, 6500] }
  }
];

function randInt(min, max) {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(a + Math.random() * (b - a + 1));
}

function normalizeKey(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9 _-]/g, '')
    .trim();
}

function pickLibraryScenario(recentKeys = []) {
  const recent = new Set((recentKeys || []).map(normalizeKey));
  const candidates = SCENARIO_LIBRARY.filter(s => !recent.has(normalizeKey(s.key)) && !recent.has(normalizeKey(s.title)));
  const pool = candidates.length ? candidates : SCENARIO_LIBRARY;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function buildLibraryChallenge(recentKeys = []) {
  const seed = pickLibraryScenario(recentKeys);
  const [minCost, maxCost] = seed.action?.cost || [1000, 8000];
  const cost = randInt(minCost, maxCost);
  return {
    id: `${seed.key}_${Date.now()}`,
    key: seed.key,
    icon: seed.icon,
    title: seed.title,
    urgency: seed.urgency,
    department: seed.department,
    desc: seed.desc,
    impact: seed.impact,
    resolveBuilding: seed.resolveBuilding,
    resolveActions: [{ id: seed.action.id, label: seed.action.label, cost }]
  };
}

function safeParseJson(text) {
  if (!text) return null;
  try { return JSON.parse(text); } catch { /* continue */ }
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

function buildChallengeFallback() {
  // Use a varied, deterministic library fallback so the game stays fun even
  // when no API key is configured or the model output is unusable.
  return buildLibraryChallenge([]);
}

function coerceChallengeShape(candidate) {
  if (!candidate || typeof candidate !== 'object') return buildChallengeFallback();

  return {
    id: typeof candidate.id === 'string' ? candidate.id : 'ai_event_' + Date.now(),
    key: typeof candidate.key === 'string' ? candidate.key : undefined,
    icon: typeof candidate.icon === 'string' ? candidate.icon : '🤖',
    title: typeof candidate.title === 'string' ? candidate.title : 'Market Shift',
    urgency: URGENCIES.includes(candidate.urgency) ? candidate.urgency : 'HIGH',
    department: typeof candidate.department === 'string' ? candidate.department : undefined,
    desc: typeof candidate.desc === 'string' ? candidate.desc : 'Unexpected market fluctuations detected.',
    impact: typeof candidate.impact === 'string' ? candidate.impact : 'Efficiency impacted.',
    resolveBuilding: BUILDINGS.includes(candidate.resolveBuilding) ? candidate.resolveBuilding : 'hq',
    resolveActions: Array.isArray(candidate.resolveActions)
      ? candidate.resolveActions.map(a => ({
        id: a.id || 'act',
        label: a.label || 'Standard Protocol',
        cost: Number.isFinite(Number(a.cost)) ? Number(a.cost) : 1000
      })).slice(0, 2)
      : [{ id: 'adapt', label: 'Adapt Operations', cost: 1000 }]
  };
}

function challengeKeyFromShape(ch) {
  const t = normalizeKey(ch?.title);
  const b = normalizeKey(ch?.resolveBuilding);
  const k = normalizeKey(ch?.key);
  return (k || t) + '|' + b;
}

/**
 * Generate a global challenge based on player profiles
 */
export async function generateGlobalChallenge(players, opts = {}) {
  const client = getClient();

  const recentKeys = Array.isArray(opts?.recentKeys) ? opts.recentKeys : [];

  if (!client) {
    console.warn('[ChallengeAgent] API key not set; using library challenge fallback.');
    return buildLibraryChallenge(recentKeys);
  }

  const modelName = process.env.GOOGLE_MODEL || 'gemma-3-27b-it';

  const recentList = recentKeys.slice(0, 8).map((x) => `- ${x}`).join('\n');
  const seedList = SCENARIO_LIBRARY.map((s) => `- ${s.key} (${s.department} → ${s.resolveBuilding}): ${s.title}`).join('\n');

  const prompt = `
Role: AI Game Master for "Empire Protocol".
Context: This is a multiplayer "BattleGround" session with ${players.length} corporate rivals.
Player Profiles:
${players.map((p, i) => `- CEO ${i + 1}: Name=${p.name}, Age=${p.age || 'Unknown'}, Style=${p.style || 'Unknown'}`).join('\n')}

Task: Create a "Global Market Event" that affects all players simultaneously. 
The event should be professional, immersive, specific (not vague), and themed around business crises or opportunities.

Hard requirements:
- Do NOT repeat recent events (by title or theme).
- The event MUST clearly come from a department and map to a building.
- Use concrete stakes (time window / KPI impact) in the Impact field.

Recent events to avoid repeating:
${recentList || '(none)'}

Preferred scenario seeds (pick one NOT in recent):
${seedList}

Return ONLY valid JSON.
{
  "id": "unique_id",
  "key": "short_theme_key",
  "icon": "emoji",
  "title": "Short title",
  "urgency": "CRITICAL" | "HIGH" | "OPPORTUNITY",
  "department": "e.g., Logistics | Finance | HR | PR | Security | Operations | Sales | Manufacturing",
  "desc": "A brief description.",
  "impact": "The effect on corporations.",
  "resolveBuilding": "factory" | "warehouse" | "hq" | "rd" | "media" | "bank",
  "resolveActions": [
    { "id": "action_id", "label": "Action label", "cost": 5000 },
    { "id": "action_id_2", "label": "Alternative action label", "cost": 6500 }
  ]
}

Rules:
- Provide 1 or 2 resolveActions.
- Cost should be between 1000 and 8000.
`;

  try {
    const model = client.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature: 0.7
      }
    });

    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() || '';
    const parsed = safeParseJson(text);

    if (!parsed) {
      console.warn('[ChallengeAgent] Model returned non-JSON. Falling back.');
      return buildChallengeFallback();
    }

    const shaped = coerceChallengeShape(parsed);
    const shapedKey = challengeKeyFromShape(shaped);
    const recent = new Set((recentKeys || []).map(normalizeKey));
    if (recent.has(normalizeKey(shaped.key)) || recent.has(normalizeKey(shaped.title)) || recent.has(normalizeKey(shapedKey))) {
      // Model repeated itself; use deterministic library for variety.
      return buildLibraryChallenge(recentKeys);
    }

    return shaped;
  } catch (err) {
    console.error('[ChallengeAgent] AI generation failed:', err.message || err);
    return buildLibraryChallenge(recentKeys);
  }
}
