import { Quest, QuestType, QuestState, ObjectiveType } from '@/types/QuestData';
import { AchievementId } from '@/types/enums';

export const MAIN_QUESTS_VATICAN: Quest[] = [
    {
        id: 'MQ_01_ENCOUNTER',
        name: 'Die Allianz des Vatikans - Der Obelisk',
        description: 'Verhandle mit dem Protestführer Martin Krause am Obelisken.',
        type: QuestType.MAIN,
        state: QuestState.AVAILABLE,
        giverId: 'NPC_COMMANDER',
        objectives: [
            { id: 'obj_reach_obelisk', description: 'Begib dich zum Obelisken in der Mitte des Platzes', type: ObjectiveType.GOTO, currentCount: 0, targetCount: 1, isCompleted: false },
            { id: 'obj_talk_krause', description: 'Sprich mit Martin Krause', type: ObjectiveType.TALK, targetId: 'NPC_KRAUSE', currentCount: 0, targetCount: 1, isCompleted: false }
        ],
        rewards: { xp: 200, reputation: 10 },
        branches: [
            { id: 'branch_peace', text: 'Friedliche Verhandlungsstrategie', nextQuestId: 'MQ_02_MOLOTOV', requirementFlag: 'tried_peaceful', outcomeDescription: 'Verhandlung begonnen' },
            { id: 'branch_force', text: 'Harte Linie / Einschüchterung', nextQuestId: 'MQ_02_MOLOTOV', requirementFlag: 'krause_intimidated', outcomeDescription: 'Autorität demonstriert' }
        ]
    },
    {
        id: 'MQ_02_MOLOTOV',
        name: 'Der Molotow-Vorfall',
        description: 'Ein Demonstrant hat einen Molotow-Cocktail geworfen. Reagiere auf die Provokation.',
        type: QuestType.MAIN,
        state: QuestState.LOCKED,
        objectives: [
            { id: 'obj_handle_provocation', description: 'Entscheide über das Vorgehen gegen den Werfer', type: ObjectiveType.TALK, targetId: 'NPC_COMMANDER', currentCount: 0, targetCount: 1, isCompleted: false }
        ],
        rewards: { xp: 300, tensionModifier: 15 },
        branches: [
            { id: 'branch_lenient', text: 'Milde: Nur Verwarnung', nextQuestId: 'MQ_03_BARRICADE', requirementFlag: 'molotov_lenient', outcomeDescription: 'Deeskalierend gewirkt' },
            { id: 'branch_strict', text: 'Strenge: Sofortige Verhaftung', nextQuestId: 'MQ_03_BARRICADE', requirementFlag: 'molotov_strict', outcomeDescription: 'Null-Toleranz gezeigt' }
        ]
    },
    {
        id: 'MQ_03_BARRICADE',
        name: 'Die Barrikade am Petersplatz',
        description: 'Der Weg für den Konvoi ist blockiert. Räume die Barrikade.',
        type: QuestType.MAIN,
        state: QuestState.LOCKED,
        objectives: [
            { id: 'obj_clear_path', description: 'Räume den Zugang zum Petersdom frei', type: ObjectiveType.WAIT, currentCount: 0, targetCount: 1, isCompleted: false }
        ],
        rewards: { xp: 400 },
        branches: [
            { id: 'branch_tactical', text: 'Taktisch: Wasserwerfer einsetzen', nextQuestId: 'MQ_04_PIAZZA_RESCUE', requirementFlag: 'barricade_tactical', outcomeDescription: 'Technischer Einsatz' },
            { id: 'branch_force', text: 'Gewalt: Schlagstock-Einsatz', nextQuestId: 'MQ_04_PIAZZA_RESCUE', requirementFlag: 'barricade_force', outcomeDescription: 'Physische Räumung' }
        ]
    },
    {
        id: 'MQ_04_PIAZZA_RESCUE',
        name: 'Rettung in der Piazza',
        description: 'In der Menge sind Unbeteiligte eingekesselt. Rette sie oder sichere das Hauptziel.',
        type: QuestType.MAIN,
        state: QuestState.LOCKED,
        objectives: [
            { id: 'obj_rescue_action', description: 'Führe die Rettungsaktion durch', type: ObjectiveType.PROTECT, currentCount: 0, targetCount: 1, isCompleted: false }
        ],
        rewards: { xp: 500, reputation: 25 },
        branches: [
            { id: 'branch_save', text: 'Menschenleben vor Mission', nextQuestId: 'MQ_05_ULTIMATUM', requirementFlag: 'save_civilians', outcomeDescription: 'Zivilisten gerettet' },
            { id: 'branch_secure', text: 'Zielobjekt hat Priorität', nextQuestId: 'MQ_05_ULTIMATUM', requirementFlag: 'secure_target', outcomeDescription: 'Lage gesichert' }
        ]
    },
    {
        id: 'MQ_05_ULTIMATUM',
        name: 'Das Ultimatum am Petersdom',
        description: 'Das Schicksal der Demonstration wird hier entschieden. Verhandle das Ende.',
        type: QuestType.MAIN,
        state: QuestState.LOCKED,
        objectives: [
            { id: 'obj_final_decision', description: 'Triff die finale Entscheidung am Kircheneingang', type: ObjectiveType.TALK, targetId: 'NPC_KRAUSE', currentCount: 0, targetCount: 1, isCompleted: false }
        ],
        rewards: { xp: 1000, achievementId: 'ACH_CAMPAIGN_COMPLETE' as AchievementId },
        branches: [
            { id: 'branch_peace', text: 'Frieden: Lokaler Pakt', nextQuestId: 'MQ_ENDING_PEACE', requirementFlag: 'peace_treaty', outcomeDescription: 'ENDE: FRIEDEN' },
            { id: 'branch_order', text: 'Ordnung: Totale Räumung', nextQuestId: 'MQ_ENDING_ORDER', requirementFlag: 'total_order', outcomeDescription: 'ENDE: ORDNUNG' }
        ]
    }
];
