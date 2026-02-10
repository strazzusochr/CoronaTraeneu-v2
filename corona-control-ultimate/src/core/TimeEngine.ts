import { create } from 'zustand';
import { getFeatureState } from './FeatureFlags';

/**
 * V7.0 HYPER AAA TIME ENGINE
 * Responsibility: Central deterministic heart of the simulation.
 * Scale: 1:60 (1 real second = 1 game minute).
 * Precision: Millisecond-safe, Clamped Delta (max 0.1s real).
 */

interface TimeState {
    gameTimeSeconds: number; // 0.0 to 86400.0
    timeScale: number;      // default 60.0
    deltaTime: number;      // Scaled game delta
    realDeltaTime: number;  // Clamped real delta
    isPaused: boolean;
    frameCount: number;

    // Actions
    tick: (realDelta: number) => void;
    setPaused: (paused: boolean) => void;
    setTimeScale: (scale: number) => void;
    setGameTime: (seconds: number) => void;
}

const INITIAL_TIME = 6 * 3600; // Default: 06:00 (Dawn)

export const useTimeEngine = create<TimeState>((set, get) => ({
    gameTimeSeconds: INITIAL_TIME,
    timeScale: 60.0,
    deltaTime: 0,
    realDeltaTime: 0,
    isPaused: false,
    frameCount: 0,

    tick: (realDelta: number) => {
        if (get().isPaused || !getFeatureState('TIME_SYSTEM')) return;

        // 1. Clamping to prevent physics tunneling or "teleportation"
        const clampedDelta = Math.min(realDelta, 0.1);

        // 2. Logic: 1s real = timeScale game seconds
        // At 60x: 1s real = 60s game = 1 minute game
        const scaledDelta = clampedDelta * get().timeScale;
        let nextTime = get().gameTimeSeconds + scaledDelta;

        // 3. 24h Wrap-around
        if (nextTime >= 86400) {
            nextTime -= 86400;
        }

        set(state => ({
            gameTimeSeconds: nextTime,
            deltaTime: scaledDelta,
            realDeltaTime: clampedDelta,
            frameCount: state.frameCount + 1
        }));
    },

    setPaused: (paused) => set({ isPaused: paused }),
    setTimeScale: (scale) => set({ timeScale: scale }),
    setGameTime: (seconds) => set({ gameTimeSeconds: seconds % 86400 })
}));

// Utility exports for deterministic access
export const getGameTime = () => useTimeEngine.getState().gameTimeSeconds;
export const getGameDelta = () => useTimeEngine.getState().deltaTime;
export const getRealDelta = () => useTimeEngine.getState().realDeltaTime;

export const formatGameTime = (seconds?: number) => {
    const s = seconds ?? useTimeEngine.getState().gameTimeSeconds;
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sc = Math.floor(s % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sc.toString().padStart(2, '0')}`;
};
