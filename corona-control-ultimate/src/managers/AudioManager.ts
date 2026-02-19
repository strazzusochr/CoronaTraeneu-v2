/**
 * V6.0 AUDIO MANAGER
 * 
 * Hierarchy:
 * 1. Ambient (-30dB) - City background
 * 2. Environmental (-20dB) - Cars, birds
 * 3. Crowd (-15dB) - Shouts, chants
 * 4. Events (-10dB) - Sirens, impacts, dialog
 */

import { EngineLoop } from '@/core/EngineLoopManager';
import type { SfxId, VoiceLineId } from '@/types/enums';
import { AUDIO_LAYERS, AUDIO_LAYER_TO_BUS } from '@/constants/GameBalance';
import { useGameStore } from '@/stores/gameStore';

export enum AudioLayer {
    AMBIENT = 'AMBIENT',
    ENVIRONMENTAL = 'ENVIRONMENTAL',
    CROWD = 'CROWD',
    EVENT = 'EVENT',
    MUSIC = 'MUSIC'
}

export class AudioManager {
    private static instance: AudioManager;
    private volumes: Record<AudioLayer, number> = {
        [AudioLayer.AMBIENT]: AUDIO_LAYERS.defaults.AMBIENT,
        [AudioLayer.ENVIRONMENTAL]: AUDIO_LAYERS.defaults.ENVIRONMENTAL,
        [AudioLayer.CROWD]: AUDIO_LAYERS.defaults.CROWD,
        [AudioLayer.EVENT]: AUDIO_LAYERS.defaults.EVENT,
        [AudioLayer.MUSIC]: AUDIO_LAYERS.defaults.MUSIC
    };

    private audioCache: Map<string, HTMLAudioElement> = new Map();
    private activeSounds: Set<{ audio: HTMLAudioElement, layer: AudioLayer, pos?: [number, number, number], baseVolume: number }> = new Set();

    private constructor() {
        // AI Loop für Audio-Updates nutzen (z.B. Panning, Entfernung)
        EngineLoop.onAIUpdate(this.update.bind(this));
        console.log("🔊 AUDIO MANAGER INITIALIZED (Phase 13)");
    }

    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    public playSound(id: string, layer: AudioLayer, options: Partial<{ pos: [number, number, number], loop: boolean, volume: number }> = {}) {
        const { pos, loop = false, volume = 1.0 } = options;
        console.log(`[AudioManager] Spiele Sound: ${id} auf Layer: ${layer} ${pos ? `bei (${pos[0]}, ${pos[2]})` : ''}`);

        const settings = useGameStore.getState().settings ?? {
            masterVolume: 1,
            musicVolume: 1,
            sfxVolume: 1,
            voiceVolume: 1,
            ambientVolume: 1
        };
        const bus = AUDIO_LAYER_TO_BUS[layer];
        const busVolume = bus === 'MUSIC' ? settings.musicVolume
                          : bus === 'SFX' ? settings.sfxVolume
                          : bus === 'VOICE' ? settings.voiceVolume
                          : bus === 'AMBIENT' ? settings.masterVolume
                          : settings.masterVolume;
        const master = settings.masterVolume;
        const base = this.volumes[layer] * volume * busVolume * master;
        const capped = Math.min(AUDIO_LAYERS.caps[layer], base);

        const mockAudio = {
            play: () => {},
            pause: () => {
                this.activeSounds.forEach(s => {
                    if (s.audio === mockAudio) this.activeSounds.delete(s);
                });
            },
            volume: capped,
            loop: loop
        } as unknown as HTMLAudioElement;

        this.activeSounds.add({ audio: mockAudio, layer, pos, baseVolume: volume });
        return mockAudio;
    }

    public playSfx(id: SfxId, layer: AudioLayer, options: Partial<{ pos: [number, number, number], loop: boolean, volume: number }> = {}) {
        return this.playSound(id, layer, options);
    }

    public playVoice(id: VoiceLineId, options: Partial<{ pos: [number, number, number], loop: boolean, volume: number }> = {}) {
        const audio = this.playSound(id, AudioLayer.EVENT, options);
        const sub = (require('@/constants/GameBalance') as any).VOICE_SUBTITLES?.[id];
        if (sub) {
            const text = sub.speaker ? `${sub.speaker}: ${sub.text}` : sub.text;
            useGameStore.getState().setPrompt(text);
            setTimeout(() => {
                const currentPrompt = useGameStore.getState().gameState.activePrompt;
                if (currentPrompt === text) {
                    useGameStore.getState().setPrompt(null);
                }
            }, sub.durationMs);
        }
        return audio;
    }

    public update(delta: number) {
        // V7.0 Spatial Audio Simulation
        const playerPos = [0, 0, 0]; // TODO: Player-Position aus Store holen

        const settings = useGameStore.getState().settings ?? {
            masterVolume: 1,
            musicVolume: 1,
            sfxVolume: 1,
            voiceVolume: 1,
            ambientVolume: 1
        };
        const master = settings.masterVolume;
        this.activeSounds.forEach(sound => {
            if (sound.pos) {
                const dx = sound.pos[0] - playerPos[0];
                const dz = sound.pos[2] - playerPos[2];
                const distance = Math.sqrt(dx * dx + dz * dz);
                
                // Volume-Dämpfung (Inverse Square Law simplified)
                const falloff = 1 / (1 + distance * 0.05);
                const bus = AUDIO_LAYER_TO_BUS[sound.layer];
                const busVolume = bus === 'MUSIC' ? settings.musicVolume
                                  : bus === 'SFX' ? settings.sfxVolume
                                  : bus === 'VOICE' ? settings.voiceVolume
                                  : bus === 'AMBIENT' ? settings.masterVolume
                                  : settings.masterVolume;
                const base = this.volumes[sound.layer] * sound.baseVolume * busVolume * master * falloff;
                sound.audio.volume = Math.min(AUDIO_LAYERS.caps[sound.layer], base);
            }
        });
    }

    public setGlobalVolume(layer: AudioLayer, volume: number) {
        this.volumes[layer] = Math.max(0, Math.min(1, volume));
        console.log(`[AudioManager] Volume für ${layer} auf ${volume} gesetzt.`);
    }
}

export default AudioManager.getInstance();
