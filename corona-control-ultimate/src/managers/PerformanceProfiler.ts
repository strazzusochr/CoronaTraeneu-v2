import { create } from 'zustand';

/**
 * V6 PERFORMANCE PROFILER
 * 
 * BUDGETS:
 * Warning: 14ms
 * Error: 20ms
 * 
 * DEGRADATION LEVELS:
 * ULTRA -> HIGH -> MEDIUM -> LOW
 */

export enum OptimizationLevel {
    ULTRA = 0,
    HIGH = 1,
    MEDIUM = 2,
    LOW = 3
}

interface PerformanceState {
    fps: number;
    frameTimeMs: number;
    level: OptimizationLevel;

    updateMetrics: (dt: number) => void;
    setLevel: (level: OptimizationLevel) => void;
}

export const usePerformanceProfiler = create<PerformanceState>((set, get) => ({
    fps: 60,
    frameTimeMs: 16.6,
    level: OptimizationLevel.ULTRA,

    updateMetrics: (realDelta: number) => {
        const ms = realDelta * 1000;
        const currentFPS = 1 / realDelta;

        // Rolling average (rough)
        set(state => ({
            frameTimeMs: state.frameTimeMs * 0.9 + ms * 0.1,
            fps: Math.round(state.fps * 0.9 + currentFPS * 0.1)
        }));

        // Emergency Optimization Logic (V6 Spec)
        const avgMs = get().frameTimeMs;
        if (avgMs > 20 && get().level < OptimizationLevel.LOW) {
            console.warn("[Profiler] 🚨 EMERGENCY OPTIMIZATION: Critical Frame Time", avgMs);
            get().setLevel(OptimizationLevel.LOW);
        } else if (avgMs > 14 && get().level < OptimizationLevel.MEDIUM) {
            console.warn("[Profiler] ⚠️ SOFT OPTIMIZATION: Frame Time Warning", avgMs);
            get().setLevel(OptimizationLevel.MEDIUM);
        }
    },

    setLevel: (level) => set({ level })
}));
