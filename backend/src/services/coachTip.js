import { GoogleGenerativeAI } from '@google/generative-ai';
import { computeObserverContext } from './observer.js';

let _genAiClient = null;
function getClient() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;
  if (!_genAiClient) _genAiClient = new GoogleGenerativeAI(apiKey);
  return _genAiClient;
}

function safeParseJson(text) {
  if (!text) return null;
  try { return JSON.parse(text); } catch { /* continue */ }
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

function coerceTipShape(candidate, fallback) {
  if (!candidate || typeof candidate !== 'object') return fallback;

  const tip = typeof candidate.tip === 'string' ? candidate.tip.trim() : '';
  const reason = typeof candidate.reason === 'string' ? candidate.reason.trim() : '';
  const next_action = typeof candidate.next_action === 'string' ? candidate.next_action.trim() : '';

  if (!tip || !reason || !next_action) return fallback;
  return {
    tip: tip.slice(0, 140),
    reason: reason.slice(0, 200),
    next_action: next_action.slice(0, 140)
  };
}

function deterministicFallback(sessionCtx) {
  const obs = computeObserverContext(sessionCtx);
  const next = obs.nextAction;
  return {
    tip: obs.situation.headline,
    reason: obs.compactText,
    next_action: `Do: ${next.actionId} at ${next.buildingType}`
  };
}

/**
 * Coach Agent (LLM): returns exactly 1 tip + 1 reason + 1 next action.
 * Runs on a slow cadence (every ~15–30s) or on major events.
 */
export async function generateCoachTip({ sessionCtx }) {
  const fallback = deterministicFallback(sessionCtx);
  const client = getClient();
  if (!client) return { ...fallback, mode: 'fallback' };

  const profile = sessionCtx?.profile || {};
  const age = profile?.age ?? 10;

  const obs = computeObserverContext(sessionCtx);

  const modelName = process.env.GOOGLE_MODEL_COACH || process.env.GOOGLE_MODEL || 'gemma-3-27b-it';

  const prompt = `You are the Coach Agent for the game Empire Protocol.
Audience: kid CEO (age ${age}). Tone: short, supportive, direct.

You receive:
- situation_summary: ${JSON.stringify(obs.situation)}
- player_model: ${JSON.stringify(obs.playerModel)}
- last_5_actions: ${JSON.stringify(sessionCtx?.lastActions || [])}
- active_event: ${JSON.stringify((sessionCtx?.activeEvents || [])[0] || null)}

Return ONLY valid JSON (no markdown):
{
  "tip": "one short tip",
  "reason": "one short reason",
  "next_action": "one concrete next action (mention building + action id in plain words)"
}

Rules:
- tip <= 18 words
- reason <= 28 words
- next_action <= 18 words
- Must reference the actual situation (morale/reputation/debt/event) if relevant.
`;

  try {
    const model = client.getGenerativeModel({
      model: modelName,
      generationConfig: { temperature: 0.3, topP: 0.9, maxOutputTokens: 220 }
    });

    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() || '';
    const parsed = safeParseJson(text);
    const coerced = coerceTipShape(parsed, fallback);
    return { ...coerced, mode: 'llm' };
  } catch (err) {
    console.error('[CoachTip] generation failed:', err?.message || err);
    return { ...fallback, mode: 'fallback' };
  }
}
