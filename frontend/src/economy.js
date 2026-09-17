import confetti from 'canvas-confetti';
import { getProgress, saveProgress } from './api.js';

export class Economy {
    constructor(game) {
        this.game = game;
        this.baseState = {
            cash: 10000,
            revenue: 0,
            targetRevenue: 50000,
            morale: 80,       // Start lower — morale is harder to maintain
            reputation: 85,   // Slightly below max
            equity: 100,
            debt: 0,
            // Upgrade multipliers (these MUST affect ticking output)
            factoryMult: 1,
            warehouseMult: 1,
            rdMult: 1,
            timeLeft: 180,
            running: false
        };

        this.state = { ...this.baseState };
        this.tickRate = 1000;
        this.lastTick = 0;

        this.ui = {
            cash: document.getElementById('cash-value'),
            revenue: document.getElementById('revenue-value'),
            morale: document.getElementById('morale-value'),
            reputation: document.getElementById('reputation-value'),
            progress: document.getElementById('revenue-progress'),
            timer: document.getElementById('timer-value'),
            objTitle: document.getElementById('objective-title'),
            objDesc: document.getElementById('objective-desc')
        };

        // Track last UI values so we can show small +/- deltas.
        this._lastUi = null;

        // Backend observer cadence (avoid every tick)
        this._lastStateSyncSecond = null;
    }

    _getUpgradeMult(type) {
        switch (type) {
            case 'factory': return this.state.factoryMult || 1;
            case 'warehouse': return this.state.warehouseMult || 1;
            case 'rd': return this.state.rdMult || 1;
            default: return 1;
        }
    }

    _getBaseRevenuePerSec(type) {
        switch (type) {
            case 'hq': return 15;
            case 'factory': return 140;
            case 'storefront': return 80;
            case 'hr': return 5;
            case 'bank': return 10;
            case 'rd': return 20;
            case 'warehouse': return 40;
            case 'media': return 15;
            default: return 0;
        }
    }

    start(level = 1, options = {}) {
        const LEVEL_METRICS = {
            0: { target: 1000000, time: 3600, name: 'INITIALIZING COMMAND' },
            1: { target: 50000, time: 180, name: 'SURVIVAL PHASE' },
            2: { target: 150000, time: 240, name: 'EXPANSION PHASE' },
            3: { target: 500000, time: 300, name: 'DOMINANCE PHASE' },
            4: { target: 1500000, time: 360, name: 'MONOPOLY CORE' },
            5: { target: 5000000, time: 480, name: 'EMPIRE PROTOCOL' }
        };

        const metrics = LEVEL_METRICS[level] || LEVEL_METRICS[1];
        const timeOverride = Number(options?.timeOverride);
        const startTime = Number.isFinite(timeOverride) && timeOverride > 0 ? Math.floor(timeOverride) : metrics.time;

        this.state = {
            ...this.baseState,
            currentLevel: level,
            targetRevenue: metrics.target,
            timeLeft: startTime
        };

        // Used for scoring (time bonus) and any future display.
        this._initialTime = startTime;

        // Update Objective UI
        if (this.ui.objTitle) {
            this.ui.objTitle.innerText = `LEVEL ${level}: ${metrics.name}`;
        }
        if (this.ui.objDesc) {
            this.ui.objDesc.innerHTML = `Reach <span class="highlight">$${metrics.target.toLocaleString()}</span> revenue in ${Math.floor(startTime / 60)} minutes.`;
        }

        document.title = `Empire Protocol | Level ${level}: ${metrics.name}`;

        this.state.running = true;
        this.lastTick = Date.now();
        this.game.events.start();
        this.updateUI();
    }

    update() {
        if (!this.state.running) return;
        const now = Date.now();
        if (now - this.lastTick >= this.tickRate) {
            this.tick();
            this.lastTick = now;
        }
    }

