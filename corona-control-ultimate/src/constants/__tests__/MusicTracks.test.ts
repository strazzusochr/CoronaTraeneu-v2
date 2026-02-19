import { describe, it, expect } from 'vitest';
import { MUSIC_TRACKS } from '@/constants/GameBalance';

describe('MUSIC_TRACKS mapping', () => {
  it('provides a tension map for all music states', () => {
    expect(MUSIC_TRACKS.tensionMap.AMBIENT).toBeDefined();
    expect(MUSIC_TRACKS.tensionMap.TENSION).toBeDefined();
    expect(MUSIC_TRACKS.tensionMap.COMBAT).toBeDefined();
  });

  it('maps all defined MusicTrackId values exactly once', () => {
    const all = [
      MUSIC_TRACKS.tensionMap.AMBIENT,
      MUSIC_TRACKS.tensionMap.TENSION,
      MUSIC_TRACKS.tensionMap.COMBAT,
      MUSIC_TRACKS.menu.main,
      MUSIC_TRACKS.menu.settings,
      MUSIC_TRACKS.endings.S,
      MUSIC_TRACKS.endings.A,
      MUSIC_TRACKS.endings.B,
      MUSIC_TRACKS.endings.C,
      MUSIC_TRACKS.endings.D,
      MUSIC_TRACKS.endings.F,
      MUSIC_TRACKS.cutscenes.intro,
      MUSIC_TRACKS.cutscenes.outro,
      MUSIC_TRACKS.cutscenes.krause,
      MUSIC_TRACKS.variants.ambientNight,
      MUSIC_TRACKS.variants.tensionLow,
    ];

    const unique = new Set(all);

    expect(all.length).toBe(16);
    expect(unique.size).toBe(16);
  });
});
