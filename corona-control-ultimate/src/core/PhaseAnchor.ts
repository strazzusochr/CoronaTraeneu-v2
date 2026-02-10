import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useFeatureFlags } from './FeatureFlags';

// Defines the stability of the project
export enum PhaseStatus {
    LOCKED = 'LOCKED',       // Phase completed and verified
    IN_PROGRESS = 'IN_PROGRESS', // Currently working on
    PENDING = 'PENDING'      // Future
}

interface PhaseAnchorState {
    currentPhase: number;
    maxStablePhase: number;
    phaseStatus: Record<number, PhaseStatus>;

    setPhaseMetrics: (phase: number, status: PhaseStatus) => void;
    promotePhase: () => void; // Move to next phase
    rollbackToStable: () => void; // Emergency Stop
}

export const usePhaseAnchor = create<PhaseAnchorState>()(
    persist(
        (set, get) => ({
            currentPhase: 1, // Start at Foundation
            maxStablePhase: 0, // Nothing is stable yet
            phaseStatus: {
                0: PhaseStatus.LOCKED, // Plan is locked
                1: PhaseStatus.IN_PROGRESS,
                2: PhaseStatus.PENDING,
                3: PhaseStatus.PENDING,
                4: PhaseStatus.PENDING,
                5: PhaseStatus.PENDING,
                6: PhaseStatus.PENDING,
                7: PhaseStatus.PENDING,
                8: PhaseStatus.PENDING,
                9: PhaseStatus.PENDING,
                10: PhaseStatus.PENDING
            },

            setPhaseMetrics: (phase, status) => set(state => ({
                phaseStatus: { ...state.phaseStatus, [phase]: status }
            })),

            promotePhase: () => {
                const { currentPhase, setPhaseMetrics } = get();
                const next = currentPhase + 1;

                // Mark current as locked
                setPhaseMetrics(currentPhase, PhaseStatus.LOCKED);

                // Enable Features for the completed phase via Bridge
                useFeatureFlags.getState().enablePhase(currentPhase);

                set({
                    currentPhase: next,
                    maxStablePhase: currentPhase
                });

                setPhaseMetrics(next, PhaseStatus.IN_PROGRESS);
                console.log(`[PhaseAnchor] Promoted to Phase ${next}. Stable: ${currentPhase}`);
            },

            rollbackToStable: () => {
                const { maxStablePhase } = get();
                console.warn(`[PhaseAnchor] 🚨 EMERGENCY ROLLBACK TO PHASE ${maxStablePhase}`);

                // Reset Features
                useFeatureFlags.getState().resetAll();
                useFeatureFlags.getState().enablePhase(maxStablePhase);

                set({ currentPhase: maxStablePhase + 1 }); // Try again from stable + 1
            }
        }),
        {
            name: 'corona-control-phase-anchor',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
