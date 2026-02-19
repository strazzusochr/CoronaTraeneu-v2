import { describe, it, expect } from 'vitest';
import { PLAYER_ANIMATIONS } from '@/constants/GameBalance';

describe('PLAYER_ANIMATIONS mapping', () => {
  it('contains all required categories', () => {
    expect(PLAYER_ANIMATIONS.MOVEMENT).toBeDefined();
    expect(PLAYER_ANIMATIONS.COMBAT).toBeDefined();
    expect(PLAYER_ANIMATIONS.INTERACTION).toBeDefined();
    expect(PLAYER_ANIMATIONS.VEHICLE).toBeDefined();
    expect(PLAYER_ANIMATIONS.REACTION).toBeDefined();
    expect(PLAYER_ANIMATIONS.EMOTION).toBeDefined();
  });

  it('maps exactly 85 unique animations across categories', () => {
    const all = [
      ...PLAYER_ANIMATIONS.MOVEMENT,
      ...PLAYER_ANIMATIONS.COMBAT,
      ...PLAYER_ANIMATIONS.INTERACTION,
      ...PLAYER_ANIMATIONS.VEHICLE,
      ...PLAYER_ANIMATIONS.REACTION,
      ...PLAYER_ANIMATIONS.EMOTION,
    ];
    const unique = new Set(all);
    expect(all.length).toBe(85);
    expect(unique.size).toBe(85);
  });
});
