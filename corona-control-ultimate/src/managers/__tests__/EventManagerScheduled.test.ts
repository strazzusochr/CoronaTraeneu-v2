import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EventManager } from '../EventManager';
import AudioManager from '../AudioManager';
import { useNotificationStore } from '@/stores/notificationStore';
import { useGameStore } from '@/stores/gameStore';

vi.mock('@/core/TimeEngine', () => ({
  useTimeEngine: {
    getState: () => ({ gameTimeSeconds: 14 * 3600 + 10 * 60 })
  }
}));

describe('EventManager scheduled events', () => {
  const sfxSpy = vi.fn();
  const notifySpy = vi.fn();

  beforeEach(() => {
    vi.spyOn(AudioManager as any, 'playSfx').mockImplementation(sfxSpy as any);
    useNotificationStore.setState(state => ({ ...state, addNotification: notifySpy }));
    sfxSpy.mockClear();
    notifySpy.mockClear();
    useGameStore.setState(state => ({
      ...state,
      gameState: { ...state.gameState, activePrompt: null }
    }));
  });

  it('triggers speech_start at 14:10 with audio and notification', () => {
    const mgr = EventManager.getInstance();
    mgr.update();

    expect(sfxSpy).toHaveBeenCalled();
    expect(notifySpy).toHaveBeenCalled();
    const prompt = useGameStore.getState().gameState.activePrompt;
    expect(typeof prompt).toBe('string');
    expect(prompt).not.toBeNull();
  });
});
