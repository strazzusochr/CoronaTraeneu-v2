import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 1. Feature Keys Identification (Manifest V6.0 Requirements)
export const FEATURES = {
    // Core Systems
    TIME_SYSTEM: 'TIME_SYSTEM',            // Phase 2
    MULTI_FREQ_LOOP: 'MULTI_FREQ_LOOP',    // Phase 2
    SPATIAL_GRID: 'SPATIAL_GRID',          // Phase 2
    FULL_DAYNIGHT_CYCLE: 'FULL_DAYNIGHT_CYCLE', // Phase 2

    // Graphics & Rendering
    R3F_RENDERER: 'R3F_RENDERER',          // Phase 3
    AAA_LIGHTING: 'AAA_LIGHTING',          // Phase 3
    PROCEDURAL_TEXTURES: 'PROCEDURAL_TEXTURES', // Phase 3
    LOD_SYSTEM: 'LOD_SYSTEM',              // Phase 3
    POST_PROCESSING: 'POST_PROCESSING',    // Phase 3

    // World & Environment
    WIEN_STEPHANSPLATZ: 'WIEN_STEPHANSPLATZ', // Phase 4
    DETAILED_BUILDINGS: 'DETAILED_BUILDINGS', // Phase 4

    // AI & Global Simulation
    NPC_AI_V2: 'NPC_AI_V2',                // Phase 5
    CROWD_500: 'CROWD_500',                // Phase 5
    UTILITY_AI: 'UTILITY_AI',              // Phase 5
    EMOTION_SYSTEM: 'EMOTION_SYSTEM',      // Phase 5

    // Gameplay
    MISSION_SYSTEM: 'MISSION_SYSTEM',      // Phase 6
    COMBAT_SYSTEM: 'COMBAT_SYSTEM',        // Phase 6
    DEESCALATION_ENGINE: 'DEESCALATION_ENGINE', // Phase 6

    // Audio
    AUDIO_V2: 'AUDIO_V2',                  // Phase 7
} as const;

export type FeatureKey = keyof typeof FEATURES;

interface FeatureFlagsState {
    flags: Record<FeatureKey, boolean>;
    setFeature: (key: FeatureKey, enabled: boolean) => void;
    enablePhase: (phase: number) => void;
    resetAll: () => void;
}

// Default State: Safety First (All False)
const DEFAULT_FLAGS: Record<FeatureKey, boolean> = Object.keys(FEATURES).reduce((acc, key) => {
    acc[key as FeatureKey] = false;
    return acc;
}, {} as Record<FeatureKey, boolean>);

// 2. Zustand Store Implementation
export const useFeatureFlags = create<FeatureFlagsState>()(
    persist(
        (set) => ({
            flags: DEFAULT_FLAGS,

            setFeature: (key, enabled) =>
                set((state) => ({
                    flags: { ...state.flags, [key]: enabled },
                })),

            enablePhase: (phase) => {
                set((state) => {
                    const newFlags = { ...state.flags };
                    if (phase >= 2) {
                        newFlags.TIME_SYSTEM = true;
                        newFlags.MULTI_FREQ_LOOP = true;
                        newFlags.SPATIAL_GRID = true;
                        newFlags.FULL_DAYNIGHT_CYCLE = true;
                    }
                    if (phase >= 3) {
                        newFlags.R3F_RENDERER = true;
                        newFlags.AAA_LIGHTING = true;
                        newFlags.PROCEDURAL_TEXTURES = true;
                        newFlags.LOD_SYSTEM = true;
                        newFlags.POST_PROCESSING = true;
                    }
                    if (phase >= 4) {
                        newFlags.WIEN_STEPHANSPLATZ = true;
                        newFlags.DETAILED_BUILDINGS = true;
                    }
                    if (phase >= 5) {
                        newFlags.NPC_AI_V2 = true;
                        newFlags.CROWD_500 = true;
                        newFlags.UTILITY_AI = true;
                        newFlags.EMOTION_SYSTEM = true;
                    }
                    if (phase >= 6) {
                        newFlags.MISSION_SYSTEM = true;
                        newFlags.COMBAT_SYSTEM = true;
                        newFlags.DEESCALATION_ENGINE = true;
                    }
                    if (phase >= 7) {
                        newFlags.AUDIO_V2 = true;
                    }
                    return { flags: newFlags };
                });
            },

            resetAll: () => set({ flags: DEFAULT_FLAGS }),
        }),
        {
            name: 'corona-control-feature-flags', // LocalStorage Key
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// 3. Helper Hook for Components
export const useFeature = (key: FeatureKey): boolean => {
    const flags = useFeatureFlags((state) => state.flags);
    return flags[key] ?? false;
};

// 4. Helper for Logic (Non-React)
export const getFeatureState = (key: FeatureKey): boolean => {
    return useFeatureFlags.getState().flags[key] ?? false;
};
