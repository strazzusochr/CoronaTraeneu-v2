import { useTimeEngine } from '@/core/TimeEngine';
import { useGameStore } from '@/stores/gameStore';
import { EngineLoop } from '@/core/EngineLoopManager';
import AudioManager, { AudioLayer } from '@/managers/AudioManager';
import { useNotificationStore } from '@/stores/notificationStore';
import { DYNAMIC_EVENTS } from '@/constants/GameBalance';

export type EventType = 'SCHEDULED' | 'TRIGGERED' | 'CONDITIONAL';

export interface GameEvent {
    id: string;
    type: EventType;
    triggerTime?: number; // Seconds since midnight
    condition?: () => boolean;
    action: () => void;
    executed: boolean;
    description: string;
}

export class EventManager {
    private static instance: EventManager;
    private events: GameEvent[] = [];
    private lastCheckedSeconds: number = -1;

    private constructor() {
        this.registerDefaultEvents();
        EngineLoop.onGlobalUpdate(() => this.update());
    }

    public static getInstance(): EventManager {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    }

    private registerDefaultEvents() {
        this.registerEvent({
            id: 'EVT_KRAUSE_ARRIVAL',
            type: 'SCHEDULED',
            triggerTime: 14 * 3600, // 14:00
            executed: false,
            description: DYNAMIC_EVENTS.EVT_KRAUSE_ARRIVAL.description,
            action: () => {
                useGameStore.getState().setPrompt("Martin Krause hat den Platz betreten! Überwache ihn.");
                useNotificationStore.getState().addNotification("Krause ist eingetroffen.", "INFO", 5000);
            }
        });

        this.registerEvent({
            id: 'EVT_SPEECH_START',
            type: 'SCHEDULED',
            triggerTime: 14 * 3600 + 10 * 60, // 14:10
            executed: false,
            description: DYNAMIC_EVENTS.EVT_SPEECH_START.description,
            action: () => {
                useGameStore.getState().setPrompt("Die Rede beginnt. Die Menge tobt.");
                useGameStore.getState().setTension(50);
                useNotificationStore.getState().addNotification("Rede gestartet – Menge wird lauter.", "WARNING", 6000);
                AudioManager.playSfx('SFX_CROWD_CHEER', AudioLayer.CROWD);
            }
        });
    }

    public registerEvent(event: GameEvent) {
        this.events.push(event);
    }

    public onFlag(flagKey: string) {
        if (flagKey === 'tried_peaceful') {
            this.registerEvent({
                id: 'EVT_TRIED_PEACEFUL',
                type: 'TRIGGERED',
                executed: false,
                description: DYNAMIC_EVENTS.EVT_TRIED_PEACEFUL.description,
                action: () => {
                    useGameStore.getState().setPrompt("Friedlicher Ansatz registriert. Versuche die Lage weiter zu beruhigen.");
                    useNotificationStore.getState().addNotification("Friedlicher Ansatz – gute Entscheidung.", "SUCCESS", 5000);
                }
            });
        } else if (flagKey === 'crowd_evacuated') {
            this.registerEvent({
                id: 'EVT_CROWD_EVACUATED',
                type: 'TRIGGERED',
                executed: false,
                description: DYNAMIC_EVENTS.EVT_CROWD_EVACUATED.description,
                action: () => {
                    useGameStore.getState().setPrompt("Evakuierung läuft. Halte die Wege frei.");
                    useNotificationStore.getState().addNotification("Evakuierung aktiv.", "INFO", 5000);
                }
            });
        } else if (flagKey === 'krause_arrested') {
            this.registerEvent({
                id: 'EVT_KRAUSE_ARRESTED',
                type: 'TRIGGERED',
                executed: false,
            description: DYNAMIC_EVENTS.EVT_KRAUSE_ARRESTED.description,
            action: () => {
                useGameStore.getState().setPrompt("Einsatzmeldung: Krause verhaftet. Lage neu bewerten.");
                useNotificationStore.getState().addNotification("Krause verhaftet.", "ALERT", 6000);
                AudioManager.playSfx('SFX_NPC_PAIN_HEAVY', AudioLayer.EVENT);
            }
            });
        } else if (flagKey === 'riot_started') {
            this.registerEvent({
                id: 'EVT_RIOT_STARTED',
                type: 'TRIGGERED',
                executed: false,
            description: DYNAMIC_EVENTS.EVT_RIOT_STARTED.description,
            action: () => {
                useGameStore.getState().setPrompt("ALARM: Eskalation erkannt! Verstärkung anfordern.");
                useNotificationStore.getState().addNotification("Eskalation! Verstärkung anfordern.", "ALERT", 6000);
                AudioManager.playSfx('SFX_SIREN', AudioLayer.EVENT);
            }
            });
        }
    }

    public update() {
        const currentTime = useTimeEngine.getState().gameTimeSeconds;
        if (currentTime === this.lastCheckedSeconds) return;
        this.lastCheckedSeconds = currentTime;

        this.events.forEach(event => {
            if (event.executed) return;

            let shouldTrigger = false;

            if (event.type === 'SCHEDULED' && event.triggerTime !== undefined) {
                if (currentTime >= event.triggerTime) {
                    shouldTrigger = true;
                }
            } else if (event.type === 'CONDITIONAL' && event.condition) {
                if (event.condition()) {
                    shouldTrigger = true;
                }
            }

            if (shouldTrigger) {
                console.log(`[EVENT] Triggered: ${event.description}`);
                event.action();
                event.executed = true;
            }
        });
    }
}
