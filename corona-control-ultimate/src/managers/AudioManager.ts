/**
 * V6.0 AUDIO MANAGER
 * 
 * Hierarchy:
 * 1. Ambient (-30dB) - City background
 * 2. Environmental (-20dB) - Cars, birds
 * 3. Crowd (-15dB) - Shouts, chants
 * 4. Events (-10dB) - Sirens, impacts, dialog
 */

export enum AudioLayer {
    AMBIENT = 'AMBIENT',
    ENVIRONMENTAL = 'ENVIRONMENTAL',
    CROWD = 'CROWD',
    EVENT = 'EVENT'
}

export class AudioManager {
    private static volumes: Record<AudioLayer, number> = {
        [AudioLayer.AMBIENT]: 0.1,
        [AudioLayer.ENVIRONMENTAL]: 0.3,
        [AudioLayer.CROWD]: 0.5,
        [AudioLayer.EVENT]: 0.8
    };

    private static audioCache: Map<string, HTMLAudioElement> = new Map();

    public static playSound(id: string, layer: AudioLayer, pos?: [number, number, number]) {
        console.log(`[AudioManager] Spiele Sound: ${id} auf Layer: ${layer} ${pos ? `bei (${pos[0]}, ${pos[2]})` : ''}`);

        // Logic to create/play audio with layer volume
        // If pos exists, calculate pan/volume based on distance to player
    }

    public static setGlobalVolume(layer: AudioLayer, volume: number) {
        this.volumes[layer] = Math.max(0, Math.min(1, volume));
        console.log(`[AudioManager] Volume für ${layer} auf ${volume} gesetzt.`);
    }
}
