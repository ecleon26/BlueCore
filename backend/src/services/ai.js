import { GoogleGenerativeAI } from '@google/generative-ai';

let _genAiClient = null;
function getClient() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) return null;
    if (!_genAiClient) _genAiClient = new GoogleGenerativeAI(apiKey);
    return _genAiClient;
}

function safeParseJson(text) {
    if (!text) return null;

    // Prefer a direct parse first
    try {
        return JSON.parse(text);
    } catch {
        // continue
    }

    // Try to extract the first JSON object from mixed output
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
        return JSON.parse(match[0]);
    } catch {
        return null;
    }
}

function clampInt(value, min, max, fallback) {
    const num = Number(value);
    if (!Number.isFinite(num)) return fallback;
    return Math.max(min, Math.min(max, Math.round(num)));
}

function buildDeterministicFallback(session, logs = []) {
    const isWin = session.outcome === 'win';
    const revenue = Number(session.final_revenue ?? 0);
    const morale = Number(session.final_morale ?? 0);
    const reputation = Number(session.final_reputation ?? 0);

    // Simple score: win baseline + normalized stats
    const score = clampInt(
        (isWin ? 55 : 30) + (revenue / 50000) * 25 + (morale / 100) * 10 + (reputation / 100) * 10,
        0,
        100,
        isWin ? 80 : 50
    );

    const actionCounts = new Map();
    for (const l of logs) {
        const k = l?.action_type || 'unknown';
        actionCounts.set(k, (actionCounts.get(k) || 0) + 1);
    }
    const didResolveEvents = (actionCounts.get('event_resolved') || 0) > 0;

    return {
        score,
        badge: isWin ? 'Protocol Victor' : 'Protocol Survivor',
        play_style: didResolveEvents ? 'crisis_manager' : 'steady_builder',
        strengths: isWin
            ? ['Stayed focused under pressure', 'Kept the business moving']
            : ['Kept trying and adapting', 'Learned from setbacks'],
        weaknesses: isWin
            ? ['Could react faster to penalties']
            : ['Needs earlier crisis response', 'Needs stronger cash planning'],
        key_moments: [],
        encouragement: isWin
            ? 'High Command confirms: you earned this victory — keep expanding your empire.'
            : 'High Command respects persistence — regroup, plan faster, and try again.'
    };
}

function normalizeLogs(logs = []) {
    // Keep prompts stable and not too long.
    const MAX_LOGS = 120;
    const trimmed = Array.isArray(logs) ? logs.slice(-MAX_LOGS) : [];
    return trimmed.map((l) => ({
        t: l?.timestamp_secs ?? 0,
        type: l?.action_type ?? 'unknown',
        data: l?.action_data ?? null
    }));
}

function coerceSummaryShape(candidate, session, logs) {
    if (!candidate || typeof candidate !== 'object') return buildDeterministicFallback(session, logs);

    const score = clampInt(candidate.score, 0, 100, buildDeterministicFallback(session, logs).score);
    const badge = typeof candidate.badge === 'string' && candidate.badge.trim() ? candidate.badge.trim() : (session.outcome === 'win' ? 'Protocol Victor' : 'Business Builder');
    const play_style = typeof candidate.play_style === 'string' && candidate.play_style.trim() ? candidate.play_style.trim() : 'balanced';
    const strengths = Array.isArray(candidate.strengths) ? candidate.strengths.filter(s => typeof s === 'string').slice(0, 5) : [];
    const weaknesses = Array.isArray(candidate.weaknesses) ? candidate.weaknesses.filter(s => typeof s === 'string').slice(0, 5) : [];
    const key_moments = Array.isArray(candidate.key_moments)
        ? candidate.key_moments
            .filter(m => m && typeof m === 'object')
            .slice(0, 6)
            .map(m => ({
                time: clampInt(m.time, 0, 99999, 0),
                action: typeof m.action === 'string' ? m.action : 'Action',
                impact: typeof m.impact === 'string' ? m.impact : ''
            }))
        : [];
    const encouragement = typeof candidate.encouragement === 'string' && candidate.encouragement.trim() ? candidate.encouragement.trim() : 'Keep building your empire.';

    // Ensure we always have at least 1 strength/weakness for UI stability
    const safeStrengths = strengths.length ? strengths : buildDeterministicFallback(session, logs).strengths;
    const safeWeaknesses = weaknesses.length ? weaknesses : buildDeterministicFallback(session, logs).weaknesses;

    return { score, badge, play_style, strengths: safeStrengths, weaknesses: safeWeaknesses, key_moments, encouragement };
}

/**
 * Generate a gameplay summary using Google Gemini API.
 * NOTE: Uses @google/generative-ai which supports getGenerativeModel().
 */
export async function generateSummary(session, logs, profile) {
    const client = getClient();
    if (!client) {
        console.warn('[AI] GOOGLE_API_KEY not set; returning fallback summary.');
        return buildDeterministicFallback(session, logs);
    }

    const modelName = process.env.GOOGLE_MODEL || 'gemma-3-27b-it';
    const safeProfile = profile || { full_name: 'Unknown CEO', age: 10 };
    const normalizedLogs = normalizeLogs(logs);

    const prompt = `You are an expert business coach and "High Command" analyst for the game Empire Protocol.

Audience: a kid CEO (age ${safeProfile.age ?? 10}). Tone: corporate-lore, encouraging, simple words, but still insightful.

Session:
- Level: ${session.level}
- Outcome: ${String(session.outcome || '').toUpperCase()}
- Final cash: ${session.final_cash}
- Final revenue: ${session.final_revenue}
- Final morale: ${session.final_morale}
- Final reputation: ${session.final_reputation}

Action log (latest ${normalizedLogs.length}):
${normalizedLogs.map(l => `- [t=${l.t}s] ${l.type}: ${JSON.stringify(l.data)}`).join('\n')}

Return ONLY valid JSON (no markdown, no backticks, no commentary). The JSON MUST match this shape exactly:
{
  "score": 0,
  "badge": "...",
  "play_style": "...",
  "strengths": ["..."],
  "weaknesses": ["..."],
  "key_moments": [{"time": 0, "action": "...", "impact": "..."}],
  "encouragement": "..."
}

Rules:
- score is an integer 0..100.
- strengths: 2-3 items, specific to the log.
- weaknesses: 1-2 items, constructive.
- key_moments: 2-4 items, choose the most important moments.
- encouragement: one strong final sentence.
`;

    try {
        const model = client.getGenerativeModel({
            model: modelName,
            generationConfig: {
                temperature: 0.4,
                topP: 0.9,
                maxOutputTokens: 700
            }
        });

        const result = await model.generateContent(prompt);
        const text = result?.response?.text?.() || '';
        const parsed = safeParseJson(text);
        if (!parsed) {
            console.warn('[AI] Model returned non-JSON. Falling back. Raw start:', text.slice(0, 120));
            return buildDeterministicFallback(session, logs);
        }

        return coerceSummaryShape(parsed, session, logs);
    } catch (err) {
        console.error('[AI] Summary generation failed:', err?.message || err);
        return buildDeterministicFallback(session, logs);
    }
}
