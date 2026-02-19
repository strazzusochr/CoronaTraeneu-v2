import { describe, it, expect } from 'vitest';
import { VOICE_LINES } from '@/constants/GameBalance';

describe('VOICE_LINES mapping', () => {
  it('contains core speaker categories', () => {
    expect(VOICE_LINES.police).toBeDefined();
    expect(VOICE_LINES.rioters).toBeDefined();
    expect(VOICE_LINES.civilians).toBeDefined();
    expect(VOICE_LINES.system).toBeDefined();
  });

  it('maps all VoiceLineId values exactly once', () => {
    const all = [
      ...VOICE_LINES.police,
      ...VOICE_LINES.rioters,
      ...VOICE_LINES.civilians,
      ...VOICE_LINES.system,
    ];

    const unique = new Set(all);

    expect(all.length).toBe(15);
    expect(unique.size).toBe(15);
  });
});

