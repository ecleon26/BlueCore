import { sfx } from './audio.js';
import { tts } from './tts.js';

// ── Client-side event schedule (used when backend is offline / no socket) ────
const LEVEL_1_EVENTS = [
    {
        id: 'factory_accident',
        triggerAt: 20,
        icon: '🔥',
        title: 'FACTORY ACCIDENT',
        urgency: 'CRITICAL',
        desc: 'A fire broke out on the production floor! Workers are evacuating.',
        impact: 'CRITICAL Penalty: Factory revenue drops to 10% AND costs $400/sec until resolved.',
        resolveBuilding: 'factory',
        resolveActions: [{ label: 'Emergency Safety Protocol (–$2,000)', id: 'safety_protocol' }]
    },
    {
        id: 'staff_strike',
        triggerAt: 40,
        icon: '😤',
        title: 'STAFF STRIKE',
        urgency: 'HIGH',
        desc: 'Employees are walking out! Demands for higher pay are escalating fast.',
        impact: 'HIGH Penalty: Morale drains –4% every second. Ignore and it hits 0.',
        resolveBuilding: 'hr',
        resolveActions: [{ label: 'Distribute Staff Bonus (–$3,000)', id: 'resolve_strike' }]
    },
    {
        id: 'competitor_launch',
        triggerAt: 70,
        icon: '📉',
        title: 'COMPETITOR PRODUCT LAUNCH',
        urgency: 'HIGH',
        desc: 'RivalCorp launched a competing product and is capturing your market share!',
        impact: 'HIGH Penalty: Store revenue halved AND reputation drains –2%/sec.',
        resolveBuilding: 'media',
        resolveActions: [{ label: 'Announce Counter-Campaign (–$2,500)', id: 'counter_campaign' }]
    },
    {
        id: 'supply_crisis',
        triggerAt: 100,
        icon: '🚚',
        title: 'SUPPLY CHAIN CRISIS',
        urgency: 'CRITICAL',
        desc: 'Warehouse logistics collapsed. Suppliers blocking all deliveries!',
        impact: 'CRITICAL Penalty: Warehouse + Factory at 5% revenue AND $200/sec cash drain.',
        resolveBuilding: 'warehouse',
        resolveActions: [{ label: 'Emergency Logistics Fix (–$4,000)', id: 'logistics_fix' }]
    },
    {
        id: 'rd_breach',
        triggerAt: 125,
        icon: '🔓',
        title: 'DATA BREACH AT R&D LAB',
        urgency: 'HIGH',
        desc: 'Hackers have infiltrated the R&D servers! Trade secrets at risk.',
        impact: 'HIGH Penalty: Reputation –4%/sec. Investors losing confidence rapidly.',
        resolveBuilding: 'rd',
        resolveActions: [{ label: 'Deploy Security Patch (–$3,500)', id: 'security_patch' }]
    },
    {
        id: 'market_opportunity',
        triggerAt: 150,
        icon: '🚀',
        title: 'MARKET SURGE OPPORTUNITY!',
        urgency: 'OPPORTUNITY',
        desc: 'Global demand spiked! Act NOW to capture 3× revenue for 20 seconds.',
        impact: 'OPPORTUNITY: Use Media Tower to broadcast and gain ×3 revenue (20s). Don\'t miss it!',
        resolveBuilding: 'media',
        resolveActions: [{ label: 'Broadcast Surge (–$1,000)', id: 'surge_broadcast' }]
    }
];

