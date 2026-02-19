import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTimeEngine } from '@/core/TimeEngine';
import { EventManager } from '../EventManager';
import { useGameStore } from '@/stores/gameStore';
import { useNotificationStore } from '@/stores/notificationStore';

const setPrompt = vi.fn();
const addNotification = vi.fn();

vi.mock('@/stores/gameStore', () => ({
    useGameStore: {
        getState: vi.fn(() => ({
            setPrompt,
            setTension: vi.fn()
        }))
    }
}));

vi.mock('@/stores/notificationStore', () => ({
    useNotificationStore: {
        getState: vi.fn(() => ({
            addNotification
        }))
    }
}));

vi.mock('@/managers/AudioManager', () => ({
    default: {
        playSfx: () => {}
    },
    AudioLayer: {
        CROWD: 'CROWD',
        EVENT: 'EVENT'
    }
}));

describe('EventManager', () => {
    beforeEach(() => {
        setPrompt.mockReset();
        addNotification.mockReset();
    });

    it('triggers scheduled event at 14:00', () => {
        useTimeEngine.setState({ gameTimeSeconds: 14 * 3600 });
        EventManager.getInstance().update();
        expect(setPrompt).toHaveBeenCalled();
    });

    it('triggers speech event at 14:10', () => {
        useTimeEngine.setState({ gameTimeSeconds: 14 * 3600 + 10 * 60 });
        EventManager.getInstance().update();
        expect(addNotification).toHaveBeenCalled();
    });
});
