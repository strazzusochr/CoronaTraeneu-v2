import { describe, it, expect, beforeEach, vi } from 'vitest';
import CrowdSystem from '../CrowdSystem';
import { useGameStore } from '@/stores/gameStore';
import { FlowFieldSystem } from '../FlowFieldSystem';

vi.mock('@/stores/gameStore', () => ({
    useGameStore: {
        getState: vi.fn()
    }
}));

const calculateFlowField = vi.fn();

vi.mock('../FlowFieldSystem', () => ({
    FlowFieldSystem: {
        getInstance: () => ({
            calculateFlowField
        })
    }
}));

describe('CrowdSystem', () => {
    beforeEach(() => {
        vi.mocked(useGameStore.getState).mockReset();
        calculateFlowField.mockReset();
        (CrowdSystem.getInstance() as any).resetForTests();
    });

    it('should insert NPCs into the spatial grid and return them as neighbors', () => {
        vi.mocked(useGameStore.getState).mockReturnValue({
            npcs: [
                {
                    id: 1,
                    position: [0, 0, 0],
                    velocity: [1, 0, 0],
                    type: 'RIOTER'
                }
            ],
            player: {
                position: [0, 0, 0]
            }
        });

        vi.spyOn(Date, 'now').mockReturnValue(0);

        const system = CrowdSystem.getInstance();
        system.update(0.016);

        const neighbors = system.getNeighbors(0, 0, 5);
        expect(neighbors.length).toBe(1);
        expect(neighbors[0].id).toBe(1);
    });

    it('should throttle flow field updates based on time interval', () => {
        vi.mocked(useGameStore.getState).mockReturnValue({
            npcs: [],
            player: {
                position: [10, 0, 20]
            }
        });

        const nowSpy = vi.spyOn(Date, 'now');

        nowSpy.mockReturnValue(0);
        const system = CrowdSystem.getInstance();
        system.update(0.016);
        expect(calculateFlowField).toHaveBeenCalledTimes(1);

        nowSpy.mockReturnValue(50);
        system.update(0.016);
        expect(calculateFlowField).toHaveBeenCalledTimes(1);

        nowSpy.mockReturnValue(150);
        system.update(0.016);
        expect(calculateFlowField).toHaveBeenCalledTimes(2);

        nowSpy.mockRestore();
    });
});
