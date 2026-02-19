import { describe, it, expect } from 'vitest';
import { UI_ASSETS } from '@/constants/GameBalance';

describe('UI_ASSETS mapping', () => {
  it('contains all required categories', () => {
    expect(UI_ASSETS.badges).toBeDefined();
    expect(UI_ASSETS.iconsHUD).toBeDefined();
    expect(UI_ASSETS.iconsMenu).toBeDefined();
    expect(UI_ASSETS.frames).toBeDefined();
  });

  it('maps all UiAssetId values exactly once', () => {
    const all = [
      ...UI_ASSETS.badges,
      ...UI_ASSETS.iconsHUD,
      ...UI_ASSETS.iconsMenu,
      ...UI_ASSETS.frames,
    ];
    const unique = new Set(all);
    expect(all.length).toBe(19);
    expect(unique.size).toBe(19);
  });
});

