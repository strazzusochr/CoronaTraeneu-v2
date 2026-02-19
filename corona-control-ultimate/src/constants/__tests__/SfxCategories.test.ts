import { describe, it, expect } from 'vitest';
import { SFX_CATEGORIES } from '@/constants/GameBalance';

describe('SFX_CATEGORIES mapping', () => {
  it('contains all required categories', () => {
    expect(SFX_CATEGORIES.WEAPONS).toBeDefined();
    expect(SFX_CATEGORIES.NPC).toBeDefined();
    expect(SFX_CATEGORIES.CROWD).toBeDefined();
    expect(SFX_CATEGORIES.ENVIRONMENT).toBeDefined();
    expect(SFX_CATEGORIES.UI).toBeDefined();
    expect(SFX_CATEGORIES.OBJECTIVE).toBeDefined();
  });

  it('maps all SFX IDs exactly once', () => {
    const all = [
      ...SFX_CATEGORIES.WEAPONS,
      ...SFX_CATEGORIES.NPC,
      ...SFX_CATEGORIES.CROWD,
      ...SFX_CATEGORIES.ENVIRONMENT,
      ...SFX_CATEGORIES.UI,
      ...SFX_CATEGORIES.OBJECTIVE,
    ];
    const unique = new Set(all);

    expect(all.length).toBe(20);
    expect(unique.size).toBe(20);
  });
});

