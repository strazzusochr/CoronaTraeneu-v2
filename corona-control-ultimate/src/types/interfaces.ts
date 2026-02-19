import { NPCState, NPCType, Faction, EmotionalState, QuestStatus } from './enums';

/**
 * V7.0 HYPER AAA INTERFACES
 */

export interface Vector3Array {
    [index: number]: number;
}

export interface FACSRig {
    jaw_open: number;
    mouth_smile: number;
    eye_blink_left: number;
    eye_blink_right: number;
    brow_up_left: number;
    brow_up_right: number;
    lip_pucker: number;
    // ... total 95 FACS bones simulated via blendshapes/matrices
}

export interface NPCData {
    id: number;
    type: NPCType;
    state: NPCState;
    faction: Faction;
    position: [number, number, number];
    velocity: [number, number, number];
    rotation: number;
    hairColor: string;
    outfitId: string;

    // AAA AI & Emotion
    emotions: {
        current: EmotionalState;
        stress: number;    // 0-1
        aggression: number; // 0-1
        fear: number;      // 0-1
    };

    // Rendering & Animation
    lodLevel: 0 | 1 | 2 | 3 | 4;
    facs?: FACSRig;
    lipSyncPhoneme?: string;

    // Logic
    targetId?: number;
    pathPoints?: [number, number, number][];
}

export interface PlayerState {
    id: string;
    position: [number, number, number];
    rotation: number;
    health: number;
    stamina: number;
    armor: number; // 0-100
    karma: number; // -100 to 100
    inventory: string[];
}

export interface WorldObject {
    id: string;
    type: 'BUILDING' | 'PROP' | 'BARRIER' | 'VEHICLE';
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    health?: number;
}

export interface QuestObjective {
    id: string;
    description: string;
    isCompleted: boolean;
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    status: QuestStatus;
    objectives: QuestObjective[];
    rewardKarma: number;
}

export interface AudioSettings {
    masterVolume: number;
    musicVolume: number;
    sfxVolume: number;
    voiceVolume: number;
    useHRTF: boolean;
}
