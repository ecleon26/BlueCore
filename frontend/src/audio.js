/**
 * audio.js — Sound effect + background music manager.
 *
 * Root cause of previous silence:
 *   audio.cloneNode()  (without 'true') does NOT copy the src in all browsers,
 *   so the clone had no source and play() silently failed.
 *
 * Fix: create a fresh Audio() each call for SFX.
 * Browser HTTP caching means the file is never re-downloaded after the first load.
 *
 * Background music: a single looping Audio instance.
 * Start it with sfx.startBGM() after the first user interaction to satisfy
 * the browser autoplay policy.
 */

// ─── Sound Effects ────────────────────────────────────────────────────────────

/**
 * Play a short sound effect. Creates a new Audio element each time so that
 * rapid overlapping plays (e.g. fast clicking) all sound correctly.
 * Browser caches the underlying audio data — no extra network requests.
 */
function play(path, volume = 0.6) {
    try {
        const audio = new Audio(path);
        audio.volume = Math.max(0, Math.min(1, volume));
        const promise = audio.play();
        if (promise) promise.catch(() => { }); // silence autoplay-policy rejections
    } catch (_) { }
}

export const sfx = {
    /** UI / building action clicks */
    click: () => play('./assets/click.mp3', 1.5),
    /** General toast notifications */
    notify: () => play('./assets/notify.mp3', 0.85),
    /** Errors: locked level, not enough cash, negative events */
    error: () => play('./assets/error.mp3', 1.2),
};

// ─── Global Click Sound ───────────────────────────────────────────────────────
// One delegated listener covers every button/link/interactive element on the
// entire page — no need to wire sfx.click() to each handler individually.
document.addEventListener('click', (e) => {
    const target = e.target;
    const isClickable =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.level-node') ||
        target.closest('.action-btn') ||
        target.closest('.notif-btn') ||
        target.closest('.primary-btn') ||
        target.closest('.secondary-btn') ||
        target.closest('[role="button"]');

    if (isClickable) sfx.click();
}, { passive: true });

// ─── Background Music ─────────────────────────────────────────────────────────

let _bgm = null;

export const music = {
    /**
     * Start looping background music.
     * Safe to call multiple times — only one instance plays at a time.
     * Must be called from within a user-interaction callback (click, keydown, etc.)
     * to satisfy browser autoplay policy.
     */
    start() {
        if (_bgm && !_bgm.paused) return; // already playing

        if (!_bgm) {
            _bgm = new Audio('./assets/bgmusic.mp3');
            _bgm.loop = true;
            _bgm.volume = 0.1; // keep BGM quiet so SFX are audible over it
        }

        _bgm.currentTime = 0;
        const promise = _bgm.play();
        if (promise) promise.catch(() => { });
    },

    pause() {
        if (_bgm && !_bgm.paused) _bgm.pause();
    },

    resume() {
        if (_bgm && _bgm.paused) {
            const p = _bgm.play();
            if (p) p.catch(() => { });
        }
    },

    stop() {
        if (_bgm) {
            _bgm.pause();
            _bgm.currentTime = 0;
        }
    },

    /** 0.0 – 1.0 */
    setVolume(v) {
        if (_bgm) _bgm.volume = Math.max(0, Math.min(1, v));
    }
};
