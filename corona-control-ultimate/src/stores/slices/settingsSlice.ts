import { RenderTier, AudioBus } from '@/types/enums';
import type { StateCreator } from 'zustand';
import type { GameStore } from '../types';

export const createSettingsSlice: StateCreator<GameStore, [], [], Pick<GameStore, 'settings' | 'setVolume' | 'setGraphicsQuality' | 'openSettings' | 'closeSettings'>> = (set) => ({
    settings: {
        masterVolume: 1.0,
        musicVolume: 0.5,
        sfxVolume: 1.0,
        voiceVolume: 1.0,
        useHRTF: true,
        graphicsQuality: RenderTier.MEDIUM,
        colorblindMode: 'NONE',
        ttsEnabled: false,
        largeTextEnabled: false
    },

    setVolume: (bus, value) => set((state) => {
        const newSettings = { ...state.settings };
        if (bus === AudioBus.MASTER) newSettings.masterVolume = value;
        if (bus === AudioBus.MUSIC) newSettings.musicVolume = value;
        if (bus === AudioBus.SFX) newSettings.sfxVolume = value;
        if (bus === AudioBus.VOICE) newSettings.voiceVolume = value;
        return { settings: newSettings };
    }),

    setGraphicsQuality: (quality) => set((state) => ({
        settings: { ...state.settings, graphicsQuality: quality }
    })),

    openSettings: () => set((state) => ({
        gameState: {
            ...state.gameState,
            menuState: 'SETTINGS',
            previousMenuState: state.gameState.menuState as 'MAIN' | 'PLAYING' | 'PAUSED',
            isPlaying: false
        }
    })),

    closeSettings: () => set((state) => {
        const prev = state.gameState.previousMenuState || 'MAIN';
        return {
            gameState: {
                ...state.gameState,
                menuState: prev,
                isPlaying: prev === 'PLAYING'
            }
        };
    }),
});
