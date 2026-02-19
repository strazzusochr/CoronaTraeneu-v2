import { describe, it, expect } from 'vitest';
import { DYNAMIC_EVENTS } from '@/constants/GameBalance';

describe('DYNAMIC_EVENTS registry', () => {
  it('contains exactly 10 dynamic events', () => {
    const keys = Object.keys(DYNAMIC_EVENTS);
    expect(keys.length).toBe(10);
    const unique = new Set(keys);
    expect(unique.size).toBe(10);
  });

  it('all entries have description and valid source', () => {
    Object.values(DYNAMIC_EVENTS).forEach(evt => {
      expect(typeof evt.description).toBe('string');
      expect(evt.description.length).toBeGreaterThan(0);
      expect(['TIMELINE', 'EVENT_MANAGER']).toContain(evt.source);
    });
  });
});

