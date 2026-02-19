import { describe, it, expect } from 'vitest';
import { CUTSCENES } from '@/constants/GameBalance';
import type { CutsceneId } from '@/types/enums';

describe('CUTSCENES mapping', () => {
  it('contains all required categories', () => {
    expect(CUTSCENES.intro).toBeDefined();
    expect(CUTSCENES.outros).toBeDefined();
    expect(CUTSCENES.briefings).toBeDefined();
  });

  it('maps all defined CutsceneId values exactly once', () => {
    const all: CutsceneId[] = [
      ...CUTSCENES.intro,
      CUTSCENES.outros.S,
      CUTSCENES.outros.A,
      CUTSCENES.outros.B,
      CUTSCENES.outros.C,
      CUTSCENES.outros.D,
      CUTSCENES.outros.F,
      ...CUTSCENES.briefings,
    ];
    const unique = new Set(all);
    expect(all.length).toBe(8);
    expect(unique.size).toBe(8);
  });
});

