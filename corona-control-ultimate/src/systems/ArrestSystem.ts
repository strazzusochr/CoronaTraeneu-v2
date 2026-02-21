import { useGameStore } from '@/stores/gameStore';
import { poiSystem } from './POISystem';
import { NPCType } from '@/types/enums';

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

            // Mission Progress for Mission 3
            if (state.gameState.currentMissionIndex === 2 && npc.type === NPCType.RIOTER) {
                state.updateMissionProgress(1);
                
                // Check if mission 3 is complete
                const updatedState = useGameStore.getState();
                const mission3 = updatedState.missions[2];
                if (mission3 && mission3.currentAmount >= mission3.targetAmount) {
                    updatedState.nextMission();
                    updatedState.setVictory(true);
                    updatedState.setPrompt("MISSION ERFÜLLT: Alle Randalierer zerstreut!");
                }
            }

            // Entferne POI nach Verhaftung
            poiSystem.unregisterPOI(`npc_${npcId}`);

            setTimeout(() => {
                state.setPrompt(null);
            }, 2000);
        }, 2000);
    }
}

export const arrestSystem = ArrestSystem.getInstance();