    tick() {
        if (!this.state.running) return;

        // --- TIMER ---
        this.state.timeLeft--;
        if (this.state.timeLeft <= 0) {
            this.endGame(false, 'TIME EXPIRED. The board has revoked your access to the Protocol.');
            return;
        }

        // --- REVENUE (lower base, more sensitive to penalties) ---
        let currentTickRevenue = 0;
        this.game.world.buildings.forEach(b => {
            const type = b.userData.type;
            const eventMult = this.game.events.getRevenueMultiplier(type);
            const upgradeMult = this._getUpgradeMult(type);
            const base = this._getBaseRevenuePerSec(type);

            switch (type) {
                case 'factory':
                case 'warehouse':
                case 'rd':
                    currentTickRevenue += Math.floor(base * eventMult * upgradeMult);
                    break;
                default:
                    currentTickRevenue += Math.floor(base * eventMult);
                    break;
            }
        });

        // REVENUE DECAY: If any critical event is active, revenue drops by an extra 5% per second
        const activeEventsCount = this.game.events.activeEventIds.size;
        if (activeEventsCount > 0) {
            const decay = 1 - (activeEventsCount * 0.05);
            currentTickRevenue = Math.floor(currentTickRevenue * Math.max(0.5, decay));
        }

        // Morale affects ALL output — low morale is devastating
        const moraleMultiplier = this.state.morale < 50
            ? Math.pow(this.state.morale / 100, 1.5) // Steeper drop at low morale
            : this.state.morale / 100;
        currentTickRevenue = Math.floor(currentTickRevenue * moraleMultiplier);

        // Reputation affects consumer-facing output
        const repMultiplier = this.state.reputation < 70
            ? Math.max(0.1, this.state.reputation / 100)
            : 1.0;
        currentTickRevenue = Math.floor(currentTickRevenue * repMultiplier);

        this.state.cash += currentTickRevenue;
        this.state.revenue += currentTickRevenue;

        // Debt interest (steeper compounding)
        // Debt interest (0.8% per second)
        if (this.state.debt > 0) {
            const interest = Math.ceil(this.state.debt * 0.008);
            this.state.cash -= interest;
        }

        // Natural morale decay (statically faster)
        this.state.morale = Math.max(0, this.state.morale - 0.2); // Doubled decay

        // Bankruptcy check (stricter: cash < 0 for too long)
        if (this.state.cash < -3000) {
            this.endGame(false, 'BANKRUPTCY DECLARED. Your company is insolvent.');
            return;
        }

        // Morale collapse → game over
        if (this.state.morale <= 1) {
            this.endGame(false, 'MORALE COLLAPSED. All employees have walked out.');
            return;
        }

        this.updateUI();
        this.checkWinCondition();

        // Periodic state snapshot for backend Observer/Coach (every 5 seconds)
        if (this.game.socket) {
            const elapsedSecs = this.game.socket._elapsed?.() ?? null;
            if (Number.isFinite(elapsedSecs)) {
                const sec = Math.floor(elapsedSecs);
                if (sec !== this._lastStateSyncSecond && sec % 5 === 0) {
                    this._lastStateSyncSecond = sec;
                    this.game.socket.sendStateUpdate({
                        cash: Math.floor(this.state.cash),
                        revenue: Math.floor(this.state.revenue),
                        morale: Math.floor(this.state.morale),
                        reputation: Math.floor(this.state.reputation),
                        debt: Math.floor(this.state.debt),
                        equity: Math.floor(this.state.equity),
                        timeLeft: Math.floor(this.state.timeLeft),
                        factoryMult: this.state.factoryMult,
                        warehouseMult: this.state.warehouseMult,
                        rdMult: this.state.rdMult
                    });
                }
            }
        }
    }

