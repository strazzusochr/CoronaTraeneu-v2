/**
 * V6.0 MISSION SYSTEM
 * 
 * Handles:
 * - State tracking (IDLE, ACTIVE, COMPLETED, FAILED)
 * - Objective management
 * - Scripted events
 */

export enum MissionState {
    IDLE = 'IDLE',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

export interface Objective {
    id: string;
    description: string;
    isCompleted: boolean;
}

export interface Mission {
    id: string;
    title: string;
    state: MissionState;
    objectives: Objective[];
    rewardKarma: number;
}

export class MissionSystem {
    private static activeMissions: Map<string, Mission> = new Map();

    public static startMission(id: string) {
        if (id === 'STAATSFEIND_01') {
            const m: Mission = {
                id,
                title: 'Staatsfeind Nr. 1: Heinz-Christian Krause',
                state: MissionState.ACTIVE,
                objectives: [
                    { id: 'arrive', description: 'Begib dich zum Stephansplatz', isCompleted: false },
                    { id: 'observe', description: 'Beobachte die Demo (Fernglas)', isCompleted: false },
                    { id: 'identify', description: 'Identifiziere Zielperson Krause', isCompleted: false },
                ],
                rewardKarma: 50
            };
            this.activeMissions.set(id, m);
            console.log(`[MissionSystem] Mission gestartet: ${m.title}`);
        }
    }

    public static completeObjective(missionId: string, objectiveId: string) {
        const m = this.activeMissions.get(missionId);
        if (m) {
            const obj = m.objectives.find(o => o.id === objectiveId);
            if (obj) {
                obj.isCompleted = true;
                console.log(`[MissionSystem] Objective abgeschlossen: ${obj.description}`);

                if (m.objectives.every(o => o.isCompleted)) {
                    m.state = MissionState.COMPLETED;
                    console.log(`[MissionSystem] MISSION ERFOLGREICH: ${m.title}`);
                }
            }
        }
    }
}
