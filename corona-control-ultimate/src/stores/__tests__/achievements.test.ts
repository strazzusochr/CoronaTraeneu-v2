import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useGameStore } from '@/stores/gameStore';
import { useNotificationStore } from '@/stores/notificationStore';

describe('Achievements in GameStore', () => {
  const notifySpy = vi.fn();

  beforeEach(() => {
    useGameStore.setState(state => ({ ...state, achievements: [] }));
    useNotificationStore.setState(state => ({ ...state, addNotification: notifySpy }));
    notifySpy.mockClear();
  });

  it('unlockAchievement adds id and notifies', () => {
    useGameStore.getState().unlockAchievement('ACH_001');
    const ids = useGameStore.getState().achievements;
    expect(ids.includes('ACH_001')).toBe(true);
    expect(notifySpy).toHaveBeenCalled();
  });

  it('hasAchievement returns true for unlocked id', () => {
    useGameStore.getState().unlockAchievement('ACH_002');
    const has = useGameStore.getState().hasAchievement('ACH_002');
    expect(has).toBe(true);
  });
});