export class EventSystem {
    constructor(game) {
        this.game = game;
        this.container = document.getElementById('notifications');
        this.activeEventIds = new Set();

        // Alert panel elements
        this.alertPanel = document.getElementById('event-alert');
        this.alertIcon = document.getElementById('event-icon');
        this.alertTitle = document.getElementById('event-title');
        this.alertUrgency = document.getElementById('event-urgency');
        this.alertDesc = document.getElementById('event-desc');
        this.alertImpact = document.getElementById('event-impact');
        this.alertActions = document.getElementById('event-actions');
        document.getElementById('event-dismiss').onclick = () => { sfx.click(); this.dismissAlert(); };

        // Penalty state (driven by events)
        this.penalties = {
            factoryRevenue: false,
            storeRevenue: false,
            logistics: false,
            moraleDrain: false,
            repDrain: false,
            surgeActive: false,
            surgeExpiry: 0,
            // Per-tick cash drains for unresolved critical events
            factoryCashDrain: false,   // $400/sec
            supplyCashDrain: false,    // $200/sec
            // eventId -> severityMult
            _severity: {}
        };

        this.currentAlert = null;
        this.schedule = [...LEVEL_1_EVENTS];
        this.triggeredEvents = new Set();
        this.startTime = null;

        // Ignored-event penalty tracking (eventId → setTimeout handle)
        this._ignorePenaltyTimers = {};
    }

    start() {
        this.startTime = Date.now();
        this.triggeredEvents.clear();
        this.activeEventIds.clear();
        this.penalties = {
            factoryRevenue: false, storeRevenue: false, logistics: false,
            moraleDrain: false, repDrain: false,
            surgeActive: false, surgeExpiry: 0,
            factoryCashDrain: false, supplyCashDrain: false,
            _severity: {}
        };
    }

    /**
     * Called by socket.js when the server fires an event (online mode).
     */
    receiveServerEvent(event) {
        if (this.game.economy.state.currentLevel === 0) return;
        console.log('[Events] Received server event:', event.id, event.title);
        if (this.triggeredEvents.has(event.id)) return; // deduplicate
        this.triggeredEvents.add(event.id);
        const incomingType = event.urgency === 'CRITICAL'
            ? 'critical'
            : (event.urgency === 'OPPORTUNITY' ? 'opportunity' : 'warning');
        this.notify(`${event.icon} INCOMING: ${event.title}`, incomingType);
        this._applyPenalty(event);
        this._startIgnoreTimer(event);
        setTimeout(() => this.showAlert(event), 800);
    }

    _clampSev(n) {
        const v = Number(n);
        if (!Number.isFinite(v)) return 1;
        return Math.max(0.8, Math.min(1.2, v));
    }

    _sev(...eventIds) {
        let s = 1;
        for (const id of eventIds) {
            const v = this.penalties._severity?.[id];
            if (typeof v === 'number' && Number.isFinite(v)) s = Math.max(s, v);
        }
        return s;
    }

    _applyPenalty(eventOrId) {
        const eventId = typeof eventOrId === 'string' ? eventOrId : eventOrId?.id;
        if (!eventId) return;

        const sev = this._clampSev(typeof eventOrId === 'string' ? 1 : eventOrId?.severityMult);
        this.penalties._severity[eventId] = sev;

        switch (eventId) {
            case 'factory_accident':
                this.penalties.factoryRevenue = true;
                this.penalties.factoryCashDrain = true;
                break;
            case 'staff_strike':
                this.penalties.moraleDrain = true;
                break;
            case 'competitor_launch':
                this.penalties.storeRevenue = true;
                this.penalties.repDrain = true;
                break;
            case 'supply_crisis':
                this.penalties.logistics = true;
                this.penalties.supplyCashDrain = true;
                break;
            case 'rd_breach':
                this.penalties.repDrain = true;
                break;
        }
    }

    _removePenalty(eventId) {
        switch (eventId) {
            case 'factory_accident':
                this.penalties.factoryRevenue = false;
                this.penalties.factoryCashDrain = false;
                break;
            case 'staff_strike':
                this.penalties.moraleDrain = false;
                break;
            case 'competitor_launch':
                this.penalties.storeRevenue = false;
                this.penalties.repDrain = false;
                break;
            case 'supply_crisis':
                this.penalties.logistics = false;
                this.penalties.supplyCashDrain = false;
                break;
            case 'rd_breach':
                this.penalties.repDrain = false;
                break;
        }

        if (this.penalties._severity) delete this.penalties._severity[eventId];
        // Cancel ignore timer on resolve
        if (this._ignorePenaltyTimers[eventId]) {
            clearTimeout(this._ignorePenaltyTimers[eventId]);
            delete this._ignorePenaltyTimers[eventId];
        }
    }