    updateUI() {
        if (!this.ui.cash) return;

        // Delta animations
        const current = {
            cash: Math.floor(this.state.cash),
            revenue: Math.floor(this.state.revenue),
            morale: Math.floor(this.state.morale),
            reputation: Math.floor(this.state.reputation)
        };
        if (this._lastUi) {
            this._emitDelta(this.ui.cash, current.cash - this._lastUi.cash, { kind: 'money' });
            this._emitDelta(this.ui.revenue, current.revenue - this._lastUi.revenue, { kind: 'money' });
            this._emitDelta(this.ui.morale, current.morale - this._lastUi.morale, { kind: 'percent' });
            this._emitDelta(this.ui.reputation, current.reputation - this._lastUi.reputation, { kind: 'percent' });
        }
        this._lastUi = current;

        this.ui.cash.innerText = `$${Math.floor(this.state.cash).toLocaleString()}`;
        this.ui.revenue.innerText = `$${Math.floor(this.state.revenue).toLocaleString()}`;
        this.ui.morale.innerText = `${Math.floor(this.state.morale)}%`;
        this.ui.reputation.innerText = `${Math.floor(this.state.reputation)}%`;

        const progress = (this.state.revenue / this.state.targetRevenue) * 100;
        this.ui.progress.style.width = `${Math.min(progress, 100)}%`;

        const mins = Math.floor(this.state.timeLeft / 60);
        const secs = this.state.timeLeft % 60;
        this.ui.timer.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        this.ui.timer.style.color = this.state.timeLeft < 30 ? '#ff4757' : '#ffcd29';
        this.ui.cash.style.color = this.state.cash < 0 ? '#ff4757' : '#2ed573';
        this.ui.morale.style.color = this.state.morale < 40 ? '#ff4757' : this.state.morale < 60 ? '#ffa502' : '#2c3e50';
        this.ui.reputation.style.color = this.state.reputation < 40 ? '#ff4757' : this.state.reputation < 60 ? '#ffa502' : '#2c3e50';
    }

    _emitDelta(valueEl, delta, { kind }) {
        if (!valueEl || !delta) return;
        const parent = valueEl.closest('.metric-item');
        if (!parent) return;

        // Avoid spam: hide very tiny percent wiggles.
        if (kind === 'percent' && Math.abs(delta) < 1) return;

        const el = document.createElement('span');
        el.className = `metric-delta ${delta > 0 ? 'up' : 'down'}`;

        if (kind === 'money') {
            const abs = Math.abs(delta);
            el.textContent = `${delta > 0 ? '+' : '-'}$${abs.toLocaleString()}`;
        } else {
            el.textContent = `${delta > 0 ? '+' : ''}${delta}%`;
        }

        parent.appendChild(el);
        // Cleanup after animation
        setTimeout(() => el.remove(), 950);
    }

