import { EmotionalState, NPCState, NPCType } from '@/types/enums';
import { NPCData } from '@/types/interfaces';
import { EngineLoopRegistry } from '@/core/EngineLoopManager';
import { useGameStore } from '@/stores/gameStore';
import { btManager } from '@/systems/ai/bt/BTManager';

/**
 * NPCAIManager (V7.0)
 * Verwaltet die stats-basierte KI und Behavior Trees für alle NPCs.
 */
export class NPCAIManager {
    private static instance: NPCAIManager;
    private lastUpdate: number = Date.now();

    private constructor() {
        EngineLoopRegistry.ai.push(() => this.update());
        console.log("NPC AI Manager initialized (10Hz)");
    }

    public static getInstance(): NPCAIManager {
        if (!this.instance) {
            this.instance = new NPCAIManager();
        }
        return this.instance;
    }

    /**
     * Zentraler Update-Loop für alle NPCs (10Hz).
     */
    public update() {
        const state = useGameStore.getState();
        if (!state.gameState.isPlaying) return;

        const now = Date.now();
        const dt = (now - this.lastUpdate) / 1000;
        this.lastUpdate = now;

        const npcs = state.npcs;
        const playerPos = state.player.position;

        // 1. Behavior Tree Updates (Movement & Decision Making)
        btManager.update(npcs, playerPos, dt);

        // 2. Stats & Emotions Updates
        npcs.forEach(npc => {
            if (npc.state === NPCState.DEAD || npc.state === NPCState.ARRESTED) return;

            // 1. Stress-Berechnung (Nähe zum Spieler oder Chaos)
            const distToPlayer = Math.sqrt(
                Math.pow(npc.position[0] - playerPos[0], 2) +
                Math.pow(npc.position[2] - playerPos[2], 2)
            );

            let newStress = npc.emotions.stress;
            if (distToPlayer < 5) newStress += 0.05; // Stress steigt in Spielernähe
            else newStress -= 0.01; // Stress sinkt langsam

            newStress = Math.max(0, Math.min(1, newStress));

            // 2. Aggressions-Logik (Rioter-spezifisch)
            let newAggression = npc.emotions.aggression;
            if (npc.type === NPCType.RIOTER && newStress > 0.5) {
                newAggression += 0.02;
            } else {
                newAggression -= 0.005;
            }
            newAggression = Math.max(0, Math.min(1, newAggression));

            // 3. Emotions-Check
            const nextEmotion = this.calculateEmotion({ ...npc, emotions: { ...npc.emotions, stress: newStress, aggression: newAggression } });

            // 4. Update im Store (Batching wäre hier besser, aber initial ok)
            if (nextEmotion !== npc.emotions.current || Math.abs(newStress - npc.emotions.stress) > 0.1) {
                state.updateNpc(npc.id, {
                    emotions: { ...npc.emotions, current: nextEmotion, stress: newStress, aggression: newAggression }
                });
            }
        });
    }

    public calculateEmotion(npc: Partial<NPCData>): EmotionalState {
        const emotions = npc.emotions;
        if (!emotions) return EmotionalState.NEUTRAL;

        if (emotions.aggression > 0.8) return EmotionalState.AGGRESSIVE;
        if (emotions.stress > 0.7) return EmotionalState.ANGRY;
        if (emotions.fear > 0.6) return EmotionalState.TERRIFIED;
        if (emotions.stress > 0.4) return EmotionalState.STRESSED;

        return EmotionalState.NEUTRAL;
    }
}

export const npcAiManager = NPCAIManager.getInstance();
