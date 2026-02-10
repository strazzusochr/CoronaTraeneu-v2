import { MissionSystem } from '@/systems/core/MissionSystem';
import { AudioManager, AudioLayer } from '@/managers/AudioManager';

/**
 * V6.0 EVENT SCHEDULER
 * 
 * Frequency: 0.2Hz (5s interals)
 * Trigger Logic: Time-based comparison
 */

export const TimelineEvents = [
    { time: 21600, id: 'DAWN', description: 'Stadt Erwacht', active: false },    // 06:00
    { time: 50400, id: 'DEMO_START', description: 'Demo Beginn', active: false }, // 14:00
    { time: 64800, id: 'ESCALATION', description: 'Eskalation', active: false },  // 18:00
    { time: 75600, id: 'RIOT', description: 'Straßenschlacht', active: false },  // 21:00
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
            case 'DAWN':
                AudioManager.playSound('city_birds', AudioLayer.AMBIENT);
                break;
            case 'DEMO_START':
                MissionSystem.startMission('STAATSFEIND_01');
                AudioManager.playSound('megaphone_shout', AudioLayer.CROWD);
                break;
            case 'ESCALATION':
                AudioManager.setGlobalVolume(AudioLayer.CROWD, 1.0);
                break;
            case 'RIOT':
                AudioManager.playSound('siren_distant', AudioLayer.EVENT);
                break;
        }
    }
}
