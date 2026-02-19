import { describe, it, expect } from 'vitest';
import { DIALOGS } from '@/constants/GameBalance';

describe('DIALOGS registry', () => {
  it('contains known dialog IDs', () => {
    expect(DIALOGS.includes('krause_confrontation')).toBe(true);
  });

  it('contains unique IDs', () => {
    const set = new Set(DIALOGS);
    expect(set.size).toBe(DIALOGS.length);
  });
});

