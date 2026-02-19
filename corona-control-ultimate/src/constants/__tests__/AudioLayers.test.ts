import { describe, it, expect } from 'vitest';
import { AUDIO_LAYERS, AUDIO_LAYER_TO_BUS } from '@/constants/GameBalance';

describe('AUDIO_LAYERS defaults and caps', () => {
  it('contains all audio layers in defaults and caps', () => {
    const layers = ['AMBIENT','ENVIRONMENTAL','CROWD','EVENT','MUSIC'];
    expect(Object.keys(AUDIO_LAYERS.defaults).sort()).toEqual(layers.sort());
    expect(Object.keys(AUDIO_LAYERS.caps).sort()).toEqual(layers.sort());
  });

  it('caps values are within [0,1]', () => {
    for (const [k, v] of Object.entries(AUDIO_LAYERS.caps)) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });
});

describe('AUDIO_LAYER_TO_BUS mapping', () => {
  it('contains all audio layers mapped to known buses', () => {
    const layers = ['AMBIENT','ENVIRONMENTAL','CROWD','EVENT','MUSIC'];
    expect(Object.keys(AUDIO_LAYER_TO_BUS).sort()).toEqual(layers.sort());
    const validBuses = new Set(['MASTER','MUSIC','SFX','VOICE','AMBIENT']);
    for (const v of Object.values(AUDIO_LAYER_TO_BUS)) {
      expect(validBuses.has(v as any)).toBe(true);
    }
  });
});

