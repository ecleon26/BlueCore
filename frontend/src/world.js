import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import gsap from 'gsap';

export class World {
    constructor(game) {
        this.game = game;
        this.buildings = [];
        this.loader = new GLTFLoader();
        this.buildingTypes = {
            'hq': {
                name: 'Headquarters',
                color: 0x00f2ff,
                size: [2.5, 3.5, 2.5],
                modelPath: './assets/officeBuilding.glb',
                scale: 7,
                yOffset: 0.2,
                description: 'The strategic nerve center. Optimize operations to boost morale.',
                actions: [
                    { id: 'optimize', label: '⚙️ Optimize Operations (+8% Morale)' },
                    { id: 'sell_equity', label: '📊 Sell 10% Equity (+$10k)' }
                ]
            },
            'factory': {
                name: 'Production Plant',
                color: 0xff8c00,
                size: [5, 2.5, 4],
                modelPath: './assets/warehouse.glb',
                scale: 7,
                yOffset: 0.2,
                description: 'High-output manufacturing. $300/tick. Vulnerable to accidents and logistics failures.',
                actions: [
                    { id: 'expand_prod', label: '🏭 Expand Production (–$5k)' },
                    { id: 'safety_protocol', label: '🔥 Safety Protocol (–$2k) [resolves accident]' }
                ]
            },
            'bank': {
                name: 'NovaTech Bank',
                color: 0x6c2bd9,
                size: [2.5, 6, 2.5],
                modelPath: './assets/bank.glb',
                scale: 7,
                yOffset: 0.2,
                description: 'Secure your capital. Take loans or sell equity for immediate cash injections.',
                actions: [
                    { id: 'take_loan', label: '💰 Take $5k Emergency Loan' },
                    { id: 'sell_equity', label: '📊 Sell 10% Equity (+$10k)' }
                ]
            },
            'hr': {
                name: 'Office Building (HR)',
                color: 0x2ed573,
                size: [2, 2.5, 2],
                modelPath: './assets/office.glb',
                scale: 7,
                yOffset: 0.2,
                description: 'Human Resources hub. Keep morale high to maximize all building output.',
                actions: [
                    { id: 'bonus', label: '🎁 Staff Bonus (–$2k, +20% Morale)' },
                    { id: 'hire_staff', label: '👥 Hire Staff (–$3k, +10% Morale)' },
                    { id: 'resolve_strike', label: '✋ Resolve Strike (–$3k) [resolves strike]' }
                ]
            },
            'rd': {
                name: 'R&D Lab',
                color: 0xff4757,
                size: [3, 2.5, 4],
                modelPath: './assets/rdLab.glb',
                scale: 7,
                yOffset: 0.2,
                description: 'Innovation engine. Passive income $50/tick. Target of data breaches.',
                actions: [
                    { id: 'research', label: '🔬 Start Research Project (–$3k)' },
                    { id: 'security_patch', label: '🔒 Security Patch (–$3.5k) [resolves breach]' }
                ]
            },
            'warehouse': {
                name: 'Logistics Warehouse',
                color: 0x8395a7,
                size: [6, 2, 5],
                modelPath: './assets/warehouse.glb',
                scale: 7,
                yOffset: 0.2,
                description: 'Supply chain backbone. $80/tick. Vulnerable to logistics crises.',
                actions: [
                    { id: 'storage_upgrade', label: '🚚 Upgrade Capacity (–$4k)' },
                    { id: 'logistics_fix', label: '🛠️ Emergency Logistics Fix (–$4k) [resolves crisis]' }
                ]
            },
            'media': {
                name: 'Media Tower',
                color: 0xffd700,
                size: [2, 8, 2],
                modelPath: './assets/tower.glb',
                scale: 7,
                yOffset: 0.2,
                description: 'Public relations powerhouse. Counter competitor attacks. Broadcast viral campaigns.',
                actions: [
                    { id: 'marketing_campaign', label: '📢 Marketing Campaign (–$2k, +15 Reputation)' },
                    { id: 'counter_campaign', label: '⚔️ Counter-Campaign (–$2.5k) [resolves competitor]' },
                    { id: 'surge_broadcast', label: '🚀 Surge Broadcast (–$1k) [captures market surge]' },
                    { id: 'pr_statement', label: '📰 Issue PR Statement (+10 Reputation)' }
                ]
            },
            'storefront': {
                name: 'Metro Storefront',
                color: 0xe17055,
                size: [3, 1.5, 2.5],
                modelPath: './assets/store.glb',
                scale: 7,
                yOffset: 0.2,
                description: 'Consumer-facing sales outlet. $150/tick. Vulnerable to competitor attacks.',
                actions: [
                    { id: 'marketing_campaign', label: '📢 Local Promotion (–$2k, +15 Reputation)' }
                ]
            }
        };

        this.init();
    }

    _createBuildingNameCloud(text) {
        const el = document.createElement('div');
        el.className = 'building-name-cloud';
        el.textContent = text || '';
        return el;
    }

    _attachBuildingNameCloud(buildingGroup, config) {
        if (!buildingGroup || !config) return;
        const name = buildingGroup?.userData?.name || config?.name || '';
        const el = this._createBuildingNameCloud(name);
        const label = new CSS2DObject(el);

        // Position above the building using the same size heuristic used elsewhere
        const height = (config.size?.[1] || 3) * (config.scale || 1) * 0.1;
        label.position.set(0, height + 3, 0);
        buildingGroup.add(label);

        buildingGroup.userData.nameLabelEl = el;
        buildingGroup.userData.nameLabelObj = label;
    }

    _updateBuildingNameCloud(buildingGroup) {
        const el = buildingGroup?.userData?.nameLabelEl;
        if (!el) return;
        el.textContent = buildingGroup?.userData?.name || '';
    }

    init() {
        this.createSky();
        this.createGround();
        this.createRoads();
        this.createEnvironment();
        // spawnInitialBuildings will be called by main.js
    }

    spawnTutorialHQ() {
        this.addBuilding('hq', 0, 0);
    }

