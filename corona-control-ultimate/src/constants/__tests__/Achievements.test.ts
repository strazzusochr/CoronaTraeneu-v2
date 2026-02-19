import { describe, it, expect } from 'vitest';
import { ACHIEVEMENTS } from '@/constants/GameBalance';
import type { AchievementId } from '@/types/enums';

describe('ACHIEVEMENTS mapping', () => {
  it('contains all required categories', () => {
    expect(ACHIEVEMENTS.tutorial).toBeDefined();
    expect(ACHIEVEMENTS.combat).toBeDefined();
    expect(ACHIEVEMENTS.crowd).toBeDefined();
    expect(ACHIEVEMENTS.exploration).toBeDefined();
    expect(ACHIEVEMENTS.progress).toBeDefined();
  });

  it('maps all defined AchievementId values exactly once', () => {
    const all = [
      ...ACHIEVEMENTS.tutorial,
      ...ACHIEVEMENTS.combat,
      ...ACHIEVEMENTS.crowd,
      ...ACHIEVEMENTS.exploration,
      ...ACHIEVEMENTS.progress,
    ];
    const unique = new Set(all as AchievementId[]);
    expect(all.length).toBe(55);
    expect(unique.size).toBe(55);
  });
});

