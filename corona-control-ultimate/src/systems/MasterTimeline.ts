import { useGameStore } from '@/stores/gameStore';
import { EngineLoopRegistry } from '@/core/EngineLoopManager';
import { useTimeEngine } from '@/core/TimeEngine';

/**
 * MASTER TIMELINE (Phase 3.5)
 * Orchestrates scripted events throughout the game day (08:00 - 00:00).
 * Driven by the TimeEngine.
 */

type TimelineEvent = {
    time: number; // in seconds from 00:00 (e.g., 8 * 3600 for 08:00)
    triggered: boolean;
    action: () => void;
};

export class MasterTimeline {
    private static instance: MasterTimeline;
    private events: TimelineEvent[] = [];

    private constructor() {
        this.initializeEvents();
        EngineLoopRegistry.event.push(() => this.update());
        console.log("⏱️ Master Timeline initialized");
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new MasterTimeline();
        }
        return this.instance;
    }

    private initializeEvents() {
        const store = useGameStore.getState();
        const triggerScenario = store.triggerScenario;

        this.events = [
            {
                // 08:00 - Erste Demonstranten, Bühnenaufbau
                time: 8 * 3600,
                triggered: false,
                action: () => {
                    console.log("[TIMELINE] 08:00 - First Protesters arrive");
                    store.setPrompt("08:00 - Erste Demonstranten versammeln sich.");
                    store.setTension(5);
                    // store.spawnWave(NPCType.CIVILIAN, 10, [-20, 0, -20]);
                }
            },
            {
                // 10:00 - Massenzustrom
                time: 10 * 3600,
                triggered: false,
                action: () => {
                    console.log("[TIMELINE] 10:00 - Mass influx");
                    store.setPrompt("10:00 - Starker Zulauf zur Demonstration.");
                    store.setTension(15);
                    triggerScenario('DEMONSTRATION');
                }
            },
            {
                // 11:30 - Aggressive Rhetorik (Karl Weber)
                time: 11.5 * 3600,
                triggered: false,
                action: () => {
                    console.log("[TIMELINE] 11:30 - Aggressive Speech");
                    store.setPrompt("11:30 - Aggressive Reden beginnen. Spannung steigt.");
                    store.setTension(25);
                }
            },
            {
                // 12:00 - Polizei-Ultimatum
                time: 12 * 3600,
                triggered: false,
                action: () => {
                    console.log("[TIMELINE] 12:00 - Police Ultimatum");
                    store.setPrompt("12:00 - Polizei warnt die Menge. Letzte Aufforderung zur Räumung.");
                    store.setTension(45);
                    // triggerScenario('POLICE_LINE');
                }
            },
            {
                // 18:00 - Extremisten formieren sich
                time: 18 * 3600,
                triggered: false,
                action: () => {
                    console.log("[TIMELINE] 18:00 - Extremists forming");
                    store.setPrompt("18:00 - Radikale Gruppen formieren sich.");
                    store.setTension(50);
                }
            },
            {
                // 19:00 - Black-Bloc-Angriff
                time: 19 * 3600,
                triggered: false,
                action: () => {
                    console.log("[TIMELINE] 19:00 - Black Bloc attack");
                    store.setPrompt("19:00 - ESKALATION! Black-Bloc greift an!");
                    store.setTension(80);
                    triggerScenario('CLASH');
                }
            },
            {
                // 21:00 - PEAK CHAOS
                time: 21 * 3600,
                triggered: false,
                action: () => {
                    console.log("[TIMELINE] 21:00 - Peak Chaos");
                    store.setPrompt("21:00 - KONTROLLVERLUST. Schwerer Riot.");
                    store.setTension(100);
                }
            },
            {
                // 22:00 - Aftermath
                time: 22 * 3600,
                triggered: false,
                action: () => {
                    console.log("[TIMELINE] 22:00 - Aftermath");
                    store.setPrompt("22:00 - Die Lage beruhigt sich langsam.");
                    store.setTension(40);
                }
            }
        ];
    }

    public update() {
        // Time engine handles the actual time progression
        const currentTime = useTimeEngine.getState().gameTimeSeconds;
        
        if (currentTime === undefined) return;

        for (const event of this.events) {
            // Trigger events if current time passes the event time
            if (!event.triggered && currentTime >= event.time && currentTime < event.time + 60) {
                event.action();
                event.triggered = true;
            }
        }
    }

    // Call this if game time is restarted or jumped backwards manually
    public resetEvents(time: number = 0) {
        for (const event of this.events) {
            event.triggered = time > event.time;
        }
    }
}

export const masterTimeline = MasterTimeline.getInstance();
