import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../services/supabase.js';
import { generateSummary } from '../services/ai.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/game/session/start
 * Create a new game session row and return sessionId
 */
router.post('/session/start', requireAuth, async (req, res) => {
    const { level } = req.body;

    const { data, error } = await supabase.from('game_sessions').insert({
        id: uuidv4(),
        user_id: req.user.sub,
        level: level || 1,
        started_at: new Date().toISOString()
    }).select().single();

    if (error) {
        return res.status(500).json({ error: 'Failed to create game session.' });
    }

    res.json({ sessionId: data.id });
});

/**
 * GET /api/game/session/:id/logs
 * Return all action logs for a session
 */
router.get('/session/:id/logs', requireAuth, async (req, res) => {
    const { data, error } = await supabase
        .from('action_logs')
        .select('*')
        .eq('session_id', req.params.id)
        .order('timestamp_secs', { ascending: true });

    if (error) return res.status(500).json({ error: 'Failed to fetch logs.' });
    res.json(data);
});

/**
 * GET /api/game/history
 * Return all past sessions for the current user
 */
router.get('/history', requireAuth, async (req, res) => {
    const { data, error } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('user_id', req.user.sub)
        .not('ended_at', 'is', null)
        .order('started_at', { ascending: false })
        .limit(10);

    if (error) return res.status(500).json({ error: 'Failed to fetch history.' });
    res.json(data);
});

/**
 * POST /api/game/session/:id/end
 * Finalize session, run AI summary, update profile stats.
 * (Called by the WS handler internally, but exposed as REST endpoint too)
 */
router.post('/session/:id/end', requireAuth, async (req, res) => {
    const { outcome, final_cash, final_revenue, final_morale, final_reputation } = req.body;
    const sessionId = req.params.id;
    const userId = req.user.sub;

    // Fetch session info to know which level was just played
    const { data: sessionInfo, error: sessionInfoError } = await supabase
        .from('game_sessions')
        .select('level')
        .eq('id', sessionId)
        .single();

    if (sessionInfoError) {
        return res.status(500).json({ error: 'Failed to fetch game session.' });
    }

    const levelPlayed = sessionInfo?.level || 1;

    // Fetch profile (needed for AI)
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    // Fetch all logs for this session
    const { data: logs } = await supabase
        .from('action_logs')
        .select('*')
        .eq('session_id', sessionId);

    const sessionData = {
        id: sessionId,
        level: levelPlayed,
        outcome,
        final_cash,
        final_revenue,
        final_morale,
        final_reputation
    };

    // Run AI analysis
    const aiSummary = await generateSummary(sessionData, logs || [], profile);

    // Update the session row
    await supabase.from('game_sessions').update({
        ended_at: new Date().toISOString(),
        outcome,
        final_cash,
        final_revenue,
        final_morale,
        final_reputation,
        ai_summary: aiSummary
    }).eq('id', sessionId);

    // Update profile stats
    const isWin = outcome === 'win';
    const nextUnlocked = isWin ? Math.max(profile.last_unlocked_level || 1, levelPlayed + 1) : (profile.last_unlocked_level || 1);

    await supabase.from('profiles').update({
        total_games: (profile.total_games || 0) + 1,
        total_wins: (profile.total_wins || 0) + (isWin ? 1 : 0),
        last_unlocked_level: nextUnlocked,
        tutorial_completed: true
    }).eq('id', userId);

    res.json({ summary: aiSummary });
});

export default router;
