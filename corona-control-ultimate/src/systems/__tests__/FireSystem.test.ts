import { describe, it, expect, beforeEach, vi } from 'vitest';
import FireSystem from '../FireSystem';
import { useGameStore } from '@/stores/gameStore';
import { useParticleStore, ParticleType } from '@/components/Effects/ParticleSystem';

const takeDamage = vi.fn();
const setPrompt = vi.fn();
const updateNpc = vi.fn();

vi.mock('@/stores/gameStore', () => ({
    useGameStore: {
        getState: vi.fn(() => ({
            player: { position: [0, 0, 0] },
            npcs: [],
            takeDamage,
            setPrompt,
            updateNpc
        }))
    }
}));

const spawnEffect = vi.fn();

vi.mock('@/components/Effects/ParticleSystem', async (orig) => {
    const mod = await orig();
    return {
        ...mod,
        useParticleStore: {
            getState: () => ({
                spawnEffect
            })
        }
    };
});

describe('FireSystem', () => {
    beforeEach(() => {
        takeDamage.mockReset();
        setPrompt.mockReset();
        updateNpc.mockReset();
        spawnEffect.mockReset();
        (FireSystem as any).resetForTests?.();
        vi.mocked(useGameStore.getState).mockReturnValue({
            player: { position: [0, 0, 0] },
            npcs: [],
            takeDamage,
            setPrompt,
            updateNpc
        } as any);
    });

    it('applies area damage to player within radius', () => {
        FireSystem.spawnFire([0, 0, 0], 5, 2, 5);
        FireSystem.update(1.0);
        expect(takeDamage).toHaveBeenCalledWith(5);
        expect(setPrompt).toHaveBeenCalled();
    });

    it('sets nearby NPCs to FLEE', () => {
        vi.mocked(useGameStore.getState).mockReturnValue({
            player: { position: [10, 0, 10] },
            npcs: [{ id: 1, position: [0, 0, 0], state: 'IDLE' }],
            takeDamage,
            setPrompt,
            updateNpc
        } as any);
        FireSystem.spawnFire([0, 0, 0], 5, 3, 5);
        FireSystem.update(1.0);
        expect(updateNpc).toHaveBeenCalledWith(1, { state: 'FLEE' });
    });

    it('spawns fire particles at defined rate', () => {
        FireSystem.spawnFire([0, 0, 0], 5, 3, 5);
        FireSystem.update(0.1);
        const fireCalls = spawnEffect.mock.calls.filter(c => c[0] === ParticleType.FIRE);
        expect(fireCalls.length).toBeGreaterThanOrEqual(3);
    });
});
