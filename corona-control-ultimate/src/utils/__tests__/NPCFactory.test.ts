import { describe, it, expect } from 'vitest';
import npcFactory from '@/utils/NPCFactory';
import { GAME_BALANCE } from '@/constants/GameBalance';

describe('NPCFactory', () => {
    it('uses centralized GameBalance stats for police base relation', () => {
        const attrs = npcFactory.generateAttributes(1, 'POLICE');
        expect(attrs.faction).toBe('POLICE');
        expect(attrs.behavior.relationshipScore).toBe(GAME_BALANCE.npc.police.baseRelation);
    });
});
