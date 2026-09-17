function isLocalhost() {
    const h = window.location.hostname;
    return h === 'localhost' || h === '127.0.0.1';
}

function stripTrailingSlash(s) {
    return String(s || '').replace(/\/+$/, '');
}

// API base URL
// - Dev default: backend on localhost:3001
// - Prod default: same-origin /api (works when frontend is served with a proxy or same host)
// - Override: VITE_API_BASE="https://your-backend.com/api"
const API_BASE = (() => {
    const env = import.meta?.env?.VITE_API_BASE;
    if (env) return stripTrailingSlash(env);

    const port = String(window.location.port || '');
    const host = window.location.hostname;

    // Vite dev server accessed from another device on LAN
    if (port === '5173' || port === '4173') {
        const proto = window.location.protocol;
        return stripTrailingSlash(`${proto}//${host}:3001/api`);
    }

    if (isLocalhost()) return 'http://localhost:3001/api';
    return stripTrailingSlash(`${window.location.origin}/api`);
})();

// ─── Token Management ─────────────────────────────────────────────────────────

export function saveToken(token, user) {
    localStorage.setItem('empire_token', token);
    localStorage.setItem('empire_user', JSON.stringify(user));
}

export function getToken() {
    return localStorage.getItem('empire_token');
}

export function getUser() {
    const u = localStorage.getItem('empire_user');
    return u ? JSON.parse(u) : null;
}

export function clearSession() {
    localStorage.removeItem('empire_token');
    localStorage.removeItem('empire_user');
}

// ─── Local Progress (per user) ───────────────────────────────────────────────

export function getProgressKey() {
    const u = getUser();
    return u?.id ? `empire_progress_${u.id}` : 'empire_progress';
}

export function getProgress() {
    const key = getProgressKey();
    try {
        return JSON.parse(localStorage.getItem(key) || '{}');
    } catch {
        return {};
    }
}

export function saveProgress(progress) {
    const key = getProgressKey();
    localStorage.setItem(key, JSON.stringify(progress || {}));
}

// ─── HTTP Helpers ─────────────────────────────────────────────────────────────

async function apiFetch(endpoint, options = {}) {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function register(payload) {
    return apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}

export async function login(email, password) {
    const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
    saveToken(data.token, data.user);
    return data;
}

export async function getProfile() {
    return apiFetch('/auth/profile');
}

// ─── Game ─────────────────────────────────────────────────────────────────────

export async function startGameSession(level = 1) {
    const data = await apiFetch('/game/session/start', {
        method: 'POST',
        body: JSON.stringify({ level })
    });
    return data.sessionId;
}

export async function getGameHistory() {
    return apiFetch('/game/history');
}

export async function endGameSession(sessionId, payload) {
    return apiFetch(`/game/session/${sessionId}/end`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}
