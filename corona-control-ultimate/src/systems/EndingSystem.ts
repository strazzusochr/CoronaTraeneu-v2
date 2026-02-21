import { useGameStore } from '@/stores/gameStore';
import { CutsceneId } from '@/types/enums';

/**
 * EndingSystem
 * Calculates the final ranking and triggers the appropriate ending cutscene.
 */
export class EndingSystem {
    public static calculateEnding() {
        const state = useGameStore.getState();
        const karma = state.player.karma;
        const tension = state.tensionLevel;
        const missionsCompleted = state.gameState.currentMissionIndex;
        
        let endingId: CutsceneId;
        let rank: string;

        // Logic based on Karma and Tension
        if (karma > 80 && tension < 20) {
            endingId = 'CS_OUTRO_S'; // Perfect Peace
            rank = 'S - VERMITTLER DES VATIKANS';
        } else if (karma > 50) {
            endingId = 'CS_OUTRO_A'; // Benevolent Order
            rank = 'A - HÜTER DES FRIEDENS';
        } else if (karma > 0) {
            endingId = 'CS_OUTRO_B'; // Standard Operation
            rank = 'B - DISZIPLINIERTER SCHÜTZER';
        } else if (karma > -50) {
            endingId = 'CS_OUTRO_C'; // Aggressive Policing
            rank = 'C - EXEKUTIVE GEWALT';
        } else {
            endingId = 'CS_OUTRO_F'; // Chaos / State Enemy
            rank = 'F - STAATSFEIND';
        }

        console.log(`[EndingSystem] Calculated Ending: ${rank}`);
        
        state.setPrompt(`KAMPAGNE ABGESCHLOSSEN: ${rank}`);
        state.startCutscene(endingId);
        
        // Save achievement based on ending
        state.unlockAchievement(`ACH_0${endingId.split('_').pop()}` as any);
    }
}

export default EndingSystem;
