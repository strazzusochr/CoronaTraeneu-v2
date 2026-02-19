import { describe, it, expect, beforeEach, vi } from 'vitest';
import DayNightCycleSystem from '../DayNightCycleSystem';
import { useGameStore } from '@/stores/gameStore';
import * as TimeEngine from '@/core/TimeEngine';

const setPrompt = vi.fn();

vi.mock('@/stores/gameStore', () => ({
    useGameStore: {
        getState: vi.fn(() => ({
            setPrompt
        }))
    }
}));

describe('DayNightCycleSystem', () => {
    beforeEach(() => {
        setPrompt.mockReset();
        (DayNightCycleSystem as any).resetForTests?.();
    });

    it('triggers sunrise prompt at 06:00', () => {
        const spy = vi.spyOn(TimeEngine, 'getGameTime').mockReturnValue(360 * 60);
        DayNightCycleSystem.update(0.1);
        expect(setPrompt).toHaveBeenCalled();
        spy.mockRestore();
    });

    it('triggers noon escalation at 12:00', () => {
        const spy = vi.spyOn(TimeEngine, 'getGameTime').mockReturnValue(720 * 60);
        DayNightCycleSystem.update(0.1);
        expect(setPrompt).toHaveBeenCalled();
        spy.mockRestore();
    });
});
