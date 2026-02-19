import { describe, it, expect } from 'vitest';
import { GAME_BALANCE } from '@/constants/GameBalance';

describe('GAME_BALANCE weapons', () => {
    it('defines water cannon parameters', () => {
        const wc = GAME_BALANCE.weapons.waterCannon;
        expect(wc.force).toBe(20);
        expect(wc.gravity).toBeCloseTo(4.905, 5);
        expect(wc.hitRadius).toBe(1.5);
        expect(wc.verticalTolerance).toBe(2);
        expect(wc.stressIncrease).toBeCloseTo(0.1, 5);
        expect(wc.aggressionReduction).toBeCloseTo(0.2, 5);
    });

    it('defines deescalation parameters', () => {
        const d = GAME_BALANCE.weapons.deescalation;
        expect(d.activeIntensity).toBe(10);
        expect(d.passiveRelationRecoveryRate).toBeCloseTo(2.0, 5);
        expect(d.passiveAggressionCoolRate).toBeCloseTo(0.05, 5);
    });
});

