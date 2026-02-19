import { MissionSystem } from '@/systems/core/MissionSystem';
import { AudioManager, AudioLayer } from '@/managers/AudioManager';
import { DYNAMIC_EVENTS } from '@/constants/GameBalance';

/**
 * V6.0 EVENT SCHEDULER
 * 
 * Frequency: 0.2Hz (5s interals)
 * Trigger Logic: Time-based comparison
 */

export const TimelineEvents = [
    { time: 21600, id: 'EVT_DAWN', description: DYNAMIC_EVENTS.EVT_DAWN.description, active: false },
    { time: 50400, id: 'EVT_DEMO_START', description: DYNAMIC_EVENTS.EVT_DEMO_START.description, active: false },
    { time: 64800, id: 'EVT_ESCALATION', description: DYNAMIC_EVENTS.EVT_ESCALATION.description, active: false },
    { time: 75600, id: 'EVT_RIOT', description: DYNAMIC_EVENTS.EVT_RIOT.description, active: false },
];

export class EventScheduler {
    public static update(gameTimeSeconds: number) {
        TimelineEvents.forEach(evt => {
            if (!evt.active && gameTimeSeconds >= evt.time) {
                evt.active = true;
                this.triggerGlobalEvent(evt.id);
            }
        });
    }

    private static triggerGlobalEvent(id: string) {
        console.log(`[EventScheduler] TRIGGER: ${id}`);

        switch (id) {
            case 'EVT_DAWN':
                AudioManager.playSound('city_birds', AudioLayer.AMBIENT);
                break;
            case 'EVT_DEMO_START':
                MissionSystem.startMission('STAATSFEIND_01');
                AudioManager.playSound('megaphone_shout', AudioLayer.CROWD);
                break;
            case 'EVT_ESCALATION':
                AudioManager.setGlobalVolume(AudioLayer.CROWD, 1.0);
                break;
            case 'EVT_RIOT':
                AudioManager.playSound('siren_distant', AudioLayer.EVENT);
                break;
        }
    }
}
