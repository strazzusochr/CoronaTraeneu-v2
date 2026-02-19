import { describe, it, expect } from 'vitest';
import { VOICE_SUBTITLES } from '@/constants/GameBalance';
import type { VoiceLineId } from '@/types/enums';

describe('VOICE_SUBTITLES mapping', () => {
  it('contains all defined VoiceLineId values exactly once', () => {
    const keys = Object.keys(VOICE_SUBTITLES) as VoiceLineId[];
    expect(keys.length).toBe(15);
    const unique = new Set(keys);
    expect(unique.size).toBe(15);
  });

  it('each entry has text and valid durationMs', () => {
    for (const [key, val] of Object.entries(VOICE_SUBTITLES)) {
      expect(typeof val.text).toBe('string');
      expect(val.text.length).toBeGreaterThan(0);
      expect(typeof val.durationMs).toBe('number');
      expect(val.durationMs).toBeGreaterThan(0);
    }
  });
});

