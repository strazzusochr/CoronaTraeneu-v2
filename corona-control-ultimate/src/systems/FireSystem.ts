/**
 * Corona Control Ultimate - Fire System
 * Gemäß V6.0 Phase 3: "Umgebungs-Chaos"
 * 
 * Verwaltet aktive Brände:
 * - Schaden an Entities im Radius (Spieler + NPCs)
 * - Visuelle Partikel (via ParticleSystem-Aufrufe)
 * - Ausbreitung (optional für später, hier Radius-basiert)
 */

import { EngineLoop } from '@/core/EngineLoopManager';
import { useGameStore } from '@/stores/gameStore';
import { useParticleStore, ParticleType } from '@/components/Effects/ParticleSystem';
import AudioManager, { AudioLayer } from '@/managers/AudioManager';
import * as THREE from 'three';
import GameEventSystem from '@/systems/GameEventSystem';

interface ActiveFire {
    id: string;
    position: [number, number, number];
    radius: number;
    intensity: number; // Schaden pro Tick
    duration: number;  // Restzeit in Sekunden
    tickTimer: number; // Timer für Schaden (1Hz)
}

class FireSystem {
    private static instance: FireSystem;
    private fires: ActiveFire[] = [];
    private tmpFire = new THREE.Vector3();
    private tmpNpc = new THREE.Vector3();
    private tmpPlayer = new THREE.Vector3();

    private static readonly DAMAGE_TICK_RATE = 1.0;
    private static readonly SPAWN_PARTICLE_RATE = 0.1;
    private static readonly DEFAULT_DURATION = 20;
    private static readonly DEFAULT_RADIUS = 3;
    private static readonly DEFAULT_INTENSITY = 10;

    private particleTimer = 0;

    private constructor() {
        // Registriere Update Loop (Global event frequency 0.2Hz ist zu langsam für Partikel, 
        // also nutzen wir Physics oder AI Loop? Physics update ist 120Hz, AI 10Hz. 
        // Wir nehmen AI Loop (10Hz) für Logic updates, oder registrieren einfach in EngineLoop als custom callback falls möglich.
        // EngineLoop hat Physics, AI, UI, Global. 
        // Wir nutzen AI (10Hz) für Logic, ist ok.
        EngineLoop.onAIUpdate(this.update.bind(this));
        console.log("🔥 FIRE SYSTEM INITIALIZED (V6.0)");
    }

    public static getInstance(): FireSystem {
        if (!FireSystem.instance) {
            FireSystem.instance = new FireSystem();
        }
        return FireSystem.instance;
    }

    /**
     * Erzeugt ein neues Feuer an Position
     */
    public spawnFire(position: [number, number, number], duration: number = FireSystem.DEFAULT_DURATION, radius: number = FireSystem.DEFAULT_RADIUS, intensity: number = FireSystem.DEFAULT_INTENSITY) {
        const id = Math.random().toString(36).substr(2, 9);
        this.fires.push({
            id,
            position,
            duration,
            radius,
            intensity,
            tickTimer: 0
        });
        console.log(`[FireSystem] Feuer ausgebrochen bei ${position} (Radius: ${radius}m)`);
        AudioManager.playSound('fire_start', AudioLayer.ENVIRONMENTAL, { pos: position });
        GameEventSystem.getInstance().emit({
            type: 'AUDIO',
            position,
            sourceId: 0,
            intensity: 0.8,
            timestamp: performance.now(),
            tags: ['FIRE', 'IGNITION']
        });
    }

    /**
     * Update Loop (ca. 10Hz)
     */
    public update(delta: number) {
        if (this.fires.length === 0) return;

        const store = useGameStore.getState();
        const playerPos = store.player.position;
        const particleStore = useParticleStore.getState();

        // Partikel-Timer
        this.particleTimer += delta;
        const shouldSpawnParticles = this.particleTimer >= FireSystem.SPAWN_PARTICLE_RATE;
        if (shouldSpawnParticles) this.particleTimer = 0;

        // Feuer-Update
        this.fires = this.fires.filter(fire => {
            fire.duration -= delta;
            fire.tickTimer += delta;

            if (fire.tickTimer >= FireSystem.DAMAGE_TICK_RATE) {
                fire.tickTimer = 0;
                this.applyAreaDamage(fire, store.npcs, playerPos);
            }

            // 2. Visuelle Effekte (Sustained Fire)
            if (shouldSpawnParticles) {
                // Spawne mehrere Partikel im Radius
                for (let i = 0; i < 3; i++) {
                    const offset = [
                        (Math.random() - 0.5) * fire.radius,
                        0.5,
                        (Math.random() - 0.5) * fire.radius
                    ];
                    particleStore.spawnEffect(
                        ParticleType.FIRE,
                        [fire.position[0] + offset[0], fire.position[1] + offset[1], fire.position[2] + offset[2]],
                        { color: 'orange', count: 1, size: 0.3 }
                    );
                    
                    // Rauch-Partikel (Phase 12)
                    if (Math.random() > 0.5) {
                        particleStore.spawnEffect(
                            ParticleType.SMOKE,
                            [fire.position[0] + offset[0], fire.position[1] + 1.5, fire.position[2] + offset[2]],
                            { color: '#555555', count: 1, size: 0.5, spread: 0.5 }
                        );
                    }
                }
            }

            return fire.duration > 0;
        });
    }

    /**
     * Wendet Schaden auf Entities im Radius an
     */
    private applyAreaDamage(fire: ActiveFire, npcs: any[], playerPos: any) {
        this.tmpFire.set(fire.position[0], fire.position[1], fire.position[2]);

        this.tmpPlayer.set(playerPos[0], playerPos[1], playerPos[2]);
        if (this.tmpPlayer.distanceTo(this.tmpFire) <= fire.radius) {
            useGameStore.getState().takeDamage(fire.intensity);
            console.log("[FireSystem] Spieler verbrennt!");
            useGameStore.getState().setPrompt("FEUER! Raus da!");
        }

        // B. NPC Check (Vereinfacht: Loop über alle. Upgrade: Spatial Grid)
        // Check nur NPCs die nah genug sind (Optimierung: Store sollte nur nahe liefern oder wir iterieren alle)
        // Bei 500 NPCs ist Iteration ok für 10Hz? Besser nur 1Hz (was wir hier tun).
        npcs.forEach(npc => {
            this.tmpNpc.set(npc.position[0], npc.position[1], npc.position[2]);
            if (this.tmpNpc.distanceTo(this.tmpFire) <= fire.radius) {
                // Schaden Logik? NPC hat aktuell kein HP Feld im Store Array (nur position/state).
                // Wir simulieren Panic State Änderung
                if (npc.state !== 'FLEE' && npc.state !== 'ARRESTED') {
                    useGameStore.getState().updateNpc(npc.id, { state: 'FLEE' });
                }
            }
        });
    }

    public resetForTests() {
        this.fires = [];
        this.particleTimer = 0;
    }
}

export default FireSystem.getInstance();
