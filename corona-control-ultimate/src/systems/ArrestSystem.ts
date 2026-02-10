import { useGameStore } from '@/stores/gameStore';
import { poiSystem } from './POISystem';

/**
 * ArrestSystem (V7.0)
 * Logik für den Verhaftungs-Loop.
 */
export class ArrestSystem {
    private static instance: ArrestSystem;

    private constructor() {
        console.log("Arrest System initialized");
    }

    public static getInstance(): ArrestSystem {
        if (!this.instance) {
            this.instance = new ArrestSystem();
        }
        return this.instance;
    }

    /**
     * Startet den Verhaftungsprozess für einen NPC.
     */
    public startArrest(npcId: number) {
        const state = useGameStore.getState();
        const npc = state.npcs.find(n => n.id === npcId);

        if (!npc) return;

        // V7.0 AAA: Verhaftung dauert 2 Sekunden (Simulation)
        state.setPrompt("Verhaftung läuft...");

        setTimeout(() => {
            state.arrestNpc(npcId);
            state.setPrompt("NPC verhaftet! (+10 Karma)");

            // Entferne POI nach Verhaftung
            poiSystem.unregisterPOI(`npc_${npcId}`);

            setTimeout(() => {
                state.setPrompt(null);
            }, 2000);
        }, 2000);
    }
}

export const arrestSystem = ArrestSystem.getInstance();
