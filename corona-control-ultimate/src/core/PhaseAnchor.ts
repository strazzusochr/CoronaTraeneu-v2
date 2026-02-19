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
            currentPhase: 14,
        maxStablePhase: 13,
            phaseStatus: {
                0: PhaseStatus.LOCKED,
                1: PhaseStatus.LOCKED,
                2: PhaseStatus.LOCKED,
                3: PhaseStatus.LOCKED,
                4: PhaseStatus.LOCKED,
                5: PhaseStatus.LOCKED,
                6: PhaseStatus.LOCKED,
                7: PhaseStatus.LOCKED,
                8: PhaseStatus.LOCKED,
                9: PhaseStatus.LOCKED,
                10: PhaseStatus.LOCKED,
                11: PhaseStatus.LOCKED,
                12: PhaseStatus.LOCKED,
                13: PhaseStatus.LOCKED,
                14: PhaseStatus.IN_PROGRESS
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
