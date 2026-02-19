import { describe, it, expect } from 'vitest';
import { OBJECTIVE_TEMPLATES } from '@/constants/GameBalance';

describe('OBJECTIVE_TEMPLATES mapping', () => {
  it('contains all ObjectiveType keys', () => {
    const keys = Object.keys(OBJECTIVE_TEMPLATES);
    expect(keys.sort()).toEqual(['KILL','COLLECT','TALK','GOTO','PROTECT','WAIT'].sort());
  });

  it('provides template strings for each type', () => {
    for (const k of ['KILL','COLLECT','TALK','GOTO','PROTECT','WAIT']) {
      const tpl = (OBJECTIVE_TEMPLATES as any)[k];
      expect(typeof tpl).toBe('string');
      expect(tpl.length).toBeGreaterThan(0);
    }
  });
});