    /** If an event is not resolved in 20s, add an extra morale/cash penalty */
    _startIgnoreTimer(event) {
        if (event.urgency === 'OPPORTUNITY') return;
        const sev = this._clampSev(event?.severityMult);
        this._ignorePenaltyTimers[event.id] = setTimeout(() => {
            if (this.activeEventIds.has(event.id)) {
                this.notify(`⚠️ ${event.title} IGNORED — suffering extra consequences!`, 'negative');
                const eco = this.game.economy.state;
                eco.morale = Math.max(0, eco.morale - (20 * sev));
                eco.cash -= (3000 * sev);
                this.game.economy.updateUI();
            }
        }, 20000);
    }

    notify(message, type = 'info', actions = null) {
        // Play appropriate sound based on notification type
        if (type === 'negative' || type === 'critical') {
            sfx.error();
        } else {
            sfx.notify();
        }

        const id = Date.now().toString();
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.id = `notif-${id}`;

        let content = `<div class="notif-text">${message}</div>`;
        if (actions && actions.length > 0) {
            content += `<div class="notif-actions">`;
            actions.forEach((act, idx) => {
                content += `<button class="notif-btn" id="notif-act-${id}-${idx}">${act.label}</button>`;
            });
            content += `</div>`;
        }

        notification.innerHTML = content;
        document.getElementById('notifications').appendChild(notification);

        if (actions) {
            actions.forEach((act, idx) => {
                const btn = document.getElementById(`notif-act-${id}-${idx}`);
                if (btn) btn.onclick = () => {
                    act.action();
                    notification.remove();
                };
            });
        }

        if (!actions) {
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 500);
            }, 5000);
        }
    }

    showAlert(event) {
        this.currentAlert = event;
        this.activeEventIds.add(event.id);
        this.alertIcon.innerText = event.icon;
        this.alertTitle.innerText = event.title;
        this.alertUrgency.innerText = event.urgency;
        this.alertUrgency.className = `urgency-${event.urgency.toLowerCase()}`;
        this.alertDesc.innerText = event.desc;
        const sevText = event.severityMult ? ` (Severity ×${this._clampSev(event.severityMult).toFixed(2)})` : '';
        this.alertImpact.innerText = `${event.impact}${sevText}`;

        // Speak the event description
        tts.speak(event.desc);

        this.alertActions.innerHTML = '';
        event.resolveActions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'primary-btn';
            btn.innerText = action.label;
            btn.onclick = () => {
                sfx.click();
                this.resolveEvent(event, action.id);
                this.dismissAlert();
            };
            this.alertActions.appendChild(btn);
        });

        this.alertPanel.classList.remove('hidden');
        this.alertPanel.classList.add('animate-in');
        this.highlightBuilding(event.resolveBuilding);
    }

    dismissAlert() {
        this.alertPanel.classList.add('hidden');
        this.alertPanel.classList.remove('animate-in');
        this.currentAlert = null;
        tts.stop();
    }

    resolveEvent(event, actionId) {
        if (!this.activeEventIds.has(event.id)) return;
        // Deduct cost via economy
        const eco = this.game.economy.state;
        const costs = {
            safety_protocol: 2000,
            resolve_strike: 3000,
            counter_campaign: 2500,
            logistics_fix: 4000,
            security_patch: 3500,
            surge_broadcast: 1000,
        };
        const cost = costs[actionId] || 0;
        if (cost > 0 && eco.cash < cost) {
            sfx.error();
            this.notify(`❌ Not enough cash to resolve! Need $${cost.toLocaleString()}`, 'negative');
            return;
        }
        eco.cash -= cost;

        // Apply positive effects
        if (actionId === 'resolve_strike') {
            eco.morale = Math.min(100, eco.morale + 25);
        } else if (actionId === 'security_patch') {
            eco.reputation = Math.min(100, eco.reputation + 15);
        } else if (actionId === 'counter_campaign') {
            eco.reputation = Math.min(100, eco.reputation + 20);
        } else if (actionId === 'surge_broadcast') {
            this.penalties.surgeActive = true;
            this.penalties.surgeExpiry = Date.now() + 20000;
            this.notify('📡 MARKET SURGE BROADCAST LIVE! Revenue ×3 for 20 seconds!', 'opportunity');
        }

        this._removePenalty(event.id);
        this.activeEventIds.delete(event.id);
        this.notify(`✅ ${event.title} RESOLVED!`, 'positive');

        if (this.game.socket) {
            this.game.socket.sendEventResolved(event.id, actionId, cost);
        }
        this.game.economy.updateUI();
    }

    highlightBuilding(type) {
        const building = this.game.world?.buildings?.find(b => b.userData.type === type);
        if (!building) return;
        const origY = building.position.y;
        let flashes = 0;
        const flash = setInterval(() => {
            building.position.y = flashes % 2 === 0 ? origY + 0.5 : origY;
            flashes++;
            if (flashes > 8) clearInterval(flash);
        }, 200);
    }

    update() {
        if (!this.game.economy.state.running) return;
        const eco = this.game.economy;
        const p = this.penalties;

        // --- Client-side event trigger (offline fallback when no socket) ---
        if (!this.game.socket && this.startTime && this.game.economy.state.currentLevel !== 0) {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.schedule.forEach(event => {
                if (elapsed >= event.triggerAt && !this.triggeredEvents.has(event.id)) {
                    this.triggeredEvents.add(event.id);
                    const incomingType = event.urgency === 'CRITICAL'
                        ? 'critical'
                        : (event.urgency === 'OPPORTUNITY' ? 'opportunity' : 'warning');
                    this.notify(`${event.icon} INCOMING: ${event.title}`, incomingType);
                    const eventWithParams = { ...event, severityMult: 1 };
                    this._applyPenalty(eventWithParams);
                    this._startIgnoreTimer(eventWithParams);
                    setTimeout(() => this.showAlert(event), 800);
                }
            });
        }

        // --- Per-tick penalty drains ---
        if (p.moraleDrain) {
            const sev = this._sev('staff_strike');
            eco.state.morale = Math.max(0, eco.state.morale - (0.067 * sev)); // ~4%/sec
        }
        if (p.repDrain) {
            const sev = this._sev('competitor_launch', 'rd_breach');
            eco.state.reputation = Math.max(0, eco.state.reputation - (0.067 * sev)); // ~4%/sec
        }
        if (p.factoryCashDrain) {
            const sev = this._sev('factory_accident');
            eco.state.cash -= (6.7 * sev); // ~$400/sec
        }
        if (p.supplyCashDrain) {
            const sev = this._sev('supply_crisis');
            eco.state.cash -= (3.3 * sev); // ~$200/sec
        }
    }

    getRevenueMultiplier(buildingType) {
        const p = this.penalties;
        let mult = 1.0;

        const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

        if (p.factoryRevenue && buildingType === 'factory') {
            const sev = this._sev('factory_accident');
            mult *= clamp(0.1 / sev, 0.02, 0.25);
        }
        if (p.storeRevenue && buildingType === 'storefront') {
            const sev = this._sev('competitor_launch');
            mult *= clamp(0.5 / sev, 0.2, 0.8);
        }
        if (p.logistics && (buildingType === 'warehouse' || buildingType === 'factory')) {
            const sev = this._sev('supply_crisis');
            mult *= clamp(0.05 / sev, 0.01, 0.2);
        }
        if (p.surgeActive && Date.now() < p.surgeExpiry) {
            const sev = this._sev('market_opportunity');
            mult *= clamp(3 * sev, 2.5, 3.6);
        }
        if (p.surgeActive && Date.now() >= p.surgeExpiry) {
            p.surgeActive = false;
            this.notify('⏱ Market surge has ended.', 'info');
        }

        return mult;
    }
}
