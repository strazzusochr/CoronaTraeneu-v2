
import { useGameStore } from '@/stores/gameStore';
import GameEventSystem from '@/systems/GameEventSystem';
import { EngineLoop } from '@/core/EngineLoopManager';
import FireSystem from '@/systems/FireSystem';
import { NPCType, Faction } from '@/types/enums';

class TensionSystem {
    private static readonly BASE_DECAY_RATE = 0.5;
    private static readonly WAVE_THRESHOLD = 30;
    private static readonly FIRE_TENSION_THRESHOLD = 75;
    private static readonly FIRE_SPAWN_PROB_FACTOR = 0.02;
    private static readonly FIRE_DURATION = 20;

    private static readonly STIMULUS_WEIGHTS: Record<string, number> = {
        'EXPLOSION': 15,
        'MOLOTOV': 12,
        'GAS': 8,
        'TEARGAS': 8,
        'IMPACT': 3,
        'STONE': 3,
        'SHOUT': 2,
        'DEESCALATE': -10 // Deeskalaion senkt Spannung
    };

    private lastWaveTime = 0;

    public update(delta: number) {
        const store = useGameStore.getState();
        const currentTension = store.tensionLevel;
        const currentMoral = store.moralLevel;
        const currentTime = performance.now();

        // 1. Verarbeite aktuelle Ereignisse (Weighted Stimuli)
        const recentEvents = GameEventSystem.getInstance().getActiveStimuli(currentTime);
        let instantaneousTension = 0;

        recentEvents.forEach(stimulus => {
            if (stimulus.tags) {
                stimulus.tags.forEach(tag => {
                    const weight = TensionSystem.STIMULUS_WEIGHTS[tag] || 0;
                    instantaneousTension += weight * stimulus.intensity;
                });
            }
        });

        // Decay-Rate abhängig von Moral (Niedrige Moral = langsamerer Abstieg)
        const moralFactor = 0.5 + (1.0 - currentMoral / 100); 
        const decayForce = TensionSystem.BASE_DECAY_RATE * moralFactor * delta;

        let newTension = Math.max(0, currentTension - decayForce + instantaneousTension);

        // 2. Kopplung an Escalation (Phase 4 Logic)
        // Wenn Spannung über 80, steigt die permanente Eskalation leicht an
        if (newTension > 80) {
            const escalationIncr = 0.1 * delta;
            useGameStore.setState(s => ({ escalationLevel: Math.min(100, s.escalationLevel + escalationIncr) }));
        }

        // 3. Fire-Spawning Logik (nur bei hoher Spannung)
        if (newTension > TensionSystem.FIRE_TENSION_THRESHOLD && Math.random() < (newTension / 100) * TensionSystem.FIRE_SPAWN_PROB_FACTOR) {
            const rioters = store.npcs.filter(n => n.type === 'RIOTER');
            if (rioters.length > 0) {
                const any = rioters[Math.floor(Math.random() * rioters.length)];
                const firePos: [number, number, number] = [any.position[0], 0.5, any.position[2]];
                FireSystem.spawnFire(firePos, TensionSystem.FIRE_DURATION, 4, 15);
            }
        }

        // 4. Spawning-Logik (Wellen)
        if (newTension > TensionSystem.WAVE_THRESHOLD) {
            if (currentTime - this.lastWaveTime > 10000) { 
                if (Math.random() < (newTension / 100) * 0.3) {
                    const rioter = store.npcs.find(n => n.type === NPCType.RIOTER);
                    const spawnPos = rioter ? rioter.position : null;
                    
                    console.log("[TensionSystem] Anstieg! Spawne Welle.");
                    store.spawnWave(
                        2 + Math.floor(newTension / 20), 
                        NPCType.RIOTER, 
                        Faction.RIOTER, 
                        spawnPos as [number, number, number] | undefined
                    );
                    store.setPrompt("LAGE ESKALIERT: Weitere Randalierer gesichtet!");
                    this.lastWaveTime = currentTime;
                }
            }
        }

        // Begrenzen & Store aktualisieren
        newTension = Math.max(0, Math.min(100, newTension));
        if (Math.abs(newTension - currentTension) >= 0.01) {
            store.setTension(newTension);
        }
    }

    public resetForTests() {
        this.lastWaveTime = 0;
    }
}

const tensionSystem = new TensionSystem();
EngineLoop.onAIUpdate((dt) => tensionSystem.update(dt));

export default tensionSystem;
