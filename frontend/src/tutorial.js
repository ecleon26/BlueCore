import gsap from 'gsap';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { getProgress, saveProgress } from './api.js';
import { tts } from './tts.js';

export class Tutorial {
    constructor(game) {
        this.game = game;
        this.steps = [
            {
                id: 'welcome',
                text: "Welcome, CEO. I am your Strategic AI Assistant. My mission is to help you build a global business empire. Let's begin by reviewing your Command Center HUD at the top.",
                action: () => {
                    this.game.world.createCEO();
                    this.game.world.moveCEOTo(0, 5); // Start at center
                    this.highlightHUD('metrics');
                    this.attachPopupToCEO();
                    this.recenterCamera(0, 0, 5, 2.5); // Focus zoom on CEO
                }
            },
            {
                id: 'concepts',
                text: "Your Cash represents immediate liquid funds. Revenue is your projected passive growth, and Morale reflects the overall happiness and productivity of your workforce.",
                action: () => this.highlightHUD('metrics')
            },
            {
                id: 'hq',
                text: "This is your Headquarters—the nerve center of your operations. Selecting it allows you to optimize workflows and boost overall efficiency.",
                action: () => {
                    this.game.world.spawnTutorialHQ();
                    this.highlightBuilding('hq');
                }
            },
            {
                id: 'bank',
                text: "Capital reserves are currently low. I've authorized access to a local CyberBank. Secure an emergency loan to provide the initial liquidity needed for expansion.",
                action: () => {
                    this.game.world.addBuilding('bank', -15, 15);
                    this.highlightBuilding('bank');
                },
                requiredAction: 'take_loan'
            },
            {
                id: 'factory',
                text: "Production Plants are the backbone of your supply chain. Expanding production here will significantly increase your long-term revenue streams.",
                action: () => {
                    this.game.world.addBuilding('factory', 15, -15);
                    this.highlightBuilding('factory');
                }
            },
            {
                id: 'storefront',
                text: "Metro Storefronts serve as your primary consumer interface, converting production into steady passive income for the empire.",
                action: () => {
                    this.game.world.addBuilding('storefront', 0, 15);
                    this.highlightBuilding('storefront');
                }
            },
            {
                id: 'rd_media',
                text: "R&D Labs are essential for technological breakthroughs, while Media Towers manage public relations and broadcast campaigns to maintain high morale.",
                action: () => {
                    this.game.world.addBuilding('rd', 15, 15);
                    this.game.world.addBuilding('media', -15, -15);
                    // Move CEO to center to show everything
                    this.game.world.moveCEOTo(0, 0);
                    this.recenterCamera(0, 0, 0, 1.2); // Wider view for buildings
                }
            },
            {
                id: 'finish',
                text: "Outstanding work, CEO. The foundation is set. It is time to proceed to the Campaign Map and begin your global takeover.",
                action: () => {
                    // Mark tutorial as completed (per-user) so it never replays on next login.
                    const p = getProgress();
                    p.tutorial_done = true;
                    saveProgress(p);

                    setTimeout(() => {
                        this.game.world.removeCEO();
                        this.game.renderDashboard();
                        this.game.showScreen('dashboard');
                        this.game.hideHUD();
                        this.recenterCamera(0, 0, 0, 0.5);
                    }, 2000);
                }
            }
        ];
        this.currentStepIndex = 0;
        this.isActive = false;

        this.popupEl = document.getElementById('tutorial-popup');
        this.textElement = document.getElementById('tutorial-text');
        this.nextBtn = document.getElementById('tutorial-next');

        // Create CSS2D Object
        this.label = new CSS2DObject(this.popupEl);

        this.nextBtn.onclick = () => this.nextStep();
    }

    attachPopupToCEO() {
        if (this.game.world.ceoHead) {
            this.game.world.ceoHead.add(this.label);
        }
    }

    start() {
        this.isActive = true;
        this.currentStepIndex = 0;
        this.game.economy.start(0);
        this.popupEl.classList.remove('hidden');
        this.showStep();

        // One more enforcement in case of state race
        setTimeout(() => this.game.economy.start(0), 100);
    }

    showStep() {
        const step = this.steps[this.currentStepIndex];
        this.textElement.innerText = step.text;

        // Speak the step text
        tts.speak(step.text);

        if (step.action) step.action();

        if (step.requiredAction) {
            this.nextBtn.classList.add('hidden');
        } else {
            this.nextBtn.classList.remove('hidden');
        }
    }

    nextStep() {
        this.currentStepIndex++;
        if (this.currentStepIndex < this.steps.length) {
            this.showStep();
        } else {
            this.isActive = false;
            this.popupEl.classList.add('hidden');
            tts.stop();
        }
    }

    onGameAction(actionId) {
        const step = this.steps[this.currentStepIndex];
        if (step && step.requiredAction === actionId) {
            this.nextStep();
        }
    }

    highlightHUD(elementId) {
        const el = document.querySelector('.' + elementId);
        if (el) {
            el.classList.add('highlight-target');
            setTimeout(() => el.classList.remove('highlight-target'), 3000);
        }
    }

    highlightBuilding(type) {
        const building = this.game.world.buildings.find(b => b.userData.type === type);
        if (building) {
            this.game.world.moveCEOTo(building.position.x, building.position.z);
            this.recenterCamera(building.position.x, 0, building.position.z, 1.8); // Focus zoom on building/CEO
        }
    }

    recenterCamera(x, y, z, zoom = 1) {
        // Smoothly move camera target and position
        gsap.to(this.game.controls.target, {
            x: x,
            y: y,
            z: z,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => this.game.controls.update()
        });

        // Keep camera far from scene to prevent near-plane clipping
        // Ortho cameras don't change scale with distance, so large offset is safe
        const offset = { x: 150, y: 150, z: 150 };
        gsap.to(this.game.camera.position, {
            x: x + offset.x,
            y: y + offset.y,
            z: z + offset.z,
            duration: 1.5,
            ease: "power2.inOut"
        });

        // Zoom in/out
        gsap.to(this.game.camera, {
            zoom: zoom,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => this.game.camera.updateProjectionMatrix()
        });
    }
}