    spawnInitialBuildings(level = 1) {
        this.buildings = []; // Clear any tutorial buildings
        this.game.scene.children
            .filter(c => c.userData && c.userData.type)
            .forEach(c => this.game.scene.remove(c));

        /*
         * Level-specific model path overrides.
         * Key = original modelPath from buildingTypes.
         * Value = replacement path for that level.
         * Level 1 uses the default paths (no override needed).
         */
        const levelOverrides = {
            2: {
                './assets/officeBuilding.glb': './assets/level2/hq.glb',
                './assets/warehouse.glb': './assets/level2/warehouse.glb',
                './assets/bank.glb': './assets/level2/bank.glb',
                './assets/office.glb': './assets/level2/office.glb',
                './assets/rdLab.glb': './assets/level2/warehouse.glb', // best available
                './assets/tower.glb': './assets/level2/townhall.glb',
                './assets/store.glb': './assets/level2/store.glb',
            },
            3: {
                './assets/officeBuilding.glb': './assets/level3/hq.glb',
                './assets/warehouse.glb': './assets/level3/warehouse.glb',
                './assets/bank.glb': './assets/level3/bank.glb',
                './assets/office.glb': './assets/level3/rdLab.glb',
                './assets/rdLab.glb': './assets/level3/rdLab.glb',
                './assets/tower.glb': './assets/level3/tower.glb',
                './assets/store.glb': './assets/level3/restaurant.glb',
            }
        };
        this._levelOverrides = levelOverrides[level] || {};

        // Place all 8 buildings in a structured city-block layout near intersections
        this.addBuilding('hq', -9, -9);
        this.addBuilding('media', -9, 9);
        this.addBuilding('hr', -23, 9);
        this.addBuilding('factory', -23, -9);

        this.addBuilding('storefront', 9, 9);
        this.addBuilding('warehouse', 23, 9);

        this.addBuilding('bank', 9, -9);
        this.addBuilding('rd', 23, -9);

        // Populate the outer areas with more buildings
        const outerTypes = ['bank', 'rd', 'factory', 'warehouse', 'storefront'];
        const outerPositions = [
            [-40, -40], [-40, 0], [-40, 40], [-40, 65],
            [40, -40], [40, 0], [40, 40], [40, 65],
            [65, -40], [65, 0], [65, 40], [65, 65],
            [-65, -40], [-65, 0], [-65, 40], [-65, 65],
            [0, -40], [0, 40], [0, 65]
        ];

        outerPositions.forEach(pos => {
            // Optional random skipping so it isn't perfectly uniform
            if (Math.random() > 0.2) {
                const type = outerTypes[Math.floor(Math.random() * outerTypes.length)];
                // Jiggle them slightly off the perfect intersection centers
                const xOff = (Math.random() > 0.5 ? 9 : -9);
                const zOff = (Math.random() > 0.5 ? 9 : -9);
                this.addBuilding(type, pos[0] + xOff, pos[1] + zOff);
            }
        });

        // Clear overrides after spawning so multiplayer is never affected
        this._levelOverrides = {};
    }

    spawnMultiplayerBuildings(playerCount, myIndex) {
        this.buildings = [];
        this.game.scene.children
            .filter(c => c.userData && c.userData.type)
            .forEach(c => this.game.scene.remove(c));

        // Strictly cap at 4 quadrants
        const count = Math.min(playerCount, 4);

        // Shared central buildings — only when more than one player
        if (count > 1) {
            this.addBuilding('bank', 0, -2);
            this.addBuilding('media', 0, 3);
        }

        const spacing = 30;
        const quadrants = [
            [-1, -1], [1, -1], [-1, 1], [1, 1]
        ];

        // Territory centers (used later for landmark avoidance)
        const territoryCenters = [];

        for (let i = 0; i < count; i++) {
            const [mx, mz] = quadrants[i];
            const baseX = mx * spacing;
            const baseZ = mz * spacing;
            const isMe = i === myIndex;
            territoryCenters.push([baseX, baseZ]);

            const hq = this.addBuilding('hq', baseX, baseZ);
            hq.userData.ownerIndex = i;
            if (!isMe) {
                hq.userData.name = `CEO ${i + 1}'s HQ`;
                this._updateBuildingNameCloud(hq);
            }

            const factory = this.addBuilding('factory', baseX + (5 * mx), baseZ + (5 * mz));
            factory.userData.ownerIndex = i;

            const w1 = this.addBuilding('warehouse', baseX - (5 * mx), baseZ + (5 * mz));
            w1.userData.ownerIndex = i;

            const w2 = this.addBuilding('warehouse', baseX + (5 * mx), baseZ - (5 * mz));
            w2.userData.ownerIndex = i;

            const rd = this.addBuilding('rd', baseX - (10 * mx), baseZ - (10 * mz));
            rd.userData.ownerIndex = i;

            if (isMe) {
                this.game.controls.target.set(baseX, 0, baseZ);
                this.game.camera.position.set(baseX + 100, 100, baseZ + 100);
            }
        }

        // Scatter premium landmark fillers in the green fields
        this._scatterMultiplayerLandmarks(territoryCenters);
    }

    _scatterMultiplayerLandmarks(territoryCenters = []) {
        /*
         * Premium landmark assets pulled from all three asset tiers.
         * Each entry: [path, scale]
         */
        const landmarks = [
            // Main assets folder
            ['./assets/burjKhalifa.glb', 2.5],
            ['./assets/lake1.glb', 4.0],
            ['./assets/lake2.glb', 4.0],
            ['./assets/townhall.glb', 3.5],
            ['./assets/house.glb', 3.0],
            // Level 2 premium
            ['./assets/level2/clockTower.glb', 5.0],
            ['./assets/level2/eiffelTower.glb', 3.0],
            ['./assets/level2/house2.glb', 3.5],
            ['./assets/level2/townhall.glb', 4.0],
            ['./assets/level2/lake1.glb', 4.0],
            ['./assets/level2/restaurant.glb', 3.5],
            // Level 3 premium
            ['./assets/level3/college.glb', 4.0],
            ['./assets/level3/tower.glb', 4.0],
            ['./assets/level3/tower2.glb', 4.0],
            ['./assets/level3/tower3.glb', 4.0],
            ['./assets/level3/townhall.glb', 4.5],
        ];

        /* Road grid — must match createRoads() */
        const NS_ROAD_X = [0, 15, -15, 40, -40, 65, -65];
        const EW_ROAD_Z = [0, 15, -15, 40, -40, 65, -65];
        const ROAD_CLEAR = 7;   // half-road + sidewalk buffer
        const TERR_CLEAR = 18;  // exclusion radius around each territory

        const isOnRoad = (x, z) => {
            for (const rx of NS_ROAD_X) if (Math.abs(x - rx) < ROAD_CLEAR) return true;
            for (const rz of EW_ROAD_Z) if (Math.abs(z - rz) < ROAD_CLEAR) return true;
            return false;
        };

        const isNearTerritory = (x, z) => {
            for (const [tx, tz] of territoryCenters) {
                const dx = x - tx, dz = z - tz;
                if (Math.sqrt(dx * dx + dz * dz) < TERR_CLEAR) return true;
            }
            return false;
        };

        const placed = [];
        const MIN_LANDMARK_DIST = 14;  // prevent landmark-on-landmark stacking
        const TARGET_COUNT = 30;
        const MAP_EXTENT = 100;        // scatter area ±100 units
        let attempts = 0;

        while (placed.length < TARGET_COUNT && attempts < TARGET_COUNT * 20) {
            attempts++;
            const x = (Math.random() - 0.5) * MAP_EXTENT * 2;
            const z = (Math.random() - 0.5) * MAP_EXTENT * 2;

            if (isOnRoad(x, z)) continue;
            if (isNearTerritory(x, z)) continue;

            // Space landmarks apart
            let tooClose = false;
            for (const [px, pz] of placed) {
                const dx = x - px, dz = z - pz;
                if (Math.sqrt(dx * dx + dz * dz) < MIN_LANDMARK_DIST) { tooClose = true; break; }
            }
            if (tooClose) continue;

            const [path, scale] = landmarks[Math.floor(Math.random() * landmarks.length)];
            const rotY = Math.random() * Math.PI * 2;

            const group = new THREE.Group();
            group.position.set(x, 0, z);
            this.game.scene.add(group);
            this._loadModel(group, path, scale, 0.2);

            placed.push([x, z]);
        }
    }

