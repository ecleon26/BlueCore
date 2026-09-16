import { supabase } from '../services/supabase.js';

/**
 * Middleware to verify a Supabase JWT using Supabase's getUser().
 * This handles both HS256 and ES256 algorithms used by Supabase.
 */
export async function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (req.query.token) {
        token = req.query.token;
    }

    if (!token) {
        console.warn('[Auth] Missing token for request:', req.path);
        return res.status(401).json({ error: 'Missing or invalid authentication.' });
    }

    try {
        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            console.error('[Auth] Supabase getUser failed:', error?.message || 'No user found');
            return res.status(401).json({ error: 'Invalid or expired token.' });
        }

        // Attach user to request. Map id to sub for compatibility with existing routes.
        req.user = { ...data.user, sub: data.user.id };
        console.log(`[Auth] Token verified for: ${req.path} (User: ${data.user.id})`);
        next();
    } catch (err) {
        console.error('[Auth] Unexpected verification error:', err.message);
        return res.status(401).json({ error: 'Authentication failed.' });
    }
}

/**
 * Verify a token string directly (used for WS connections).
 * Returns decoded payload or null.
 */
export async function verifyToken(token) {
    if (!token) return null;
    try {
        const { data, error } = await supabase.auth.getUser(token);
        if (error || !data.user) {
            console.error('[WS-Auth] Supabase getUser failed:', error?.message);
            return null;
        }
        return { ...data.user, sub: data.user.id };
    } catch (err) {
        console.error('[WS-Auth] Unexpected verification error:', err.message);
        return null;
    }
}
