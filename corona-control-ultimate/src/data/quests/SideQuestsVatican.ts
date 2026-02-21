import { Quest, QuestType, QuestState, ObjectiveType } from '@/types/QuestData';
import { AchievementId } from '@/types/enums';

export const SIDE_QUESTS_VATICAN: Quest[] = [
    {
        id: 'SQ_V_01_MEDIC',
        name: 'Humanitäre Hilfe',
        description: 'Ein Zivilist wurde im Getümmel am Brunnen verletzt. Leiste Erste Hilfe.',
        type: QuestType.SIDE,
        state: QuestState.AVAILABLE,
        objectives: [
            { id: 'obj_find_wounded', description: 'Finde den verletzten Bürger am westlichen Brunnen', type: ObjectiveType.GOTO, targetId: 'POI_WEST_FOUNTAIN', currentCount: 0, targetCount: 1, isCompleted: false },
            { id: 'obj_heal_civ', description: 'Verwende ein Medikit (Aktion)', type: ObjectiveType.COLLECT, targetId: 'ITEM_MEDKIT', currentCount: 0, targetCount: 1, isCompleted: false }
        ],
        rewards: { xp: 150, reputation: 15, tensionModifier: -5 }
    },
    {
        id: 'SQ_V_02_THIEF',
        name: 'Schatten der Piazza',
        description: 'Ein Taschendieb nutzt das Chaos aus. Identifiziere und verhafte ihn.',
        type: QuestType.SIDE,
        state: QuestState.LOCKED,
        objectives: [
            { id: 'obj_spot_thief', description: 'Identifiziere den Dieb in der Menge', type: ObjectiveType.TALK, currentCount: 0, targetCount: 1, isCompleted: false },
            { id: 'obj_arrest_thief', description: 'Verhafte den Verdächtigen', type: ObjectiveType.KILL, currentCount: 0, targetCount: 1, isCompleted: false }
        ],
        rewards: { xp: 200, money: 50 }
    },
    {
        id: 'SQ_V_03_PRESS',
        name: 'Die vierte Gewalt',
        description: 'Ein Journalist wird von aggressiven Demonstranten bedrängt. Schütze die Pressefreiheit.',
        type: QuestType.SIDE,
        state: QuestState.AVAILABLE,
        objectives: [
            { id: 'obj_protect_reporter', description: 'Beschütze den Reporter für 30 Sekunden', type: ObjectiveType.PROTECT, currentCount: 0, targetCount: 30, isCompleted: false }
        ],
        rewards: { xp: 250, reputation: 20, achievementId: 'ACH_013' as AchievementId }
    }
];
