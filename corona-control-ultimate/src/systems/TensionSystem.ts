
import { useGameStore } from '@/stores/gameStore';
import GameEventSystem from '@/systems/GameEventSystem';
import { EngineLoop } from '@/core/EngineLoopManager';
import FireSystem from '@/systems/FireSystem';

class TensionSystem {
    private static readonly DECAY_RATE = 0.5;
    private static readonly WAVE_THRESHOLD = 30;
    private static readonly FIRE_TENSION_THRESHOLD = 75;
    private static readonly FIRE_SPAWN_PROB_FACTOR = 0.02;
    private static readonly FIRE_DURATION = 20;
    private static readonly FIRE_RADIUS = 4;
    private static readonly FIRE_INTENSITY = 15;

    private lastWaveTime = 0;

    public update(delta: number) {
        const store = useGameStore.getState();
        const currentTension = store.tensionLevel;
        const currentTime = Date.now();

        // 1. Verarbeite aktuelle Ereignisse
        const recentEvents = GameEventSystem.getInstance().getActiveStimuli(currentTime);
        let tensionIncrease = 0;

        // Chaos-Faktor: Häufige Ereignisse erhöhen die Basisspannung
        if (recentEvents.length > 5) {
            tensionIncrease += delta * 2;
        }

        let newTension = Math.max(0, currentTension - (TensionSystem.DECAY_RATE * delta) + tensionIncrease);

        if (newTension > TensionSystem.FIRE_TENSION_THRESHOLD && Math.random() < (newTension / 100) * TensionSystem.FIRE_SPAWN_PROB_FACTOR) {
            const rioters = store.npcs.filter(n => n.type === 'RIOTER');
            if (rioters.length > 0) {
                const any = rioters[Math.floor(Math.random() * rioters.length)];
                const firePos: [number, number, number] = [any.position[0], 0.5, any.position[2]];
                FireSystem.spawnFire(firePos, TensionSystem.FIRE_DURATION, TensionSystem.FIRE_RADIUS, TensionSystem.FIRE_INTENSITY);
            }
        }

        // 3. Spawning-Logik
        if (newTension > TensionSystem.WAVE_THRESHOLD) {
            if (currentTime - this.lastWaveTime > 10000) { // Check alle 10s
                // Höhere Spannung = Höhere Chance
                if (Math.random() < (newTension / 100) * 0.5) {
                    console.log("[TensionSystem] Anstieg! Spawne Welle.");
                    store.spawnWave(2 + Math.floor(newTension / 20), 'RIOTER');
                    store.setPrompt("ACHTUNG: Verstärkung trifft ein!");
                    this.lastWaveTime = currentTime;
                }
            }
        }

        // Begrenzen & Store aktualisieren
        newTension = Math.max(0, Math.min(100, newTension));
        if (Math.abs(newTension - currentTension) >= 0.1) {
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
