import { describe, it, expect, vi } from 'vitest';
import { updateNPCBehavior } from '@/systems/ai/NPCBehavior';
import { GAME_BALANCE } from '@/constants/GameBalance';
import { EmotionalState, Faction, NPCState, NPCType } from '@/types/enums';
import type { NPCData } from '@/types/interfaces';

describe('NPCBehavior', () => {
    const baseNpc: NPCData = {
        id: 1,
        type: NPCType.CIVILIAN,
        state: NPCState.IDLE,
        faction: Faction.CIVILIAN,
        position: [0, 0, 0],
        velocity: [0, 0, 0],
        rotation: 0,
        hairColor: '#000000',
        outfitId: 'test',
        emotions: {
            current: EmotionalState.NEUTRAL,
            stress: 0,
            aggression: 0,
            fear: 0,
        },
        lodLevel: 0,
    };

    const withTarget = (npc: NPCData): NPCData & { target: [number, number, number] } => ({
        ...(npc as any),
        target: [1, 0, 0],
    });

    it('uses GameBalance speeds for rioters, police and civilians', () => {
        const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(1);

        const delta = 1;

        const rioter = { ...baseNpc, id: 2, type: NPCType.RIOTER, faction: Faction.RIOTER };
        const police = { ...baseNpc, id: 3, type: NPCType.POLICE, faction: Faction.POLICE };
        const civilian = { ...baseNpc, id: 4, type: NPCType.CIVILIAN, faction: Faction.CIVILIAN };

        const rioterUpdated = updateNPCBehavior(withTarget(rioter), delta);
        const policeUpdated = updateNPCBehavior(withTarget(police), delta);
        const civilianUpdated = updateNPCBehavior(withTarget(civilian), delta);

        const dist = (p: [number, number, number]) =>
            Math.hypot(p[0] - 0, p[2] - 0);

        expect(dist(rioterUpdated.position)).toBeCloseTo(GAME_BALANCE.npc.rioter.walkSpeed, 5);
        expect(dist(policeUpdated.position)).toBeCloseTo(GAME_BALANCE.npc.police.walkSpeed, 5);
        expect(dist(civilianUpdated.position)).toBeCloseTo(GAME_BALANCE.npc.civilian.walkSpeed, 5);

        randomSpy.mockRestore();
    });
});
