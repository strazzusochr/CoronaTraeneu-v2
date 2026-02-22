import { describe, it, expect, beforeEach, vi } from 'vitest';
import TensionSystem from '../TensionSystem';
import { useGameStore } from '@/stores/gameStore';
import GameEventSystem from '@/systems/GameEventSystem';

// Mock Store
const tensionSetter = vi.fn();
const waveSpawner = vi.fn();

vi.mock('@/stores/gameStore', () => ({
    useGameStore: {
        getState: vi.fn(() => ({
            tensionLevel: 50,
            moralLevel: 50,
            setTension: tensionSetter,
            spawnWave: waveSpawner,
            setPrompt: vi.fn(),
            activeQuests: [] // Mock other needed properties
        }))
    }
}));

describe('TensionSystem', () => {
    beforeEach(() => {
        tensionSetter.mockClear();
        waveSpawner.mockClear();
        (TensionSystem as any).resetForTests?.();
        GameEventSystem.getInstance().clear();
    });

    it('should decay tension over time', () => {
        vi.mocked(useGameStore.getState).mockReturnValue({
            tensionLevel: 50,
            moralLevel: 50,
            setTension: tensionSetter,
            spawnWave: waveSpawner,
            setPrompt: vi.fn(),
            npcs: []
        } as any);

        TensionSystem.update(1.0);

        expect(tensionSetter).toHaveBeenCalled();
        const callArg = tensionSetter.mock.calls[0][0];
        expect(callArg).toBeLessThan(50);
        expect(callArg).toBeCloseTo(49.5, 1);
    });

    it('should not decay below 0', () => {
        vi.mocked(useGameStore.getState).mockReturnValue({
            tensionLevel: 0.1,
            moralLevel: 50,
            setTension: tensionSetter,
            spawnWave: waveSpawner,
            setPrompt: vi.fn(),
            npcs: []
        } as any);

        TensionSystem.update(1.0);

        expect(tensionSetter).toHaveBeenCalled();
        expect(tensionSetter.mock.calls[0][0]).toBeGreaterThanOrEqual(0);
    });

    it('should increase tension when many events occur', () => {
        const now = 100000;
        const nowSpy = vi.spyOn(Date, 'now').mockReturnValue(now);

        vi.mocked(useGameStore.getState).mockReturnValue({
            tensionLevel: 50,
            moralLevel: 50,
            setTension: tensionSetter,
            spawnWave: waveSpawner,
            setPrompt: vi.fn(),
            npcs: []
        } as any);

        const eventSystem = GameEventSystem.getInstance();
        eventSystem.clear();

        for (let i = 0; i < 6; i++) {
            eventSystem.emit({
                type: 'AUDIO',
                position: [0, 0, 0],
                sourceId: i,
                intensity: 1,
                timestamp: now - 50,
                tags: []
            } as any);
        }

        TensionSystem.update(1.0);

        expect(tensionSetter).toHaveBeenCalled();
        const value = tensionSetter.mock.calls[0][0];
        expect(value).toBeGreaterThan(50);

        nowSpy.mockRestore();
    });
});
