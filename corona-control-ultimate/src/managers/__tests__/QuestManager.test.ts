
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AdvancedQuestManager from '../QuestManager';
import { useGameStore } from '@/stores/gameStore';
import { QuestState } from '@/types/QuestData';

// Mock Store
vi.mock('@/stores/gameStore', () => ({
    useGameStore: {
        getState: vi.fn(() => ({
            setPrompt: vi.fn(),
            addPoints: vi.fn(),
            unlockAchievement: vi.fn(),
            setTension: vi.fn(),
            tensionLevel: 50,
            hasFlag: vi.fn().mockReturnValue(true)
        }))
    }
}));

describe('AdvancedQuestManager', () => {
    let questManager: AdvancedQuestManager;

    beforeEach(() => {
        // Reset singleton (hacky for singleton, but necessary if instance is preserved)
        // Since we can't easily reset private singleton instance without public method,
        // we might just get the instance and manually reset quests if possible.
        // However, initializeQuests is private and run only on ctor.
        // For unit testing singletons, strictly we should expose a reset method or loose typing.

        // For now, let's assume methods work on the pervasive instance.
        questManager = AdvancedQuestManager.getInstance();

        // We can't easily reset the internal map without a helper.
        // Let's rely on the specific quest IDs we know are there.
        // "Q_TUTORIAL_01" is AVAILABLE by default.
    });

    it('should have default quests initialized', () => {
        const available = questManager.getAvailableQuests();
        const main_quest = available.find(q => q.id === 'MQ_01_ENCOUNTER');
        expect(main_quest).toBeDefined();
        expect(main_quest?.state).toBe(QuestState.AVAILABLE);
    });

    it('should start a quest', () => {
        const qId = 'MQ_01_ENCOUNTER';

        // Ensure it is available (might be active from previous test if singleton persists?)
        // Vitest might reload modules if configured, but let's check.
        // If it's already active, this test is trivial.

        questManager.startQuest(qId);

        const active = questManager.getActiveQuests();
        const main_quest = active.find(q => q.id === qId);
        expect(main_quest).toBeDefined();
        expect(main_quest?.state).toBe(QuestState.ACTIVE);
    });

    it('should update objectives upon action', () => {
        const qId = 'MQ_01_ENCOUNTER';
        // Force start if not active
        questManager.startQuest(qId);

        // Objective: obj_talk_krause
        const objId = 'obj_talk_krause';

        questManager.updateObjective(qId, objId, 1);

        const active = questManager.getActiveQuests();
        const quest = active.find(q => q.id === qId);
        const obj = quest?.objectives.find(o => o.id === objId);

        expect(obj?.currentCount).toBe(1);
        expect(obj?.isCompleted).toBe(true);
    });

    // Note: Full completion test requires completing ALL objectives.
    it('should complete quest when all objectives are met', () => {
        const qId = 'MQ_01_ENCOUNTER';
        questManager.startQuest(qId);

        // Complete Obj 1
        questManager.updateObjective(qId, 'obj_reach_obelisk', 1);

        // Complete Obj 2
        questManager.updateObjective(qId, 'obj_talk_krause', 1);

        // Should be gone from active, and marked COMPLETED
        const active = questManager.getActiveQuests();
        const tutorialActive = active.find(q => q.id === qId);
        expect(tutorialActive).toBeUndefined(); // Should not be in active list

        // We don't have a public getCompletedQuests(), but it shouldn't be in available either
        const available = questManager.getAvailableQuests();
        const tutorialAvailable = available.find(q => q.id === qId);
        expect(tutorialAvailable).toBeUndefined();
    });
});
