import { describe, it, expect } from 'vitest';
import { MISSION_TEMPLATES } from '@/constants/GameBalance';

describe('MISSION_TEMPLATES mapping', () => {
  it('contains all MissionType keys', () => {
    const keys = Object.keys(MISSION_TEMPLATES);
    expect(keys.sort()).toEqual(['REACH_TARGET','DISPERSE_RIOTERS','SURVIVE'].sort());
  });

  it('provides template definitions for each mission type', () => {
    for (const k of ['REACH_TARGET','DISPERSE_RIOTERS','SURVIVE']) {
      const tpl = (MISSION_TEMPLATES as any)[k];
      expect(typeof tpl.description).toBe('string');
      expect(['COUNT','SECONDS']).toContain(tpl.progressUnit);
    }
  });
});

