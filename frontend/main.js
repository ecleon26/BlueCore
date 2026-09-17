import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { World } from './src/world.js';
import { Economy } from './src/economy.js';
import { EventSystem } from './src/events.js';
import { Tutorial } from './src/tutorial.js';
import { GameSocket } from './src/socket.js';
import { getUser, getProgress, startGameSession } from './src/api.js';
import { sfx, music } from './src/audio.js';
import gsap from 'gsap';

export class Game {
    constructor() {
        window.game = this;
        // Retrieve logged-in user from localStorage (set by auth screen)
        const user = getUser();
        this.userName = user?.username || user?.full_name || 'CEO';
        this.userProfile = user;
        this.currentScreen = 'intro';
        this.socket = null;

        // Multiplayer: keep latest opponent snapshots for the Rival Stats panel
        this.rivalStates = new Map();
        this._lastRivalRender = 0;

        this.canvas = document.getElementById('game-canvas');
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xd9efff);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.LinearToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        // CSS 2D Renderer for labels/tutorial
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        this.labelRenderer.domElement.style.pointerEvents = 'none';
        document.getElementById('app').appendChild(this.labelRenderer.domElement);

        // Camera Setup — for ortho cameras, distance doesn't affect scale,
        // so we place it far away to prevent near-plane clipping
        const aspect = window.innerWidth / window.innerHeight;
        const d = 20;
        this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 0.1, 2000);
        this.camera.position.set(100, 100, 100);
        this.camera.zoom = 1;
        this.camera.lookAt(0, 0, 0);
        this.camera.updateProjectionMatrix();

        // Systems
        this.economy = new Economy(this);
        this.world = new World(this);
        this.events = new EventSystem(this);
        this.tutorial = new Tutorial(this);

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 2.1;
        this.controls.minZoom = 0.5;
        this.controls.maxZoom = 4;

        // Context Menu Billboard
        this.menuEl = document.getElementById('context-menu');
        this.buildingMenuLabel = new CSS2DObject(this.menuEl);

        // Global Loader Elements
        this.loaderEl = document.getElementById('global-loader');
        this.loaderStatusEl = document.getElementById('loader-status');

        this.setupLoadingManager();
        this.setupLighting();
        this.init();
    }

    _fmtMoney(n) {
        if (n === null || n === undefined || Number.isNaN(Number(n))) return '—';
        return `$${Math.floor(Number(n)).toLocaleString()}`;
    }

    _fmtPct(n) {
        if (n === null || n === undefined || Number.isNaN(Number(n))) return '—';
        return `${Math.floor(Number(n))}%`;
    }

    _fmtTimeLeft(secs) {
        const s = Number(secs);
        if (!Number.isFinite(s)) return '—';
        const clamped = Math.max(0, Math.floor(s));
        const mins = Math.floor(clamped / 60);
        const rem = clamped % 60;
        return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
    }

    _setRivalPanelVisible(visible) {
        const panel = document.getElementById('rival-stats-panel');
        if (!panel) return;
        panel.classList.toggle('hidden', !visible);
    }

    _renderRivalStats() {
        const now = Date.now();
        if (now - this._lastRivalRender < 150) return;
        this._lastRivalRender = now;

        const container = document.getElementById('rival-stats-container');
        if (!container) return;

        if (!this.currentRoom || !Array.isArray(this.currentRoom.players)) {
            this._setRivalPanelVisible(false);
            return;
        }

        const myId = this.userProfile?.id;
        const rivals = this.currentRoom.players.filter(p => p?.id && p.id !== myId);
        if (!rivals.length) {
            container.innerHTML = '';
            this._setRivalPanelVisible(false);
            return;
        }

        this._setRivalPanelVisible(true);

        container.innerHTML = rivals.map(p => {
            const snap = this.rivalStates.get(p.id);
            const st = snap?.state || {};

            const cash = this._fmtMoney(st.cash);
            const rev = this._fmtMoney(st.revenue);
            const debt = this._fmtMoney(st.debt);
            const equity = (st.equity === null || st.equity === undefined || Number.isNaN(Number(st.equity)))
                ? '—'
                : `${Math.floor(Number(st.equity))}%`;
            const morale = this._fmtPct(st.morale);
            const rep = this._fmtPct(st.reputation);
            const timeLeft = this._fmtTimeLeft(st.timeLeft);

            const age = snap?.at ? Math.floor((Date.now() - snap.at) / 1000) : null;
            const freshness = (age === null) ? '' : `<span class="rival-sub">${age}s ago</span>`;

            return `
                <div class="rival-card">
                    <div class="rival-name">
                        <span>${this._escapeHtml(p.name || 'Rival')}</span>
                        ${freshness}
                    </div>
                    <div class="rival-metrics">
                        <div class="rival-metric"><span class="k">CASH</span><span class="v">${cash}</span></div>
                        <div class="rival-metric"><span class="k">REV</span><span class="v">${rev}</span></div>
                        <div class="rival-metric"><span class="k">MORALE</span><span class="v">${morale}</span></div>
                        <div class="rival-metric"><span class="k">REP</span><span class="v">${rep}</span></div>
                        <div class="rival-metric"><span class="k">DEBT</span><span class="v">${debt}</span></div>
                        <div class="rival-metric"><span class="k">EQ</span><span class="v">${equity}</span></div>
                        <div class="rival-metric"><span class="k">TIME</span><span class="v">${timeLeft}</span></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    setupLoadingManager() {
        THREE.DefaultLoadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
            this.setLoading(true, `INITIALIZING ASSETS... (${itemsLoaded}/${itemsTotal})`);
        };
        THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
            this.setLoading(true, `LOADING EMPIRE ASSETS... ${Math.round((itemsLoaded / itemsTotal) * 100)}%`);
        };
        THREE.DefaultLoadingManager.onLoad = () => {
            this.setLoading(false);
        };
        THREE.DefaultLoadingManager.onError = (url) => {
            console.error('There was an error loading ' + url);
            this.setLoading(false);
        };
    }

    setLoading(active, text = 'INITIALIZING SYSTEM...') {
        if (!this.loaderEl) return;
        // Suppress loader during Demo/Level 0 to keep experience seamless
        if (active && this.economy?.state?.currentLevel === 0) return;
        if (active) {
            this.loaderStatusEl.innerText = text;
            this.loaderEl.classList.remove('hidden');
            this.loaderEl.style.opacity = '1';
        } else {
            this.loaderEl.style.opacity = '0';
            setTimeout(() => {
                if (this.loaderEl.style.opacity === '0') {
                    this.loaderEl.classList.add('hidden');
                }
            }, 500);
        }
    }

    setupLighting() {
        // High ambient light for a bright, vibrant, cartoonish look without harsh contrast
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(40, 60, 20); // softer angle
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 4096;
        directionalLight.shadow.mapSize.height = 4096;
        directionalLight.shadow.camera.left = -80;
        directionalLight.shadow.camera.right = 80;
        directionalLight.shadow.camera.top = 80;
        directionalLight.shadow.camera.bottom = -80;
        directionalLight.shadow.bias = -0.001;

        // Soften the shadow edges somewhat
        directionalLight.shadow.radius = 2;
        this.scene.add(directionalLight);

        // Adds sky and ground color bounce for very soft ambient look
        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xd9efff, 1.0);
        this.scene.add(hemisphereLight);
    }

    init() {
        window.addEventListener('resize', () => this.onWindowResize());

        // Pending level start (used by the rules overlay)
        this._pendingRulesLevel = null;

        // Multiplayer/battle state helpers
        this.myPlayerIndex = null;
        this._globalChallengeSeen = new Map(); // key -> lastShownAt (ms)

        // --- SCREEN: Handle auth and intro skip ---
        const user = getUser();
        const progress = getProgress();

        if (!user) {
            // Not logged in — show auth screen
            this.showScreen('auth');
        } else {
            // Already logged in
            this.userName = user.username || user.full_name || 'CEO';
            this.userProfile = user;

            const tutorialDone = Boolean(progress.tutorial_done || user.tutorial_completed);
            if (tutorialDone) {
                this.renderDashboard();
                this.showScreen('dashboard');
            } else {
                this.showScreen('intro');
                this.initializeAvatarPicker();
                const nameInput = document.getElementById('user-name');
                if (nameInput) nameInput.value = this.userName;
            }
        }

        // SCREEN: Intro — initialize button
        const initBtn = document.getElementById('initialize-btn');
        initBtn.onclick = () => {
            const name = document.getElementById('user-name').value.trim();
            const currentUser = getUser();
            if (currentUser && name) {
                this.userName = name;
                this.userProfile = {
                    ...currentUser,
                    full_name: name,
                    avatar: this.avatars[this.avatarIndex]
                };

                // Persistence
                localStorage.setItem('empire_user', JSON.stringify(this.userProfile));

                const p = getProgress();
                const tutorialDone = Boolean(p.tutorial_done || currentUser.tutorial_completed);
                if (tutorialDone) {
                    this.renderDashboard();
                    this.showScreen('dashboard');
                } else {
                    this.startTutorial();
                }
            } else {
                this.showScreen('auth');
            }
        };

        // SCREEN: Dashboard
        document.getElementById('mode-map').onclick = () => {
            this.renderRoadway();
            this.showScreen('map');
        };

        // Logout buttons
        const dashBtn = document.getElementById('logout-btn-dashboard');
        if (dashBtn) dashBtn.onclick = () => this.logout();
        document.getElementById('logout-btn-map').onclick = () => this.logout();

        // SCREEN: BattleGround Lobby
        document.getElementById('mode-battle').onclick = () => this.showScreen('battle-lobby');
        document.getElementById('btn-create-room').onclick = () => { sfx.click(); this.createBattleRoom(); };
        document.getElementById('btn-show-join').onclick = () => {
            sfx.click();
            document.getElementById('lobby-init-ui').classList.add('hidden');
            document.getElementById('lobby-join-ui').classList.remove('hidden');
        };
        document.getElementById('btn-back-to-lobby').onclick = () => {
            sfx.click();
            document.getElementById('lobby-init-ui').classList.remove('hidden');
            document.getElementById('lobby-join-ui').classList.add('hidden');
        };
        document.getElementById('btn-join-room').onclick = () => {
            sfx.click();
            const code = document.getElementById('join-room-code').value.toUpperCase().trim();
            if (code) this.joinBattleRoom(code);
        };
        document.getElementById('leave-battle-btn').onclick = () => { sfx.click(); this.showScreen('dashboard'); };
        document.getElementById('start-battle-btn').onclick = () => {
            sfx.click();
            if (this.currentRoom) this.socket.startBattle(this.currentRoom.code);
        };

        // UI: Chat
        document.getElementById('send-chat-btn').onclick = () => { sfx.click(); this.sendChatMessage(); };
        document.getElementById('chat-input').onkeypress = (e) => {
            if (e.key === 'Enter') { sfx.click(); this.sendChatMessage(); }
        };

        // SCREEN: Map (Roadway)
        document.getElementById('back-to-dashboard').onclick = () =>  { sfx.click(); this.showScreen('dashboard')};

        // SCREEN: Rules (shown before starting a map level)
        const rulesCancelBtn = document.getElementById('rules-cancel');
        const rulesStartBtn = document.getElementById('rules-start');
        if (rulesCancelBtn) {
            rulesCancelBtn.onclick = () => {
                this._pendingRulesLevel = null;
                this.showScreen('map');
            };
        }
        if (rulesStartBtn) {
            rulesStartBtn.onclick = () => {
                const lv = this._pendingRulesLevel;
                this._pendingRulesLevel = null;
                if (Number.isFinite(lv)) {
                    this.startLevel(lv);
                } else {
                    this.showScreen('map');
                }
            };
        }

        // Dynamic level selection
        // Roadway level nodes
        document.querySelectorAll('.level-node').forEach(node => {
            node.onclick = () => {
                const lv = parseInt(node.dataset.level);
                const lastUnlocked = this.userProfile?.last_unlocked_level || 1;

                if (lv > lastUnlocked) {
                    sfx.error();
                    this.events.notify("⚠️ LEVEL LOCKED: Complete previous mission first!");
                    return;
                }

                this.startLevelFromMap(lv);
                this.updateSelectedLevelInfo(lv);
                sfx.click();
            };
        });

        document.getElementById('start-level-btn').onclick = () => {
            sfx.click();
            const lastUnlocked = (this.userProfile?.last_unlocked_level || 1);
            if (lastUnlocked > 5) {
                alert("All current protocols complete! Stay tuned for more levels.");
            } else {
                this.startLevelFromMap(lastUnlocked);
            }
        };

        // UI: Context Menu
        document.getElementById('close-menu').onclick = () => {
            this.menuEl.classList.add('hidden');
        };

        // Interaction
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.renderer.domElement.addEventListener('mousedown', (e) => this.onMouseDown(e));

        this.animate();
    }

    showScreen(screenId) {
        // Hide all overlays
        document.querySelectorAll('.overlay').forEach(s => s.classList.add('hidden'));

        if (screenId === 'none') {
            this.currentScreen = 'none';
            return;
        }

        const target = document.getElementById(`screen-${screenId}`);
        if (target) {
            target.classList.remove('hidden');
            this.currentScreen = screenId;
        }
    }

    logout() {
        import('./src/api.js').then(api => {
            api.clearSession();
            window.location.reload(); // Hard reset for clean state
        });
    }

    async renderDashboard() {
        // Update basic profile info
        document.getElementById('dash-ceo-name').innerText = this.userName.toUpperCase();
        const avatarImg = document.getElementById('dash-avatar-img');
        if (avatarImg && this.userProfile?.avatar) {
            avatarImg.src = this.userProfile.avatar;
        }

        const lastUnlocked = this.userProfile?.last_unlocked_level || 1;
        const unlockedCount = Math.max(0, Number(lastUnlocked) - 1);
        const rankEl = document.getElementById('dash-ceo-rank');
        if (rankEl) {
            const ranks = ['JUNIOR EXECUTIVE', 'SECTOR MANAGER', 'REGIONAL DIRECTOR', 'GLOBAL VICE PRESIDENT', 'CORPORATE MONARCH', 'EMPIRE OVERLORD'];
            rankEl.innerText = ranks[Math.min(lastUnlocked - 1, ranks.length - 1)];
        }

        const unlockedEl = document.getElementById('dash-kpi-unlocked');
        if (unlockedEl) unlockedEl.textContent = String(unlockedCount);

        const latestEl = document.getElementById('dash-kpi-latest');
        if (latestEl) latestEl.textContent = '--';

        const lastScoreEl = document.getElementById('dash-kpi-last-score');
        if (lastScoreEl) lastScoreEl.textContent = '--';

        const bestScoreEl = document.getElementById('dash-kpi-best-score');
        if (bestScoreEl) bestScoreEl.textContent = '--';

        // Fetch and show latest AI summary
        try {
            const { getGameHistory } = await import('./src/api.js');
            const history = await getGameHistory();
            const summaryBox = document.getElementById('latest-summary-box');

            const toFiniteNumber = (val) => {
                const n = Number(val);
                return Number.isFinite(n) ? n : null;
            };

            if (history && history.length > 0) {
                const latest = history[0]; // Assuming history is sorted by date
                const summary = latest?.ai_summary || latest?.summary || {};
                const level = latest?.level_completed || latest?.level || '?';
                const latestScore = toFiniteNumber(summary?.score ?? latest?.score);
                let bestScore = latestScore;

                for (const entry of history) {
                    const s = entry?.ai_summary || entry?.summary || {};
                    const sc = toFiniteNumber(s?.score ?? entry?.score);
                    if (sc === null) continue;
                    if (bestScore === null || bestScore === undefined) bestScore = sc;
                    else bestScore = Math.max(bestScore, sc);
                }

                if (latestEl) latestEl.textContent = `LEVEL ${level}`;
                if (lastScoreEl) lastScoreEl.textContent = latestScore === null ? '--' : `${latestScore}/100`;
                if (bestScoreEl) bestScoreEl.textContent = bestScore === null || bestScore === undefined ? '--' : `${bestScore}/100`;

                summaryBox.innerHTML = `
                    <div class="summary-header-mini">
                        <strong>LEVEL ${level}</strong> | 
                        <span>SCORE: ${(latestScore ?? 0)}/100</span>
                    </div>
                    <p>"${summary?.encouragement || 'Strategic analysis pending next operation.'}"</p>
                `;
            } else {
                summaryBox.innerHTML = `<p class="placeholder-text">Complete a protocol to receive AI strategic analysis.</p>`;
            }
        } catch (err) {
            console.warn('[Dashboard] Could not fetch game history:', err.message);
        }
    }

    async renderRoadway() {
        try {
            const { getProfile } = await import('./src/api.js');
            const profile = await getProfile();
            this.userProfile = profile;
        } catch (err) {
            console.warn('[Game] Failed to fetch profile for roadway:', err.message);
        }

        const lastUnlocked = this.userProfile?.last_unlocked_level || 1;
        document.querySelectorAll('.level-node').forEach(node => {
            const lv = parseInt(node.dataset.level);
            node.classList.remove('active', 'locked', 'completed');
            if (lv < lastUnlocked) {
                node.classList.add('completed');
            } else if (lv === lastUnlocked) {
                node.classList.add('active');
            } else {
                node.classList.add('locked');
            }
        });

        // Auto-select the last unlocked level info
        this.updateSelectedLevelInfo(Math.min(lastUnlocked, 5));
    }

    updateSelectedLevelInfo(lv) {
        const levelNames = {
            1: { name: 'SURVIVAL PHASE', desc: 'Reach $50,000 revenue. High volatility detected in the sector.' },
            2: { name: 'EXPANSION PHASE', desc: 'Scale operations to $150,000. New competitors are entering the fray.' },
            3: { name: 'DOMINANCE PHASE', desc: 'Secure $500,000 revenue. Assert market authority through tech and media.' },
            4: { name: 'MONOPOLY CORE', desc: 'Hit $1.5M revenue. Control the entire infrastructure of the metro area.' },
            5: { name: 'EMPIRE PROTOCOL', desc: 'Reach the ultimate $5M target. Ascend to Corporate Godhood.' }
        };

        const info = levelNames[lv];
        document.getElementById('road-level-title').innerText = `LEVEL ${lv}: ${info.name}`;
        document.getElementById('road-level-desc').innerText = info.desc;

        const startBtn = document.getElementById('start-level-btn');
        startBtn.innerText = `ENGAGE PROTOCOL ${lv}`;
        startBtn.onclick = () => this.startLevel(lv);

        // Visual feedback on nodes
        document.querySelectorAll('.level-node').forEach(node => {
            node.style.transform = parseInt(node.dataset.level) === lv ? 'scale(1.2) rotate(0deg)' : '';
            node.style.borderColor = parseInt(node.dataset.level) === lv ? 'var(--primary)' : '';
        });
    }

    startTutorial() {
        this.showScreen('none');
        this.showHUD();
        this.world.buildings.forEach(b => this.scene.remove(b));
        this.world.buildings = [];
        this.tutorial.start();
        this.economy.start(1);
    }

    startLevelFromMap(levelNum) {
        const lv = Number(levelNum) || 1;
        this._pendingRulesLevel = lv;
        this._renderRulesBriefing(lv);
        this.showScreen('rules');
    }

    _renderRulesBriefing(levelNum) {
        const titleEl = document.getElementById('rules-title');
        const bodyEl = document.getElementById('rules-body');
        if (!bodyEl) return;

        const LEVEL_METRICS = {
            1: { target: 50000, time: 180, name: 'SURVIVAL PHASE' },
            2: { target: 150000, time: 240, name: 'EXPANSION PHASE' },
            3: { target: 500000, time: 300, name: 'DOMINANCE PHASE' },
            4: { target: 1500000, time: 360, name: 'MONOPOLY CORE' },
            5: { target: 5000000, time: 480, name: 'EMPIRE PROTOCOL' }
        };
        const m = LEVEL_METRICS[levelNum] || LEVEL_METRICS[1];
        const mins = Math.max(1, Math.floor(m.time / 60));

        if (titleEl) titleEl.innerText = `LEVEL ${levelNum} RULES`;

        // Match economy.js numbers (base revenue per second)
        const baseIncome = [
            { name: 'Production Plant (Factory)', val: 140 },
            { name: 'Metro Storefront', val: 80 },
            { name: 'Logistics Warehouse', val: 40 },
            { name: 'R&D Lab', val: 20 },
            { name: 'Headquarters', val: 15 },
            { name: 'Media Tower', val: 15 },
            { name: 'NovaTech Bank', val: 10 },
            { name: 'HR Office', val: 5 }
        ];

        bodyEl.innerHTML = `
            <h2>Objective</h2>
            <p>Win by reaching <span class="highlight">$${Number(m.target).toLocaleString()}</span> revenue before time runs out (${mins} min).</p>

            <h2>How Money Increases</h2>
            <ul>
                <li>Every second, each building generates income (base amount × multipliers).</li>
                <li>Some buildings can be upgraded to increase output (Factory / Warehouse / R&D).</li>
            </ul>
            <p>Base income examples (per second):</p>
            <ul>
                ${baseIncome.map(b => `<li>${b.name}: +$${b.val}/sec</li>`).join('')}
            </ul>

            <h2>Multipliers & Penalties</h2>
            <ul>
                <li><b>Events</b> can reduce output until you fix them.</li>
                <li><b>Multiple active critical events</b> stack a revenue decay (up to a minimum floor).</li>
                <li><b>Morale</b> affects all output — low morale causes a steep drop.</li>
                <li><b>Reputation</b> affects consumer-facing output (storefront performance).</li>
                <li><b>Debt</b> costs interest each second if you take loans.</li>
            </ul>

            <h2>Buildings You’ll See</h2>
            <ul>
                <li><b>Headquarters</b> — boosts morale / strategy actions.</li>
                <li><b>HR Office</b> — hire/bonus to recover morale, resolve strikes.</li>
                <li><b>Factory</b> — highest output; can have accidents.</li>
                <li><b>Warehouse</b> — supply chain output; can have logistics crises.</li>
                <li><b>R&D Lab</b> — innovation income; can face data breaches.</li>
                <li><b>Bank</b> — loans/equity for emergency cash (adds debt risk).</li>
                <li><b>Media Tower</b> — reputation + PR actions, counters attacks.</li>
                <li><b>Storefront</b> — consumer sales output; influenced by reputation.</li>
            </ul>

            <h2>What You Can Do</h2>
            <ul>
                <li>Left-click a building → choose an action from the menu.</li>
                <li>Spend cash to upgrade, fix events, or stabilize morale/reputation.</li>
            </ul>

            <h2>How You Lose</h2>
            <ul>
                <li>Time hits zero.</li>
                <li>Cash drops too low (bankruptcy).</li>
                <li>Morale collapses (employees walk out).</li>
            </ul>
        `;
    }

    async startLevel(levelNum) {
        this.setLoading(true, `PROVISIONING SECTOR ${levelNum}...`);
        this.showScreen('none');
        this.showHUD();
        this.tutorial.isActive = false;
        document.getElementById('tutorial-popup').classList.add('hidden');
        this.world.spawnInitialBuildings(levelNum);
        this.economy.start(levelNum);
        music.start();   // Begin looping background music on first user interaction
        this.events.notify(`⚡ LEVEL ${levelNum} COMMENCING — SURVIVE THE STORM, ${this.userName.toUpperCase()}!`);

        // Connect to backend WebSocket and start session
        try {
            this.setLoading(true, 'SYNCING PROTOCOLS WITH COMMAND...');
            if (!this.socket) {
                this.socket = new GameSocket(this);
                await this.socket.connect();
            }
            const sessionId = await startGameSession(levelNum);
            this.socket.startGame(sessionId);
            this.setLoading(false);
        } catch (err) {
            console.warn('[Game] Backend offline, playing in offline mode:', err.message);
            this.socket = null;
            this.setLoading(false);
        }
    }

    showHUD() {
        document.getElementById('hud').classList.remove('hidden');
    }

    hideHUD() {
        document.getElementById('hud').classList.add('hidden');
    }

    onMouseDown(event) {
        if (this.currentScreen !== 'none' && !this.tutorial.isActive) return;
        if (event.button !== 0) return;

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.world.buildings, true);

        if (intersects.length > 0) {
            let object = intersects[0].object;
            while (object.parent && !object.userData.buildingId) {
                object = object.parent;
            }
            if (object.userData.buildingId) {
                const ownerIndex = object.userData.ownerIndex;
                const isMultiplayer = !!this.currentRoom;
                const myIndex = isMultiplayer ? this.currentRoom.players.findIndex(p => p.id === this.userProfile.id) : 0;

                // For shared buildings (bank/media), ownerIndex is undefined
                if (isMultiplayer && ownerIndex !== undefined && ownerIndex !== myIndex) {
                    this.events.notify(`🚫 That belongs to a competitor!`);
                    return;
                }

                this.showBuildingMenu(object);
            }
        } else {
            // Clicked empty space — hide menu
            this.menuEl.classList.add('hidden');
        }
    }

    endGame(win, reason) {
        this.setLoading(true, 'AI STRATEGIST ANALYZING GAMEPLAY...');
        this.economy.endGame(win, reason);
    }

    /**
     * Called by economy.js (or socket.js) when game ends.
     * Clears the fallback timeout if the backend sends the real summary.
     */
    showSummary(summary, outcome, reason) {
        this.setLoading(false);
        // Stop background music on game end
        music.stop();

        // Cancel the economy fallback timer if socket responded
        if (this.economy._summaryTimeout) {
            clearTimeout(this.economy._summaryTimeout);
            this.economy._summaryTimeout = null;
        }

        this.hideHUD();

        const existing = document.getElementById('screen-summary');
        if (existing) existing.remove();

        const screen = document.createElement('div');
        screen.id = 'screen-summary';
        screen.className = 'overlay summary-screen';
        const isWin = outcome === 'win';
        const currentLv = this.economy.state.currentLevel || 1;
        // If they just won their current highest level, increment locally
        if (isWin && currentLv >= (this.userProfile?.last_unlocked_level || 1)) {
            if (this.userProfile) this.userProfile.last_unlocked_level = currentLv + 1;
        }
        const lastUnlocked = this.userProfile?.last_unlocked_level || 1;
        const nextUnlockedLevel = isWin ? currentLv + 1 : null;

        screen.innerHTML = `
            <div class="summary-card">
                <div class="summary-header ${isWin ? 'win' : 'loss'}">
                    <div class="summary-icon">${isWin ? '🏆' : '💼'}</div>
                    <h1>${isWin ? 'Mission Complete!' : 'Mission Failed'}</h1>
                    <div class="summary-badge">${summary.badge || (isWin ? 'Rising CEO' : 'Determined Entrepreneur')}</div>
                </div>
                ${nextUnlockedLevel && nextUnlockedLevel <= 5 ? `<div class="level-unlock-banner">🔓 Level ${nextUnlockedLevel} Unlocked!</div>` : ''}
                ${reason ? `<div class="summary-reason">${reason}</div>` : ''}
                <div class="summary-body">
                    <div class="summary-score">
                        <span class="score-num">${summary.score || 0}</span>
                        <span class="score-label">/ 100</span>
                    </div>
                    <div class="summary-style">
                        Play Style: <strong>${(summary.play_style || 'balanced').replace(/_/g, ' ').toUpperCase()}</strong>
                    </div>
                    <div class="summary-sections">
                        <div class="summary-col">
                            <h3>💪 Strengths</h3>
                            <ul>${(summary.strengths || []).map(s => `<li>${s}</li>`).join('')}</ul>
                        </div>
                        <div class="summary-col">
                            <h3>🎯 Key Moments</h3>
                            <ul>${(summary.key_moments || []).map(m => `<li><em>t=${m.time}</em>: ${m.action} — ${m.impact}</li>`).join('')}</ul>
                        </div>
                    </div>
                    <div class="summary-encouragement">
                        ${summary.encouragement || (isWin ? '🎉 Amazing work!' : '💪 Keep trying!')}
                    </div>
                    <div class="summary-actions">
                        <button id="summary-play-again" class="primary-btn">🔄 Play Again</button>
                        <button id="summary-menu" class="secondary-btn">🏠 Main Menu</button>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('app').appendChild(screen);

        document.getElementById('summary-play-again').onclick = () => {
            sfx.click();
            screen.remove();
            this.startLevel(currentLv);
        };
        document.getElementById('summary-menu').onclick = () => {
            sfx.click();
            screen.remove();
            this.hideHUD();
            this.renderDashboard();
            this.showScreen('dashboard');
        };
    }

    // ─── BattleGround / Multiplayer Logic ────────────────────────────────────

    async connectSocket() {
        if (!this.socket) {
            this.setLoading(true, 'ESTABLISHING SECURE CONNECTION...');
            this.socket = new GameSocket(this);
            await this.socket.connect();
            this.setLoading(false);
        }
    }

    async createBattleRoom() {
        this.setLoading(true, 'PROVISIONING BATTLE ARENA...');
        await this.connectSocket();
        this.socket.createRoom();
        this.setLoading(false);
    }

    async joinBattleRoom(code) {
        this.setLoading(true, `JOINING ARENA: ${code}...`);
        await this.connectSocket();
        this.socket.joinRoom(code);
        this.setLoading(false);
    }

    onRoomCreated(code, room) {
        this.currentRoom = room;
        this.updateLobbyUI();
    }

    onPlayerJoined(players, room) {
        this.currentRoom = room;
        this.updateLobbyUI();
        this.events.notify(`👤 ${players[players.length - 1].name} joined the arena!`);
    }

    updateLobbyUI() {
        if (!this.currentRoom) return;
        document.getElementById('lobby-init-ui').classList.add('hidden');
        document.getElementById('lobby-join-ui').classList.add('hidden');
        document.getElementById('lobby-waiting-ui').classList.remove('hidden');

        document.getElementById('display-room-code').innerText = this.currentRoom.code;
        document.getElementById('player-count').innerText = `Waiting for CEOs (${this.currentRoom.players.length}/4)...`;

        const list = document.getElementById('lobby-player-list');
        list.innerHTML = this.currentRoom.players.map(p => `
            <div class="lobby-player-item">
                <span class="avatar">👨‍💼</span>
                <span class="name">${p.name} ${p.id === this.userProfile.id ? '(YOU)' : ''}</span>
                ${p.isAdmin ? '<span class="badge">HOST</span>' : ''}
            </div>
        `).join('');

        const startBtn = document.getElementById('start-battle-btn');
        const isHost = this.currentRoom.hostId === this.userProfile.id;
        startBtn.classList.toggle('locked', !isHost || this.currentRoom.players.length < 1); // Allow 1 for dev testing
        startBtn.disabled = !isHost;
    }

    onBattleStarted(room) {
        this.currentRoom = room;
        this.showScreen('none');
        this.showHUD();
        document.getElementById('multiplayer-hud').classList.remove('hidden');

        // Find my index
        const myIndex = room.players.findIndex(p => p.id === this.userProfile.id);
        this.myPlayerIndex = myIndex;
        this._globalChallengeSeen.clear();
        this.rivalStates.clear();
        this._renderRivalStats();

        // Enable existing backend coach/observer agents in BattleGround.
        try {
            this.socket?.startBattleSession?.(room.code);
        } catch {
            // best-effort
        }

        this.world.spawnMultiplayerBuildings(room.players.length, myIndex);
        this.economy.start(1, { timeOverride: 120 });
        music.start();   // Begin looping background music
        this.events.notify('⚔️ BATTLE COMMENCED! CRUSH THE COMPETITION!');
        this.updatePlayerList();
    }

    onPlayerStateUpdate(msg) {
        const myId = this.userProfile?.id;
        if (!msg || !msg.fromId || msg.fromId === myId) return;

        this.rivalStates.set(msg.fromId, { name: msg.fromName, state: msg.state || {}, at: Date.now() });

        // Keep local roster names in sync best-effort
        if (this.currentRoom?.players?.length) {
            const p = this.currentRoom.players.find(pp => pp.id === msg.fromId);
            if (p && msg.fromName) p.name = msg.fromName;
        }

        this._renderRivalStats();
    }

    _escapeHtml(s) {
        return String(s ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    _globalChallengeKey(challenge) {
        const key = (challenge?.key || challenge?.title || '').toString().toLowerCase().replace(/\s+/g, ' ').trim();
        const building = (challenge?.resolveBuilding || '').toString().toLowerCase().trim();
        return `${key}|${building}`;
    }

    _findBuildingForChallenge(resolveBuilding) {
        const type = String(resolveBuilding || '').toLowerCase().trim();
        if (!type || !this.world?.buildings?.length) return null;

        const candidates = this.world.buildings.filter(b => b?.userData?.type === type);
        if (!candidates.length) return null;

        // In multiplayer, pick a building from my zone if it exists.
        if (Number.isFinite(this.myPlayerIndex)) {
            const mine = candidates.find(b => Number.isFinite(b?.userData?.ownerIndex) && b.userData.ownerIndex === this.myPlayerIndex);
            if (mine) return mine;
        }

        // Otherwise prefer an unowned/shared building.
        const shared = candidates.find(b => !Number.isFinite(b?.userData?.ownerIndex));
        return shared || candidates[0];
    }

    showGlobalChallengeAtBuilding(challenge) {
        const now = Date.now();
        const key = this._globalChallengeKey(challenge);

        // Drop duplicates (client-side) to prevent stacked notifications if the loop repeats.
        const last = this._globalChallengeSeen.get(key);
        if (last && (now - last) < 120000) return; // 2 minutes
        this._globalChallengeSeen.set(key, now);

        // Prune old keys to keep memory bounded
        for (const [k, t] of this._globalChallengeSeen.entries()) {
            if ((now - t) > 10 * 60 * 1000) this._globalChallengeSeen.delete(k);
        }

        const buildingObj = this._findBuildingForChallenge(challenge?.resolveBuilding);
        if (!buildingObj) {
            // Fallback to the existing alert panel if we cannot anchor the popup.
            this.showGlobalChallengePopup(challenge);
            return;
        }

        const type = buildingObj.userData?.type;
        const typeConfig = this.world.buildingTypes?.[type];
        const dept = challenge?.department || typeConfig?.name || 'Department';
        const icon = challenge?.icon || '🤖';

        // Ensure the UI nodes exist; if not, gracefully fall back.
        const menuRoot = this.menuEl || document.getElementById('context-menu');
        const nameEl = menuRoot?.querySelector?.('#building-name') || document.getElementById('building-name');
        const statsEl = menuRoot?.querySelector?.('#building-stats') || document.getElementById('building-stats');
        const actionsContainer = menuRoot?.querySelector?.('#building-actions') || document.getElementById('building-actions');

        if (!menuRoot || !nameEl || !statsEl || !actionsContainer) {
            // Fallback to the existing alert panel if we cannot safely build the anchored UI.
            this.showGlobalChallengePopup(challenge);
            return;
        }

        // Attach the context menu billboard to the building model
        buildingObj.add(this.buildingMenuLabel);
        this.buildingMenuLabel.position.set(0, (typeConfig?.size?.[1] ? (typeConfig.size[1] * (typeConfig.scale || 1) * 0.1) : 3) + 2, 0);

        nameEl.innerText = `${icon} ${dept}: ${challenge?.title || 'GLOBAL CHALLENGE'}`;
        const desc = this._escapeHtml(challenge?.desc || '');
        const impact = this._escapeHtml(challenge?.impact || '');
        statsEl.innerHTML = `
            <p><strong>Source:</strong> ${this._escapeHtml(dept)}</p>
            <p>${desc}</p>
            <p class="event-impact-text">${impact}</p>
        `;

        actionsContainer.innerHTML = '';
        const actions = Array.isArray(challenge?.resolveActions) ? challenge.resolveActions : [];
        actions.forEach(act => {
            const btn = document.createElement('button');
            btn.className = 'action-btn';
            const label = act?.label || 'Respond';
            const cost = Number(act?.cost) || 0;
            btn.innerText = cost ? `${label} (–$${cost})` : label;
            btn.onclick = () => {
                this.resolveGlobalChallenge(challenge, act);
                this.menuEl.classList.add('hidden');
            };
            actionsContainer.appendChild(btn);
        });

        // Slight camera focus so the player sees *which* building is affected.
        try {
            const pos = new THREE.Vector3();
            buildingObj.getWorldPosition(pos);
            this.controls.target.set(pos.x, 0, pos.z);
        } catch {
            // ignore
        }

        this.menuEl.classList.remove('hidden');
    }

    updatePlayerList() {
        const container = document.getElementById('players-container');
        if (!this.currentRoom) return;

        container.innerHTML = this.currentRoom.players.map(p => {
            const isMe = p.id === this.userProfile.id;
            return `
                <div class="online-player ${isMe ? 'me' : ''}">
                    <span class="p-name">${p.name}</span>
                    ${!isMe ? `
                        <div class="p-actions">
                            <button onclick="window.game.initPrivateChat('${p.id}', '${p.name}')" title="Private Chat">💬</button>
                            <button onclick="window.game.initServiceRequest('${p.id}', '${p.name}')" title="Request Service">🤝</button>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        this._renderRivalStats();
    }

    initPrivateChat(toId, toName) {
        const input = document.getElementById('chat-input');
        input.value = `/w ${toName} `; // Visual cue for private message
        input.focus();
        this.privateChatTarget = { id: toId, name: toName };
    }

    initServiceRequest(toId, toName) {
        // Simple placeholder for now: Send a "Strategy Partnership" request
        this.socket.sendServiceRequest(toId, 'Strategic Partnership', {
            offer: 'Shared Market Intel',
            cost: 5000
        });
        this.events.notify(`🤝 Offer sent to ${toName}!`);
    }

    sendChatMessage() {
        const input = document.getElementById('chat-input');
        let text = input.value.trim();
        if (!text || !this.socket) return;

        let toId = null;
        if (text.startsWith('/w ') && this.privateChatTarget) {
            toId = this.privateChatTarget.id;
            text = text.replace(/^\/w [^ ]+ /, ''); // Strip the prefix
        }

        this.socket.sendChat(text, toId);
        input.value = '';
        if (toId) this.privateChatTarget = null;
    }

    onChatMessage(msg) {
        const container = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = 'chat-msg';
        div.innerHTML = `
            <span class="author">${msg.fromId === this.userProfile.id ? 'YOU' : msg.fromName}:</span>
            <span class="text">${msg.text}</span>
            ${msg.isPrivate ? '<span class="private">[PRIVATE]</span>' : ''}
        `;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    onServiceRequest(msg) {
        this.events.notify(`📩 SERVICE REQUEST from ${msg.fromName}: ${msg.requestType}`, 'opportunity', [
            {
                label: `ACCEPT (${msg.data.cost ? '$' + msg.data.cost : 'FREE'})`,
                action: () => this.acceptServiceRequest(msg)
            }
        ]);
    }

    onGlobalChallenge(challenge) {
        // Show as a building-anchored popup (not stacked toasts)
        this.showGlobalChallengeAtBuilding(challenge);
    }

    showGlobalChallengePopup(challenge) {
        // We reuse the existing Alert panel but with a special AI theme
        const alertEl = document.getElementById('event-alert');
        const inner = document.getElementById('event-alert-inner');

        inner.style.borderColor = '#9b59b6'; // Purple for AI
        inner.style.boxShadow = '0 0 60px rgba(155, 89, 182, 0.4)';

        document.getElementById('event-icon').innerText = '🤖';
        document.getElementById('event-title').innerText = `GAME MASTER: ${challenge.title}`;
        document.getElementById('event-urgency').innerText = challenge.urgency;
        document.getElementById('event-urgency').className = `urgency-${challenge.urgency.toLowerCase()}`;
        document.getElementById('event-desc').innerText = challenge.desc;
        document.getElementById('event-impact').innerText = challenge.impact;

        const actionsContainer = document.getElementById('event-actions');
        actionsContainer.innerHTML = '';
        challenge.resolveActions.forEach(act => {
            const btn = document.createElement('button');
            btn.className = 'primary-btn';
            btn.style.background = 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)';
            btn.innerText = `${act.label} (–$${act.cost})`;
            btn.onclick = () => {
                sfx.click();
                this.resolveGlobalChallenge(challenge, act);
                alertEl.classList.add('hidden');
            };
            actionsContainer.appendChild(btn);
        });

        alertEl.classList.remove('hidden');
    }

    resolveGlobalChallenge(challenge, action) {
        if (this.economy.state.cash < action.cost) {
            this.events.notify('❌ Insufficient funds for this strategic move!');
            return;
        }

        this.economy.state.cash -= action.cost;
        this.economy.state.revenue += 2000; // Bonus for solving AI challenge
        this.economy.state.reputation = Math.min(100, this.economy.state.reputation + 10);
        this.economy.updateUI();

        // Log for AI summary
        this.socket.sendAction(
            'resolve_global_challenge',
            'SYSTEM',
            action.cost,
            { revenue: 2000, reputation: 10, challengeId: challenge.id }
        );

        this.events.notify(`✅ ${action.label} SUCCESSFUL! Profit boost applied.`);
        this.socket.sendChat(`🚀 I have successfully addressed the "${challenge.title}" challenge!`);
    }

    acceptServiceRequest(msg) {
        if (msg.data.cost && this.economy.state.cash < msg.data.cost) {
            this.events.notify('❌ Not enough cash to accept this partnership.');
            return;
        }

        if (msg.data.cost) this.economy.state.cash -= msg.data.cost;
        this.economy.state.morale = Math.min(100, this.economy.state.morale + 10);
        this.economy.updateUI();

        this.events.notify(`✅ Partnership with ${msg.fromName} established!`);

        // Notify the sender (simplistic for now via chat)
        this.socket.sendChat(`🤝 I have accepted your ${msg.requestType}!`, msg.fromId);
    }

    showBuildingMenu(buildingObj) {
        const data = buildingObj.userData;
        document.getElementById('building-name').innerText = data.name;

        const typeConfig = this.world.buildingTypes[data.type];
        document.getElementById('building-stats').innerHTML = `<p>${typeConfig.description}</p>`;

        const actionsContainer = document.getElementById('building-actions');
        actionsContainer.innerHTML = '';

        typeConfig.actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'action-btn';
            btn.innerText = action.label;
            btn.onclick = () => {
                sfx.click();
                this.economy.executeAction(action.id, data);
                this.tutorial.onGameAction(action.id);
                this.menuEl.classList.add('hidden');
            };
            actionsContainer.appendChild(btn);
        });

        // Attach billboard to the building model
        buildingObj.add(this.buildingMenuLabel);
        // Position it at the top of the building (Y offset)
        this.buildingMenuLabel.position.set(0, (typeConfig.size[1] * typeConfig.scale * 0.1) + 2, 0);

        this.menuEl.classList.remove('hidden');
    }

    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        const d = 20;
        this.camera.left = -d * aspect;
        this.camera.right = d * aspect;
        this.camera.top = d;
        this.camera.bottom = -d;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    initializeAvatarPicker() {
        this.avatars = [
            'assets/avatars/youngGuy.png',
            'assets/avatars/women.png',
            'assets/avatars/oldDude.png'
        ];
        this.avatarIndex = 0;

        const prevBtn = document.getElementById('prev-avatar');
        const nextBtn = document.getElementById('next-avatar');
        const img = document.getElementById('selected-avatar-img');

        if (!prevBtn || !nextBtn || !img) return;

        const updateAvatar = () => {
            img.src = this.avatars[this.avatarIndex];
        };

        prevBtn.onclick = () => {
            this.avatarIndex = (this.avatarIndex - 1 + this.avatars.length) % this.avatars.length;
            updateAvatar();
        };

        nextBtn.onclick = () => {
            this.avatarIndex = (this.avatarIndex + 1) % this.avatars.length;
            updateAvatar();
        };
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        if (this.world) this.world.update();
        if (this.economy) this.economy.update();
        if (this.events) this.events.update();
        this.renderer.render(this.scene, this.camera);
        this.labelRenderer.render(this.scene, this.camera);
    }
}

new Game();

