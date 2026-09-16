import express from 'express';
import { supabase } from '../services/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Create a Supabase Auth user + insert profile
 */
router.post('/register', async (req, res) => {
    const { email, password, username, full_name, age, avatar } = req.body;

    if (!email || !password || !username || !full_name || !age) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    if (age < 7 || age > 14) {
        return res.status(400).json({ error: 'Age must be between 7 and 14.' });
    }

    // Check if username is already taken
    const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();

    if (existing) {
        return res.status(409).json({ error: 'Username already taken. Try a different one!' });
    }

    // Create Supabase auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true // auto-confirm for kids, no email verification
    });

    if (authError) {
        return res.status(400).json({ error: authError.message });
    }

    // Insert profile
    const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        username,
        full_name,
        age: parseInt(age),
        avatar: avatar || '🧒',
        total_games: 0,
        total_wins: 0
    });

    if (profileError) {
        // Rollback auth user if profile insert fails
        await supabase.auth.admin.deleteUser(authData.user.id);
        return res.status(500).json({ error: 'Failed to create profile.' });
    }

    res.status(201).json({ message: 'Account created! Welcome to Empire Protocol! 🎉' });
});

/**
 * POST /api/auth/login
 * Login with email + password, return session + profile
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    // Fetch profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

    res.json({
        token: data.session.access_token,
        user: profile
    });
});

/**
 * GET /api/auth/profile
 * Return the current user's profile
 */
router.get('/profile', requireAuth, async (req, res) => {
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', req.user.sub)
        .single();

    if (error || !profile) {
        return res.status(404).json({ error: 'Profile not found.' });
    }

    res.json(profile);
});

export default router;
