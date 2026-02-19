import { useGameStore } from '@/stores/gameStore';
import AudioManager, { AudioLayer } from './AudioManager';
import { EngineLoop } from '@/core/EngineLoopManager';
import type { MusicTrackId } from '@/types/enums';
import { MUSIC_TRACKS } from '@/constants/GameBalance';

type MusicState = 'AMBIENT' | 'TENSION' | 'COMBAT';

class MusicManager {
    private static instance: MusicManager;
    private currentState: MusicState = 'AMBIENT';
    private lastTensionCheck: number = 0;
    private currentTrack: any = null;
    private currentTrackId: MusicTrackId | null = null;

    private constructor() {
        // Register to AI loop for tension-based music changes
        EngineLoop.onAIUpdate(this.update.bind(this));
        console.log("🎵 MUSIC MANAGER INITIALIZED (Phase 13)");
    }

    public static getInstance(): MusicManager {
        if (!MusicManager.instance) {
            MusicManager.instance = new MusicManager();
        }
        return MusicManager.instance;
    }

    public update(delta: number) {
        const now = Date.now();
        if (now - this.lastTensionCheck < 2000) return; // Check every 2 seconds for music
        this.lastTensionCheck = now;

        const tension = useGameStore.getState().tensionLevel;
        let newState: MusicState = 'AMBIENT';

        if (tension > 80) {
            newState = 'COMBAT';
        } else if (tension > 40) {
            newState = 'TENSION';
        }

        if (newState !== this.currentState) {
            this.transitionTo(newState);
        }
    }

    private transitionTo(newState: MusicState) {
        console.log(`[MusicManager] Transitioning from ${this.currentState} to ${newState}`);
        
        // Stop current track if exists
        if (this.currentTrack) {
            this.currentTrack.pause();
        }

        this.currentState = newState;

        const trackId = MUSIC_TRACKS.tensionMap[newState];
        this.currentTrackId = trackId;
        this.currentTrack = AudioManager.playSound(trackId, AudioLayer.MUSIC, { loop: true });
    }

    public getCurrentState(): MusicState {
        return this.currentState;
    }

    public getCurrentTrackId(): MusicTrackId | null {
        return this.currentTrackId;
    }
}

export default MusicManager;
