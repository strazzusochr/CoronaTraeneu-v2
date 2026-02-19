export interface CutsceneStep {
    time: number; // Startzeit in ms
    duration: number; // Dauer in ms
    cameraPos: [number, number, number];
    cameraLookAt: [number, number, number];
    dialogue?: string;
    speaker?: string;
    subtitle?: string;
}

import type { CutsceneId } from '@/types/enums';

export interface CutsceneData {
    id: CutsceneId;
    totalDuration: number;
    steps: CutsceneStep[];
}

export const CUTSCENE_DATA: Record<CutsceneId, CutsceneData> = {
    CS_STAATSFEIND_01_BRIEFING: {
        id: 'CS_STAATSFEIND_01_BRIEFING',
        totalDuration: 165000,
        steps: [
            {
                time: 0,
                duration: 8000,
                cameraPos: [100, 50, 150],
                cameraLookAt: [100, 10, 100],
                subtitle: "Wien - 13:30 Uhr. Polizeipräsidium Innere Stadt."
            },
        ]
    }
};