    executeAction(actionId, buildingData) {
        let success = false;
        const eco = this.state;
        const ev = this.game.events;
        const notify = (msg, type = 'info') => ev.notify(msg, type);

        switch (actionId) {
            // --- BANK ---
            case 'take_loan':
                eco.cash += 5000;
                eco.debt += 5000;
                notify(
                    `💰 LOAN APPROVED: +$5,000 cash | Debt: +$5,000. ⚠️ Interest is ~0.8%/sec (≈ -$${Math.ceil(eco.debt * 0.008).toLocaleString()}/sec right now).`,
                    'warning'
                );
                success = true;
                break;
            case 'sell_equity':
                if (eco.equity >= 10) {
                    eco.cash += 10000;
                    eco.equity -= 10;
                    notify(`📊 EQUITY SOLD: +$10,000 cash | Ownership -10% (Remaining: ${eco.equity}%). No interest cost.`, 'positive');
                    success = true;
                } else notify('❌ Not enough equity to sell (need at least 10%).', 'negative');
                break;

            // --- HQ ---
            case 'optimize':
                eco.morale = Math.min(100, eco.morale + 8);
                notify('🔧 OPERATIONS OPTIMIZED: Morale +8%. Higher morale increases ALL revenue.', 'positive');
                success = true;
                break;

            // --- HR ---
            case 'bonus':
                if (eco.cash >= 2000) {
                    eco.cash -= 2000;
                    eco.morale = Math.min(100, eco.morale + 20);
                    notify('🎁 STAFF BONUS: -$2,000 | Morale +20% (boosts total revenue/sec).', 'positive');
                    success = true;
                } else notify('❌ Insufficient cash for Staff Bonus (need $2,000).', 'negative');
                break;
            case 'hire_staff':
                if (eco.cash >= 3000) {
                    eco.cash -= 3000;
                    eco.morale = Math.min(100, eco.morale + 10);
                    notify('👥 HIRED STAFF: -$3,000 | Morale +10% (stabilizes revenue scaling).', 'positive');
                    success = true;
                } else notify('❌ Insufficient cash to hire staff (need $3,000).', 'negative');
                break;
            case 'resolve_strike':
                ev.resolveEvent({ id: 'staff_strike', resolveActions: [] }, 'resolve_strike');
                success = true;
                break;

            // --- FACTORY ---
            case 'expand_prod':
                if (eco.cash >= 5000) {
                    eco.cash -= 5000;
                    eco.factoryMult = Math.min(3, (eco.factoryMult || 1) * 1.3);
                    notify(`🏭 PRODUCTION EXPANDED: -$5,000 | Factory revenue +30% (Total factory boost: ×${eco.factoryMult.toFixed(2)}).`, 'positive');
                    success = true;
                } else notify('❌ Insufficient cash to expand production (need $5,000).', 'negative');
                break;
            case 'safety_protocol':
                ev.resolveEvent({ id: 'factory_accident', resolveActions: [] }, 'safety_protocol');
                success = true;
                break;

            // --- WAREHOUSE ---
            case 'storage_upgrade':
                if (eco.cash >= 4000) {
                    eco.cash -= 4000;
                    eco.warehouseMult = Math.min(3, (eco.warehouseMult || 1) * 1.5);
                    notify(`🚚 WAREHOUSE UPGRADED: -$4,000 | Warehouse revenue +50% (Total warehouse boost: ×${eco.warehouseMult.toFixed(2)}).`, 'positive');
                    success = true;
                } else notify('❌ Insufficient cash to upgrade warehouse (need $4,000).', 'negative');
                break;
            case 'logistics_fix':
                ev.resolveEvent({ id: 'supply_crisis', resolveActions: [] }, 'logistics_fix');
                success = true;
                break;

            // --- R&D ---
            case 'research':
                if (eco.cash >= 3000) {
                    eco.cash -= 3000;
                    eco.rdMult = Math.min(3, (eco.rdMult || 1) * 1.25);
                    notify(`🔬 R&D INVESTMENT: -$3,000 | R&D revenue boosted (Total R&D boost: ×${eco.rdMult.toFixed(2)}).`, 'positive');
                    success = true;
                } else notify('❌ Insufficient cash for R&D (need $3,000).', 'negative');
                break;
            case 'security_patch':
                ev.resolveEvent({ id: 'rd_breach', resolveActions: [] }, 'security_patch');
                success = true;
                break;

            // --- MEDIA ---
            case 'counter_campaign':
                ev.resolveEvent({ id: 'competitor_launch', resolveActions: [] }, 'counter_campaign');
                success = true;
                break;
            case 'surge_broadcast':
                ev.resolveEvent({ id: 'market_opportunity', resolveActions: [] }, 'surge_broadcast');
                success = true;
                break;
            case 'marketing_campaign':
                if (eco.cash >= 2000) {
                    eco.cash -= 2000;
                    eco.reputation = Math.min(100, eco.reputation + 15);
                    eco.morale = Math.min(100, eco.morale + 5);
                    notify('📢 MEDIA CAMPAIGN: -$2,000 | Reputation +15, Morale +5 (both improve revenue scaling).', 'positive');
                    success = true;
                } else notify('❌ Insufficient cash for Media Campaign (need $2,000).', 'negative');
                break;
            case 'pr_statement':
                eco.reputation = Math.min(100, eco.reputation + 10);
                notify('📰 PR STATEMENT: Reputation +10 (protects consumer revenue).', 'positive');
                success = true;
                break;
        }

        this.updateUI();

        if (success && this.game.socket) {
            const buildingType = buildingData?.type || buildingData?.userData?.type || 'SYSTEM';
            // We consolidate the data into a single consistent format for the AI logs
            let actionData = { cost: 0, effect: {} };

            // Map specific fields for AI context
            if (actionId === 'take_loan') actionData = { cost: 0, effect: { cash: 5000, debt: 5000 } };
            if (actionId === 'sell_equity') actionData = { cost: 0, effect: { cash: 10000, equity_delta: -10 } };
            if (actionId === 'bonus') actionData = { cost: 2000, effect: { morale: 20 } };
            if (actionId === 'hire_staff') actionData = { cost: 3000, effect: { morale: 10 } };
            if (actionId === 'expand_prod') actionData = { cost: 5000, effect: { factoryMult: eco.factoryMult } };
            if (actionId === 'storage_upgrade') actionData = { cost: 4000, effect: { warehouseMult: eco.warehouseMult } };
            if (actionId === 'research') actionData = { cost: 3000, effect: { rdMult: eco.rdMult } };
            if (actionId === 'marketing_campaign') actionData = { cost: 2000, effect: { reputation: 15, morale: 5 } };
            if (actionId === 'pr_statement') actionData = { cost: 0, effect: { reputation: 10 } };
            if (actionId === 'optimize') actionData = { cost: 0, effect: { morale: 8 } };

            this.game.socket.sendAction(actionId, buildingType, actionData.cost, actionData.effect);
        }

        return success;
    }

