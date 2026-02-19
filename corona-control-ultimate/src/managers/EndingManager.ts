import { useGameStore } from '@/stores/gameStore';
import type { CutsceneId } from '@/types/enums';

export type GameRank = 'S' | 'A' | 'B' | 'C' | 'D' | 'F';

export interface GameResult {
    rank: GameRank;
    score: number;
    summary: string;
    objectivesCompleted: number;
    tensionLevel: number;
}

const RANK_THRESHOLDS: Record<GameRank, number> = {
    S: 2500,
    A: 2000,
    B: 1500,
    C: 1000,
    D: 500,
    F: 0
};

const ENDING_CUTSCENES: Record<GameRank, CutsceneId> = {
    S: 'CS_OUTRO_S',
    A: 'CS_OUTRO_A',
    B: 'CS_OUTRO_B',
    C: 'CS_OUTRO_C',
    D: 'CS_OUTRO_D',
    F: 'CS_OUTRO_F'
};

export class EndingManager {

    public static calculateEnding(): GameResult {
        const state = useGameStore.getState();
        const score = state.gameState.points; // Punkte
        const tension = state.tensionLevel;

        let rank: GameRank = 'F';

        if (state.gameState.health <= 0) {
            return {
                rank: 'F',
                score: score,
                summary: 'MISSION GESCHEITERT: Agent handlungsunfähig.',
                objectivesCompleted: 0, // Placeholder
                tensionLevel: tension
            };
        }

        if (score >= RANK_THRESHOLDS.S) rank = 'S';
        else if (score >= RANK_THRESHOLDS.A) rank = 'A';
        else if (score >= RANK_THRESHOLDS.B) rank = 'B';
        else if (score >= RANK_THRESHOLDS.C) rank = 'C';
        else if (score >= RANK_THRESHOLDS.D) rank = 'D';

        let summary = '';
        switch (rank) {
            case 'S': summary = 'EXZELLENT: Die Situation wurde perfekt deeskaliert.'; break;
            case 'A': summary = 'SEHR GUT: Professionelle Arbeit, minimale Kollateralschäden.'; break;
            case 'B': summary = 'GUT: Mission erfüllt, aber Raum für Verbesserung.'; break;
            case 'C': summary = 'AKZEPTABEL: Ziele erreicht, aber hohe Spannungswerte.'; break;
            case 'D': summary = 'SCHWACH: Die Situation drohte zu entgleiten.'; break;
            case 'F': summary = 'VERSAGEN: Die öffentliche Ordnung ist zusammengebrochen.'; break;
        }

        return {
            rank,
            score,
            summary,
            objectivesCompleted: 0, // TODO: Count completed missions
            tensionLevel: tension
        };
    }

    public static getCutsceneForRank(rank: GameRank): CutsceneId {
        return ENDING_CUTSCENES[rank];
    }

    public static calculateEndingWithCutscene(): GameResult & { cutsceneId: CutsceneId } {
        const result = this.calculateEnding();
        const cutsceneId = this.getCutsceneForRank(result.rank);
        return { ...result, cutsceneId };
    }
}