    createSky() {
        // Background matches ground green so rays below y=0 never show a blue void.
        this.game.scene.background = new THREE.Color(0x82c87a);
        // Outer-edge fog only — inner map stays crisp.
        this.game.scene.fog = new THREE.Fog(0xd0e8f5, 180, 320);

        // Sky dome for gradient feel
        const skyGeo = new THREE.SphereGeometry(800, 32, 16);
        const skyMat = new THREE.ShaderMaterial({
            side: THREE.BackSide,
            uniforms: {
                topColor: { value: new THREE.Color(0x1a6ab5) },
                // bottom matches ground green so the lower sky dome never creates a blue bar
                bottomColor: { value: new THREE.Color(0x82c87a) },
                horizon: { value: 0.4 },
                exponent: { value: 0.6 }
            },
            vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPos = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPos.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                uniform float horizon;
                uniform float exponent;
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize(vWorldPosition).y;
                    gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h - horizon, 0.0), exponent), 0.0)), 1.0);
                }
            `
        });
        const sky = new THREE.Mesh(skyGeo, skyMat);
        this.game.scene.add(sky);

        // Sun disc — positioned high and to the southwest
        const sunGeo = new THREE.CircleGeometry(12, 32);
        const sunMat = new THREE.MeshBasicMaterial({ color: 0xfffde0, transparent: true, opacity: 0.92, depthWrite: false });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        sun.position.set(-200, 350, -400);
        sun.lookAt(0, 0, 0);
        this.game.scene.add(sun);

        // Sun glow halo
        const haloGeo = new THREE.CircleGeometry(22, 32);
        const haloMat = new THREE.MeshBasicMaterial({ color: 0xfff5b0, transparent: true, opacity: 0.3, depthWrite: false });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.copy(sun.position);
        halo.lookAt(0, 0, 0);
        this.game.scene.add(halo);
    }

    createGround() {
        // === BASE GRASS TERRAIN (LOW POLY — 8×8 segments is plenty) ===
        const baseGeo = new THREE.PlaneGeometry(2000, 2000, 8, 8);
        const baseMat = new THREE.MeshLambertMaterial({ color: 0x82c87a });
        const plane = new THREE.Mesh(baseGeo, baseMat);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.05;
        plane.receiveShadow = true;
        this.game.scene.add(plane);

        // === GRASS PATCHES — 5 shared materials, single CircleGeo per size bracket ===
        const patchMats = [
            new THREE.MeshLambertMaterial({ color: 0x76bf6f }),
            new THREE.MeshLambertMaterial({ color: 0x5aaa52 }),
            new THREE.MeshLambertMaterial({ color: 0x8fd988 }),
            new THREE.MeshLambertMaterial({ color: 0x6dc465 }),
            new THREE.MeshLambertMaterial({ color: 0x9de394 }),
        ];
        // 3 reusable patch geos (small/med/large)
        const patchGeos = [
            new THREE.CircleGeometry(3.5, 6),
            new THREE.CircleGeometry(6, 6),
            new THREE.CircleGeometry(10, 6)
        ];
        for (let i = 0; i < 90; i++) {
            const px = (Math.random() - 0.5) * 260;
            const pz = (Math.random() - 0.5) * 260;
            if (Math.abs(px % 15) < 5 || Math.abs(pz % 15) < 5) continue;
            const patch = new THREE.Mesh(
                patchGeos[i % 3],
                patchMats[i % 5]
            );
            patch.rotation.x = -Math.PI / 2;
            patch.position.set(px, -0.03, pz);
            this.game.scene.add(patch);
        }

        // === GRASS TUFTS — single InstancedMesh, 1200 tufts = still just 1 draw call ===
        const TUFT_MAX = 1200 * 2;
        const bladeGeo = new THREE.PlaneGeometry(0.35, 0.6);
        const grassMat = new THREE.MeshBasicMaterial({ color: 0x4ca844, side: THREE.DoubleSide });
        const grassInstanced = new THREE.InstancedMesh(bladeGeo, grassMat, TUFT_MAX);
        grassInstanced.frustumCulled = true;
        const _m = new THREE.Matrix4();
        const _q = new THREE.Quaternion();
        const _pos = new THREE.Vector3();
        const _scale = new THREE.Vector3(1, 1, 1);
        let gi = 0;
        for (let i = 0; i < 1200 && gi < TUFT_MAX - 1; i++) {
            const gx = (Math.random() - 0.5) * 240;
            const gz = (Math.random() - 0.5) * 240;
            if (Math.abs(gx % 15) < 6.5 || Math.abs(gz % 15) < 6.5) continue;
            for (let b = 0; b < 2; b++) {
                _pos.set(gx + (Math.random() - 0.5) * 0.3, 0.3, gz + (Math.random() - 0.5) * 0.3);
                _q.setFromEuler(new THREE.Euler(0, (b * Math.PI / 2) + Math.random() * 0.5, (Math.random() - 0.5) * 0.3));
                _m.compose(_pos, _q, _scale);
                grassInstanced.setMatrixAt(gi++, _m);
            }
        }
        // CRITICAL: clamp count so unused slots (at origin) don't render
        grassInstanced.count = gi;
        grassInstanced.instanceMatrix.needsUpdate = true;
        this.game.scene.add(grassInstanced);

        // === FLOWERS — 500 instanced, still only 2 draw calls total ===
        const FLOWER_MAX = 500;
        const stemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.5, 4);
        const stemMatI = new THREE.MeshLambertMaterial({ color: 0x2d8a2d });
        const petalGeo = new THREE.SphereGeometry(0.14, 5, 4);
        // vertexColors must be true for setColorAt to work on MeshLambertMaterial
        const petalMat = new THREE.MeshLambertMaterial({ vertexColors: true });

        const stemInst = new THREE.InstancedMesh(stemGeo, stemMatI, FLOWER_MAX);
        const petalInst = new THREE.InstancedMesh(petalGeo, petalMat, FLOWER_MAX);
        stemInst.frustumCulled = true;
        petalInst.frustumCulled = true;

        const flowerColors32 = [0xff6b9d, 0xffd93d, 0xffa500, 0xff4757, 0xee5a24, 0xc56cf0, 0xffeaa7];
        let fi = 0;
        for (let i = 0; i < FLOWER_MAX * 3 && fi < FLOWER_MAX; i++) {
            const fx = (Math.random() - 0.5) * 220;
            const fz = (Math.random() - 0.5) * 220;
            if (Math.abs(fx % 15) < 6 || Math.abs(fz % 15) < 6) continue;
            const rot = Math.random() * Math.PI * 2;
            _q.setFromEuler(new THREE.Euler(0, rot, 0));
            _pos.set(fx, 0.25, fz);
            _m.compose(_pos, _q, _scale);
            stemInst.setMatrixAt(fi, _m);
            _pos.set(fx, 0.58, fz);
            _m.compose(_pos, _q, _scale);
            petalInst.setMatrixAt(fi, _m);
            petalInst.setColorAt(fi, new THREE.Color(flowerColors32[fi % flowerColors32.length]));
            fi++;
        }
        // CRITICAL: clamp count to actual placed so no phantom flowers at origin
        stemInst.count = fi;
        petalInst.count = fi;
        stemInst.instanceMatrix.needsUpdate = true;
        petalInst.instanceMatrix.needsUpdate = true;
        if (petalInst.instanceColor) petalInst.instanceColor.needsUpdate = true;
        this.game.scene.add(stemInst);
        this.game.scene.add(petalInst);
    }

    createRoads() {
        const roadGroup = new THREE.Group();
        const ROAD_WIDTH = 4.5;
        const SIDEWALK_WIDTH = 1.2;
        const ROAD_LENGTH = 320;

        // Shared road materials — created ONCE, reused for all segments
        const sharedSidewalkMat = new THREE.MeshLambertMaterial({ color: 0xc9b99a });
        const sharedRoadMat = new THREE.MeshLambertMaterial({ color: 0x4a5259 });
        const sharedYelMat = new THREE.MeshBasicMaterial({ color: 0xf7ca18 });
        const sharedWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

        // Shared road geometries for all N-S and E-W roads of same length
        const swGeoNS = new THREE.PlaneGeometry(ROAD_WIDTH + SIDEWALK_WIDTH * 2, ROAD_LENGTH);
        const rdGeoNS = new THREE.PlaneGeometry(ROAD_WIDTH, ROAD_LENGTH);
        const yelGeoNS = new THREE.PlaneGeometry(ROAD_WIDTH * 0.035, ROAD_LENGTH);

        // Instanced dashes: 2 lanes × dashCount dashes for a single road
        const DASH_SPACING = 4;
        const dashCount = Math.floor(ROAD_LENGTH / DASH_SPACING);
        const dashGeo = new THREE.PlaneGeometry(ROAD_WIDTH * 0.05, 1.0);
        // We'll create one InstancedMesh for all dashes across ALL roads
        const NS_ROADS = 7, EW_ROADS = 7;
        const totalDashes = (NS_ROADS + EW_ROADS) * dashCount * 2;
        const dashInst = new THREE.InstancedMesh(dashGeo, sharedWhiteMat, totalDashes);
        dashInst.frustumCulled = false;
        const _dm = new THREE.Matrix4();
        const _dq = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
        const _ds = new THREE.Vector3(1, 1, 1);
        const _dqEW = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, Math.PI / 2, 0));
        let dashIdx = 0;

        const createRoadSegment = (x, z, width, length, rotY = 0) => {
            const group = new THREE.Group();
            const isEW = Math.abs(rotY) > 0.1;

            // Sidewalk
            const sw = new THREE.Mesh(swGeoNS, sharedSidewalkMat);
            sw.rotation.x = -Math.PI / 2;
            sw.position.y = 0.005;
            group.add(sw);

            // Road
            const rd = new THREE.Mesh(rdGeoNS, sharedRoadMat);
            rd.rotation.x = -Math.PI / 2;
            rd.position.y = 0.01;
            group.add(rd);

            // Yellow center line
            const yl = new THREE.Mesh(yelGeoNS, sharedYelMat);
            yl.rotation.x = -Math.PI / 2;
            yl.position.y = 0.02;
            group.add(yl);

            // Register dashes in instanced buffer
            const qRot = isEW ? _dqEW : _dq;
            const laneOffset = width * 0.25;
            for (let i = 0; i < dashCount; i++) {
                const zOff = -length / 2 + i * DASH_SPACING + 2;
                if (dashIdx + 1 < totalDashes) {
                    // Lane 1
                    _dm.compose(
                        new THREE.Vector3(isEW ? z + zOff : x + laneOffset, 0.022, isEW ? x : z + zOff),
                        qRot, _ds
                    );
                    dashInst.setMatrixAt(dashIdx++, _dm);
                    // Lane 2
                    _dm.compose(
                        new THREE.Vector3(isEW ? z + zOff : x - laneOffset, 0.022, isEW ? x : z + zOff),
                        qRot, _ds
                    );
                    dashInst.setMatrixAt(dashIdx++, _dm);
                }
            }

            group.position.set(x, 0, z);
            group.rotation.y = rotY;
            roadGroup.add(group);
            return group;
        };

        // === MAIN GRID ===
        // N-S arteries
        createRoadSegment(0, 0, ROAD_WIDTH, ROAD_LENGTH, 0);
        createRoadSegment(15, 0, ROAD_WIDTH, ROAD_LENGTH, 0);
        createRoadSegment(-15, 0, ROAD_WIDTH, ROAD_LENGTH, 0);
        createRoadSegment(40, 0, ROAD_WIDTH, ROAD_LENGTH, 0);
        createRoadSegment(-40, 0, ROAD_WIDTH, ROAD_LENGTH, 0);
        createRoadSegment(65, 0, ROAD_WIDTH, ROAD_LENGTH, 0);
        createRoadSegment(-65, 0, ROAD_WIDTH, ROAD_LENGTH, 0);

        // E-W arteries
        createRoadSegment(0, 0, ROAD_WIDTH, ROAD_LENGTH, Math.PI / 2);
        createRoadSegment(0, 15, ROAD_WIDTH, ROAD_LENGTH, Math.PI / 2);
        createRoadSegment(0, -15, ROAD_WIDTH, ROAD_LENGTH, Math.PI / 2);
        createRoadSegment(0, 40, ROAD_WIDTH, ROAD_LENGTH, Math.PI / 2);
        createRoadSegment(0, -40, ROAD_WIDTH, ROAD_LENGTH, Math.PI / 2);
        createRoadSegment(0, 65, ROAD_WIDTH, ROAD_LENGTH, Math.PI / 2);
        createRoadSegment(0, -65, ROAD_WIDTH, ROAD_LENGTH, Math.PI / 2);

        // === DIAGONAL CONNECTOR ROADS (break the pure grid look) ===
        // Short diagonal cuts across city blocks
        const diagMat = new THREE.MeshPhongMaterial({ color: 0x4a5259, shininess: 5 });
        const addDiag = (x, z, len, angle) => {
            const g = new THREE.Group();
            const geo = new THREE.PlaneGeometry(3, len);
            const m = new THREE.Mesh(geo, diagMat);
            m.rotation.x = -Math.PI / 2;
            m.position.y = 0.009;
            g.add(m);
            g.position.set(x, 0, z);
            g.rotation.y = angle;
            roadGroup.add(g);
        };
        addDiag(-27, -27, 26, Math.PI / 4);
        addDiag(27, 27, 26, Math.PI / 4);
        addDiag(-27, 27, 26, -Math.PI / 4);
        addDiag(27, -27, 26, -Math.PI / 4);
        addDiag(-52, 52, 18, Math.PI / 4);
        addDiag(52, -52, 18, Math.PI / 4);
        addDiag(-52, -52, 18, -Math.PI / 4);
        addDiag(52, 52, 18, -Math.PI / 4);

        // === ROUNDABOUT — breaks central intersection ===
        const roundaboutMat = new THREE.MeshPhongMaterial({ color: 0x3d4349 });
        const rGeo = new THREE.RingGeometry(3.5, 7, 24);
        const roundabout = new THREE.Mesh(rGeo, roundaboutMat);
        roundabout.rotation.x = -Math.PI / 2;
        roundabout.position.set(0, 0.015, 0);
        roadGroup.add(roundabout);

        // Center garden in roundabout
        const centerGardenMat = new THREE.MeshPhongMaterial({ color: 0x5cb85c });
        const cGeo = new THREE.CircleGeometry(3.4, 24);
        const cGarden = new THREE.Mesh(cGeo, centerGardenMat);
        cGarden.rotation.x = -Math.PI / 2;
        cGarden.position.set(0, 0.02, 0);
        roadGroup.add(cGarden);

        // Small fountain in roundabout center
        const fountainBaseMat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
        const fBase = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 0.3, 16), fountainBaseMat);
        fBase.position.set(0, 0.22, 0);
        roadGroup.add(fBase);
        const fPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 1.2, 8), fountainBaseMat);
        fPillar.position.set(0, 0.82, 0);
        roadGroup.add(fPillar);
        const fTop = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 6), new THREE.MeshPhongMaterial({ color: 0x99ccff, transparent: true, opacity: 0.7 }));
        fTop.position.set(0, 1.5, 0);
        roadGroup.add(fTop);
        const fWater = new THREE.Mesh(new THREE.CircleGeometry(1.1, 16), new THREE.MeshPhongMaterial({ color: 0x6eb5ff, transparent: true, opacity: 0.6 }));
        fWater.rotation.x = -Math.PI / 2;
        fWater.position.set(0, 0.38, 0);
        roadGroup.add(fWater);

        // Commit dash instanced mesh after all roads are registered
        dashInst.instanceMatrix.needsUpdate = true;
        roadGroup.add(dashInst);

        // === STREET LIGHTS — more lights on ALL major arteries ===
        const poleGeo = new THREE.CylinderGeometry(0.08, 0.1, 4, 5);
        const lampGeo = new THREE.SphereGeometry(0.2, 6, 5);
        const poleMat = new THREE.MeshLambertMaterial({ color: 0x555566 });
        const lampMat = new THREE.MeshBasicMaterial({ color: 0xffee88 });

        // All N-S road X positions and all E-W road Z positions
        const nsRoads = [0, 15, -15, 40, -40, 65, -65];
        const ewRoads = [0, 15, -15, 40, -40, 65, -65];
        const LAMP_SPACING = 12;  // was 20 — denser lights
        const LAMP_RANGE = 140;   // extend further along each road
        const lampPositions = [];

        // Lights along every N-S artery (both sides)
        nsRoads.forEach(rx => {
            for (let s = -LAMP_RANGE; s <= LAMP_RANGE; s += LAMP_SPACING) {
                lampPositions.push([rx + 3.5, s, 0]);
                lampPositions.push([rx - 3.5, s, Math.PI]);
            }
        });
        // Lights along every E-W artery (both sides)
        ewRoads.forEach(rz => {
            for (let s = -LAMP_RANGE; s <= LAMP_RANGE; s += LAMP_SPACING) {
                lampPositions.push([s, rz + 3.5, Math.PI / 2]);
                lampPositions.push([s, rz - 3.5, -Math.PI / 2]);
            }
        });

        const LC = lampPositions.length;
        const poleInst = new THREE.InstancedMesh(poleGeo, poleMat, LC);
        const lampInst = new THREE.InstancedMesh(lampGeo, lampMat, LC);
        // Arm: horizontal cylinder (1.5 units long) connecting pole top to bulb
        const armGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 4);
        const armInst = new THREE.InstancedMesh(armGeo, poleMat, LC);
        poleInst.frustumCulled = true;
        lampInst.frustumCulled = true;
        armInst.frustumCulled = true;

        const _lq = new THREE.Quaternion();
        const _ls = new THREE.Vector3(1, 1, 1);
        const _lm = new THREE.Matrix4();
        // Arm orientation: tilt 90° around Z first, then apply rotY around Y
        const _qZ90 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
        const _qY = new THREE.Quaternion();
        const _armQ = new THREE.Quaternion();

        lampPositions.forEach(([lx, lz, rotY], idx) => {
            _lq.setFromEuler(new THREE.Euler(0, rotY, 0));

            // Pole (vertical, centered at y=2)
            _lm.compose(new THREE.Vector3(lx, 2, lz), _lq, _ls);
            poleInst.setMatrixAt(idx, _lm);

            // Lamp head: local +X arm → world (cos rotY, 0, -sin rotY)
            const headX = lx + Math.cos(rotY) * 1.5;
            const headZ = lz - Math.sin(rotY) * 1.5;
            _lm.compose(new THREE.Vector3(headX, 3.8, headZ), _lq, _ls);
            lampInst.setMatrixAt(idx, _lm);

            // Arm: horizontal cylinder from pole top (lx, 4, lz) to lamp head
            // Center at midpoint, oriented along the arm direction
            const midX = lx + Math.cos(rotY) * 0.75;
            const midZ = lz - Math.sin(rotY) * 0.75;
            _qY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
            _armQ.multiplyQuaternions(_qY, _qZ90);
            _lm.compose(new THREE.Vector3(midX, 3.8, midZ), _armQ, _ls);
            armInst.setMatrixAt(idx, _lm);
        });
        poleInst.instanceMatrix.needsUpdate = true;
        lampInst.instanceMatrix.needsUpdate = true;
        armInst.instanceMatrix.needsUpdate = true;
        roadGroup.add(poleInst);
        roadGroup.add(lampInst);
        roadGroup.add(armInst);

        // Single ambient fill light (no per-lamp PointLights)
        const ambientWarm = new THREE.HemisphereLight(0xfff5cc, 0x448844, 0.3);
        this.game.scene.add(ambientWarm);

        // === INTERSECTION PADS — smooth the crossings ===
        const intMat = new THREE.MeshPhongMaterial({ color: 0x424950 });
        const intersections = [
            [0, 0], [15, 0], [-15, 0], [0, 15], [0, -15],
            [15, 15], [15, -15], [-15, 15], [-15, -15],
            [40, 0], [-40, 0], [0, 40], [0, -40],
            [40, 40], [40, -40], [-40, 40], [-40, -40],
            [65, 0], [-65, 0], [0, 65], [0, -65],
        ];
        intersections.forEach(([ix, iz]) => {
            const intGeo = new THREE.CircleGeometry(ROAD_WIDTH * 0.9, 12);
            const intMesh = new THREE.Mesh(intGeo, intMat);
            intMesh.rotation.x = -Math.PI / 2;
            intMesh.position.set(ix, 0.012, iz);
            roadGroup.add(intMesh);
        });

        // === ZEBRA CROSSINGS ===
        const crossMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const addCrossing = (x, z, rotY) => {
            const cg = new THREE.Group();
            for (let i = -3; i <= 3; i++) {
                const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.5, ROAD_WIDTH), crossMat);
                stripe.rotation.x = -Math.PI / 2;
                stripe.position.set(i * 0.85, 0.018, 0);
                cg.add(stripe);
            }
            cg.position.set(x, 0, z);
            cg.rotation.y = rotY;
            roadGroup.add(cg);
        };
        addCrossing(7.5, 0, 0); addCrossing(-7.5, 0, 0);
        addCrossing(0, 7.5, Math.PI / 2); addCrossing(0, -7.5, Math.PI / 2);
        addCrossing(22.5, 0, 0); addCrossing(-22.5, 0, 0);
        addCrossing(0, 22.5, Math.PI / 2); addCrossing(0, -22.5, Math.PI / 2);

        this.game.scene.add(roadGroup);
    }

    createEnvironment() {
        const envGroup = new THREE.Group();
        this.game.scene.add(envGroup);

        // ─────────────────────────────────────────────────────────────
        // MODEL CACHE: Each GLB is loaded ONCE. All placements clone()
        // the cached scene — zero redundant network requests or GPU uploads.
        // ─────────────────────────────────────────────────────────────
        const modelCache = new Map(); // path → THREE.Object3D (template)
        const pendingQueue = [];      // [path, callback] pairs queued before cache is warm

        const getModel = (path, onReady) => {
            if (modelCache.has(path)) {
                // Already cached — clone immediately (sync, free)
                onReady(modelCache.get(path).clone());
                return;
            }
            // Not yet loaded — queue the callback
            if (!pendingQueue[path]) pendingQueue[path] = [];
            pendingQueue[path].push(onReady);

            // Only fire ONE loader.load per unique path
            if (pendingQueue[path].length === 1) {
                this.loader.load(path, (gltf) => {
                    const template = gltf.scene;
                    // Prepare template: set material defaults once
                    template.traverse(node => {
                        if (node.isMesh) {
                            node.castShadow = true;
                            node.receiveShadow = true;
                            if (node.material) {
                                node.material.roughness = 0.8;
                                node.material.metalness = 0.05;
                            }
                        }
                    });
                    modelCache.set(path, template);
                    // Flush all queued callbacks for this path
                    for (const cb of pendingQueue[path]) cb(template.clone());
                    pendingQueue[path] = [];
                });
            }
        };

        // ─────────────────────────────────────────────────────────────
        // HELPER: place a cached prop at (x, z) with given scale/rotY
        // ─────────────────────────────────────────────────────────────
        const placeProp = (path, x, z, scale, rotY = 0) => {
            const group = new THREE.Group();
            group.position.set(x, 0, z);
            envGroup.add(group);
            getModel(path, (model) => {
                model.scale.set(scale, scale, scale);
                model.rotation.y = rotY;
                model.updateMatrixWorld(true);
                const box = new THREE.Box3().setFromObject(model);
                model.position.y = -box.min.y;
                group.add(model);
            });
        };

        // ─────────────────────────────────────────────────────────────
        // TREES & BUSHES — 650 total, exact road-avoidance check
        // clone() reuses the same GPU geometry/material — essentially free
        // ─────────────────────────────────────────────────────────────
        // Known road center positions (from createRoads)
        const NS_ROAD_X = new Set([0, 15, -15, 40, -40, 65, -65]);
        const EW_ROAD_Z = new Set([0, 15, -15, 40, -40, 65, -65]);
        const ROAD_CLEAR = 7; // half-road + sidewalk + small buffer

        const isOnRoad = (x, z) => {
            // On any N-S artery?
            for (const rx of NS_ROAD_X) {
                if (Math.abs(x - rx) < ROAD_CLEAR) return true;
            }
            // On any E-W artery?
            for (const rz of EW_ROAD_Z) {
                if (Math.abs(z - rz) < ROAD_CLEAR) return true;
            }
            // Diagonal connectors (rough bounds)
            if (Math.abs(x + 27) < 5 && Math.abs(z + 27) < 15) return true;
            if (Math.abs(x - 27) < 5 && Math.abs(z - 27) < 15) return true;
            if (Math.abs(x + 27) < 5 && Math.abs(z - 27) < 15) return true;
            if (Math.abs(x - 27) < 5 && Math.abs(z + 27) < 15) return true;
            return false;
        };

        const treePaths = [
            './assets/lushGreenTree.glb',
            './assets/coniferousTree.glb',
            './assets/coniferous_tree.glb',
        ];
        const TREE_COUNT = 650;
        let tPlaced = 0, tAttempts = 0;
        while (tPlaced < TREE_COUNT && tAttempts < TREE_COUNT * 5) {
            tAttempts++;
            const x = (Math.random() - 0.5) * 260;
            const z = (Math.random() - 0.5) * 260;
            if (isOnRoad(x, z)) continue;
            if (Math.random() > 0.35) {
                placeProp(treePaths[tPlaced % 3], x, z, 4, Math.random() * Math.PI * 2);
            } else {
                placeProp('./assets/new_bush.glb', x, z, 2, Math.random() * Math.PI * 2);
            }
            tPlaced++;
        }

        // ─────────────────────────────────────────────────────────────
        // INNER CITY GREENING: Dedicated lush pass for the urban core
        // Uses proximity check to prevent tree-on-tree clipping.
        // ─────────────────────────────────────────────────────────────
        const innerTrees = [];
        const INNER_TREE_COUNT = 150;
        const MIN_TREE_DIST = 5.0;
        let itPlaced = 0, itAttempts = 0;

        while (itPlaced < INNER_TREE_COUNT && itAttempts < INNER_TREE_COUNT * 10) {
            itAttempts++;
            const rx = (Math.random() - 0.5) * 85;
            const rz = (Math.random() - 0.5) * 85;

            // Avoid the roundabout center
            if (Math.sqrt(rx * rx + rz * rz) < 12) continue;
            // Avoid exact road positions
            if (isOnRoad(rx, rz)) continue;

            // Collision check: don't place too close to other trees in this pass
            let tooClose = false;
            for (const t of innerTrees) {
                const dx = rx - t.x;
                const dz = rz - t.z;
                if (Math.sqrt(dx * dx + dz * dz) < MIN_TREE_DIST) {
                    tooClose = true;
                    break;
                }
            }
            if (tooClose) continue;

            const path = Math.random() > 0.3 ? treePaths[itPlaced % 3] : './assets/new_bush.glb';
            const scale = path.includes('bush') ? 2.2 : 4 + Math.random();
            placeProp(path, rx, rz, scale, Math.random() * Math.PI * 2);

            innerTrees.push({ x: rx, z: rz });
            itPlaced++;
        }

        // ─────────────────────────────────────────────────────────────
        // ROCKS — scattered all over, 1 GLB load then cloned 12×
        // ─────────────────────────────────────────────────────────────
        const rockPositions = [
            [-75, -75, 5], [75, -70, 3], [-65, 75, 4],
            [-55, -55, 4], [55, 55, 3], [-85, 20, 3],
            [85, -20, 4], [-30, -90, 5], [30, 90, 3],
            [-90, 60, 4], [90, -60, 5], [50, -90, 3],
        ];
        rockPositions.forEach(([rx, rz, rs]) =>
            placeProp('./assets/rock1.glb', rx, rz, rs, Math.random() * Math.PI * 2)
        );

        // ─────────────────────────────────────────────────────────────
        // CARS — 1 GLB load, ~35 clones scattered across the city
        // ─────────────────────────────────────────────────────────────
        const addCar = (x, z, rotY) => placeProp('./assets/car.glb', x, z, 3, rotY);

        addCar(0, -60, Math.PI / 2); addCar(60, 6, Math.PI / 2);
        addCar(-60, 12, Math.PI / 2); addCar(41, 0, 0);
        addCar(-41, 0, 0); addCar(15, -60, Math.PI / 2);
        addCar(-15, -80, Math.PI / 2); addCar(65, 15, 0);
        addCar(-65, 15, 0); addCar(2, 60, 0); addCar(-2, -60, 0);
        // Extra cars on outer arteries
        addCar(40, 65, 0); addCar(-40, 65, 0); addCar(0, -80, Math.PI / 2);
        addCar(65, -40, Math.PI / 2); addCar(-65, -40, Math.PI / 2);

        // Per-block cars
        const outerOffsets = [
            [-40, -40], [-40, 0], [-40, 40], [-40, 65],
            [40, -40], [40, 0], [40, 40], [40, 65],
            [65, -40], [65, 0], [65, 40], [65, 65],
            [-65, -40], [-65, 0], [-65, 40], [-65, 65],
            [0, -40], [0, 40], [0, 65]
        ];
        outerOffsets.forEach(([ox, oz]) => {
            if (Math.random() > 0.35) addCar(ox, oz + (Math.random() > 0.5 ? 8 : -8), Math.PI / 2);
            if (Math.random() > 0.35) addCar(ox + (Math.random() > 0.5 ? 8 : -8), oz, 0);
        });

        // ─────────────────────────────────────────────────────────────
        // PEOPLE — 2 GLB loads, ~70 clones = very populated city
        // ─────────────────────────────────────────────────────────────
        const addPerson = (type, x, z, rotY) =>
            placeProp(`./assets/${type}.glb`, x, z, 2.5, rotY);

        // Hero placements near key buildings
        const heroPersons = [
            ['employee', -14, -14, Math.PI / 4], ['ceo', -18, -14, -Math.PI / 4],
            ['employee', -14, 18, Math.PI / 2], ['ceo', -18, 14, Math.PI],
            ['employee', 18, 14, -Math.PI / 4], ['employee', 14, 18, Math.PI / 4],
            ['ceo', 14, -18, Math.PI / 2], ['employee', 18, -14, -Math.PI / 2],
            ['employee', 30, 9, -Math.PI / 2], ['employee', -30, -9, Math.PI / 2],
            ['ceo', 30, -15, -Math.PI / 4], ['employee', -30, 15, Math.PI / 4],
            ['employee', 60, 41, Math.PI], ['employee', 60, -41, Math.PI],
            ['employee', -60, 41, Math.PI], ['employee', -60, -41, Math.PI],
            ['employee', 5, 5, Math.PI / 4], ['ceo', -5, -5, -Math.PI / 4],
            ['employee', 40, 2, Math.PI / 2], ['employee', -40, -2, -Math.PI / 2],
            ['ceo', 0, 20, Math.PI], ['employee', 20, 0, Math.PI / 2],
            ['employee', -20, 0, -Math.PI / 2], ['ceo', 0, -20, 0],
        ];
        heroPersons.forEach(([type, x, z, r]) => addPerson(type, x, z, r));

        // Full outer-block crowd: 2–3 people per intersection (restored)
        outerOffsets.forEach(([ox, oz]) => {
            const crowd = Math.floor(Math.random() * 3) + 2; // 2–4 people per block
            for (let i = 0; i < crowd; i++) {
                const pType = Math.random() > 0.75 ? 'ceo' : 'employee';
                addPerson(pType,
                    ox + (Math.random() - 0.5) * 16,
                    oz + (Math.random() - 0.5) * 16,
                    Math.random() * Math.PI * 2
                );
            }
        });

        // ─────────────────────────────────────────────────────────────
        // LANDMARK PROPS — unique assets, 1 load each
        // ─────────────────────────────────────────────────────────────
        placeProp('./assets/townhall.glb', 0, 80, 4);
        placeProp('./assets/apartment.glb', -80, -40, 4, Math.PI / 2);
        placeProp('./assets/apartment1.glb', -80, 40, 3, Math.PI / 2);
        placeProp('./assets/apartment.glb', -80, 0, 4, Math.PI / 2);
        placeProp('./assets/house.glb', 80, -40, 3, -Math.PI / 2);
        placeProp('./assets/house.glb', 80, 40, 3, -Math.PI / 2);
        placeProp('./assets/house.glb', 80, 0, 3, -Math.PI / 2);
        placeProp('./assets/lake1.glb', -70, -70, 4);
        placeProp('./assets/lake2.glb', 70, 70, 4);
        placeProp('./assets/burjKhalifa.glb', 0, -110, 2);
    }

    _loadModel(parentGroup, modelPath, scale = 1, yOffset = 0.2) {
        if (!modelPath) return;

        this.loader.load(modelPath, (gltf) => {
            const model = gltf.scene;

            // Apply scale first
            model.scale.set(scale, scale, scale);
            model.updateMatrixWorld(true);

            // Calculate bounding box for precise ground alignment
            const box = new THREE.Box3().setFromObject(model);

            // Center the model horizontally and sit it on the surface
            model.position.y = yOffset - box.min.y;

            model.traverse(node => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    // Ensure materials are vibrant and clearly visible
                    if (node.material) {
                        node.material.roughness = 0.8;
                        node.material.metalness = 0.05;
                    }
                }
            });

            parentGroup.add(model);
        });
    }

    addBuilding(type, x, z) {
        const config = this.buildingTypes[type];
        const group = new THREE.Group();

        // Foundation/Plot
        const plotGeo = new THREE.BoxGeometry(config.size[0] + 2, 0.2, config.size[2] + 2);
        const plotMat = new THREE.MeshPhongMaterial({ color: 0xdddddd });
        const plot = new THREE.Mesh(plotGeo, plotMat);
        plot.position.y = 0.1;
        plot.receiveShadow = true;
        group.add(plot);

        // Resolve model path — apply level override if one exists for this building type
        const originalPath = config.modelPath;
        const resolvedPath = (this._levelOverrides && this._levelOverrides[originalPath])
            ? this._levelOverrides[originalPath]
            : originalPath;

        this._loadModel(group, resolvedPath, config.scale, config.yOffset);

        group.position.set(x, 0, z);
        group.userData = {
            buildingId: Math.random().toString(36).substr(2, 9),
            type: type,
            name: config.name
        };

        // Small always-visible name cloud for easy identification
        this._attachBuildingNameCloud(group, config);

        this.game.scene.add(group);
        this.buildings.push(group);

        return group;
    }

    createCEO() {
        if (this.ceo) return this.ceo;

        const group = new THREE.Group();

        this.loader.load('./assets/ceo.glb', (gltf) => {
            const model = gltf.scene;

            model.scale.set(2, 2, 2); // Increased assistant size for better focus
            model.updateMatrixWorld(true);

            // Apply bounding box centering
            const box = new THREE.Box3().setFromObject(model);
            model.position.y = 0.3 - box.min.y; // Sit exactly on ground with offset

            model.traverse(node => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    if (node.material) {
                        node.material.roughness = 0.4;
                        node.material.metalness = 0.5;
                    }
                }
            });

            group.add(model);
        });

        // Halo/Glow ring
        const ringGeo = new THREE.TorusGeometry(0.8, 0.04, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xffcd29 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 2.5;
        group.add(ring);

        // Character Head Attachment Point for Popups
        this.ceoHead = new THREE.Object3D();
        this.ceoHead.position.y = 5; // roughly head height
        group.add(this.ceoHead);

        group.position.set(0, 0, 0);
        this.game.scene.add(group);
        this.ceo = group;
        return group;
    }

    moveCEOTo(x, z) {
        if (!this.ceo) this.createCEO();

        // Smooth transition using GSAP
        gsap.to(this.ceo.position, {
            x: x,
            z: z + 2, // Slight offset so it doesn't stand INSIDE the building
            duration: 1,
            ease: "power2.inOut"
        });

        // Add a little "jump" animation
        gsap.to(this.ceo.position, {
            y: 0.5,
            duration: 0.2,
            repeat: 1,
            yoyo: true,
            ease: "power1.out"
        });
    }

    removeCEO() {
        if (this.ceo) {
            this.game.scene.remove(this.ceo);
            this.ceo = null;
        }
    }

    update() {
        // Optional: Animate buildings (breathe effect)
        const time = Date.now() * 0.001;
        this.buildings.forEach((b, i) => {
            const scale = 1 + Math.sin(time + i) * 0.02;
            // b.scale.set(scale, scale, scale);
        });

        // Rotate CEO halo
        if (this.ceo) {
            const halo = this.ceo.children.find(c => c.geometry.type === 'TorusGeometry');
            if (halo) halo.rotation.z += 0.02;

            // Hover effect
            this.ceo.position.y = 0.1 + Math.sin(time * 3) * 0.1;
        }
    }
}