    checkWinCondition() {
        if (this.state.revenue >= this.state.targetRevenue) {
            this.endGame(true);
        }
    }

    endGame(win, reason) {
        this.state.running = false;
        this.game.events.dismissAlert?.();

        if (win) {
            confetti({
                particleCount: 250,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#47a1ff', '#ffcd29', '#2ed573', '#ffffff']
            });
            this.game.events.notify(`🏆 MISSION COMPLETE! Revenue: $${Math.floor(this.state.revenue).toLocaleString()}`);
        } else {
            this.game.events.notify(`❌ MISSION FAILED: ${reason}`);
        }

        // Save progress
        const progress = getProgress();
        const currentLv = this.state.currentLevel || 1;
        if (win) {
            progress[`level${currentLv}_complete`] = true;
            progress[`level${currentLv + 1}_unlocked`] = true;
            saveProgress(progress);
        }

        // Build the win/lose screen
        const showSummary = (summary) => this.game.showSummary(summary, win ? 'win' : 'loss', reason);

        if (this.game.socket) {
            if (this.game.setLoading) this.game.setLoading(true, 'AI STRATEGIST ANALYZING GAMEPLAY...');
            // Backend will send game_summary via WS
            this.game.socket.sendGameOver(
                win ? 'win' : (this.state.timeLeft <= 0 ? 'loss_time' : 'loss_bankrupt'),
                {
                    cash: Math.floor(this.state.cash),
                    revenue: Math.floor(this.state.revenue),
                    morale: Math.floor(this.state.morale),
                    reputation: Math.floor(this.state.reputation)
                }
            );
            // Fallback if server takes too long
            this._summaryTimeout = setTimeout(() => {
                showSummary({
                    score: this._calcScore(win),
                    badge: win ? `⭐ Level ${currentLv} Champion` : '💼 Keep Going',
                    play_style: 'balanced',
                    strengths: win ? ['Survived all events', 'Reached revenue target'] : ['Tried their best'],
                    key_moments: [],
                    encouragement: win ? `🎉 Amazing! Level ${currentLv + 1} is now unlocked!` : '💪 Every CEO fails sometimes. Try again!'
                });
            }, 5000);
        } else {
            // Offline: show summary immediately
            setTimeout(() => showSummary({
                score: this._calcScore(win),
                badge: win ? '⭐ Level 1 Champion' : '💼 Keep Going',
                play_style: 'balanced',
                strengths: win ? ['Survived all events', 'Built revenue without backend'] : ['Played offline'],
                key_moments: [],
                encouragement: win ? '🎉 Amazing! Level 2 is now unlocked!' : '💪 Every CEO fails sometimes. Try again!'
            }), win ? 2000 : 1500);
        }
    }

    _calcScore(win) {
        if (!win) {
            return Math.floor((this.state.revenue / this.state.targetRevenue) * 50);
        }
        const denom = Number.isFinite(this._initialTime) && this._initialTime > 0 ? this._initialTime : 180;
        const timeBonus = Math.floor((this.state.timeLeft / denom) * 30);
        const moraleBonus = Math.floor(this.state.morale / 5);
        const repBonus = Math.floor(this.state.reputation / 5);
        return Math.min(100, 50 + timeBonus + moraleBonus + repBonus);
    }
}
