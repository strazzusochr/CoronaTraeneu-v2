import { QuestState, QuestType, ObjectiveType } from '@/types/QuestData';
import type { Quest } from '@/types/QuestData';
import { useGameStore } from '@/stores/gameStore';
import { EngineLoop } from '@/core/EngineLoopManager';
import { MAIN_QUESTS_VATICAN } from '@/data/quests/MainQuestVatican';
import { SIDE_QUESTS_VATICAN } from '@/data/quests/SideQuestsVatican';

class AdvancedQuestManager {
    private static instance: AdvancedQuestManager;
    private quests: Map<string, Quest> = new Map();

    private constructor() {
        this.initializeQuests();
        EngineLoop.onAIUpdate(() => this.update());
    }

    public static getInstance(): AdvancedQuestManager {
        if (!AdvancedQuestManager.instance) {
            AdvancedQuestManager.instance = new AdvancedQuestManager();
        }
        return AdvancedQuestManager.instance;
    }

    private initializeQuests() {
        // Vatican Campaign (Phase 14+)
        MAIN_QUESTS_VATICAN.forEach(q => this.addQuest(q));
        SIDE_QUESTS_VATICAN.forEach(q => this.addQuest(q));
        
        // Side Quest: Friedlicher Ansatz fortsetzen (durch Flag)
        this.addQuest({
            id: 'Q_SIDE_PEACE',
            name: 'Friedliche Lösung',
            description: 'Beruhige die Menge durch Dialog und Präsenz.',
            type: QuestType.SIDE,
            state: QuestState.LOCKED,
            objectives: [
                { id: 'obj_keep_peace', description: 'Halte Spannung unter 30 für 60s', type: ObjectiveType.WAIT, currentCount: 0, targetCount: 60, isCompleted: false }
            ],
            rewards: { xp: 150, reputation: 10, achievementId: 'ACH_002' }
        });

        // Side Quest: Meldung nach Krause-Verhaftung
        this.addQuest({
            id: 'Q_SIDE_REPORT_ARREST',
            name: 'Melde Verhaftung',
            description: 'Berichte dem Einsatzleiter über die Verhaftung von Krause.',
            type: QuestType.SIDE,
            state: QuestState.LOCKED,
            objectives: [
                { id: 'obj_report_commander', description: 'Sprich mit dem Einsatzleiter', type: ObjectiveType.TALK, targetId: 'NPC_COMMANDER', currentCount: 0, targetCount: 1, isCompleted: false }
            ],
            rewards: { xp: 100, reputation: 8, achievementId: 'ACH_003' }
        });
    }

    private addQuest(quest: Quest) {
        this.quests.set(quest.id, quest);
    }

    public update() {
        // Prüfe Trigger & Timer
        this.quests.forEach(quest => {
            if (quest.state === QuestState.LOCKED) {
                // Prüfe Voraussetzungen
                if (quest.prerequisites) {
                    const allMet = quest.prerequisites.every(preId => {
                        const preQuest = this.quests.get(preId);
                        return preQuest && preQuest.state === QuestState.COMPLETED;
                    });
                    if (allMet) {
                        this.changeQuestState(quest.id, QuestState.AVAILABLE);
                    }
                }
            }

            if (quest.state === QuestState.ACTIVE && quest.timeLimit && quest.timerStart) {
                const elapsed = (Date.now() - quest.timerStart) / 1000;
                if (elapsed >= quest.timeLimit) {
                    this.failQuest(quest.id, "Zeit abgelaufen.");
                }
            }
        });
    }

    public startQuest(questId: string) {
        const quest = this.quests.get(questId);
        if (quest && quest.state === QuestState.AVAILABLE) {
            this.changeQuestState(questId, QuestState.ACTIVE);
            quest.timerStart = Date.now();
            useGameStore.getState().setPrompt(`QUEST GESTARTET: ${quest.name}`);
        }
    }

    public updateObjective(questId: string, objectiveId: string, amount: number = 1) {
        const quest = this.quests.get(questId);
        if (!quest || quest.state !== QuestState.ACTIVE) return;

        const obj = quest.objectives.find(o => o.id === objectiveId);
        if (obj && !obj.isCompleted) {
            obj.currentCount += amount;
            if (obj.targetCount && obj.currentCount >= obj.targetCount) {
                obj.isCompleted = true;
                this.checkQuestCompletion(quest);
            }
        }
    }

    private checkQuestCompletion(quest: Quest) {
        const allRequiredComplete = quest.objectives.every(o => o.isCompleted || o.isOptional);
        if (allRequiredComplete) {
            // Wenn es Branchen gibt, warten wir auf eine manuelle Auswahl oder einen Flag
            if (quest.branches && quest.branches.length > 0) {
                // Suche nach einer Branche, deren Flag gesetzt ist
                const activeBranch = quest.branches.find(b => b.requirementFlag && useGameStore.getState().hasFlag(b.requirementFlag));
                if (activeBranch) {
                    this.completeQuest(quest.id, activeBranch.id);
                } else {
                    // Bleibt ACTIVE bis eine Branche gewählt wird (z.B. via Dialog)
                }
            } else {
                this.completeQuest(quest.id);
            }
        }
    }

    public completeQuest(questId: string, branchId?: string) {
        const quest = this.quests.get(questId);
        if (!quest) return;

        this.changeQuestState(questId, QuestState.COMPLETED);

        if (quest.rewards.xp) useGameStore.getState().addPoints(quest.rewards.xp);
        if (quest.rewards.achievementId) {
            useGameStore.getState().unlockAchievement(quest.rewards.achievementId);
        }

        let nextId = quest.nextQuestId;
        let outcomeMsg = '';

        if (branchId && quest.branches) {
            const branch = quest.branches.find(b => b.id === branchId);
            if (branch) {
                nextId = branch.nextQuestId;
                outcomeMsg = branch.outcomeDescription ? ` - ${branch.outcomeDescription}` : '';
            }
        }

        useGameStore.getState().setPrompt(`QUEST ABGESCHLOSSEN: ${quest.name}${outcomeMsg}`);

        if (nextId) {
            const nextQ = this.quests.get(nextId);
            if (nextQ && nextQ.state === QuestState.LOCKED) {
                this.changeQuestState(nextId, QuestState.AVAILABLE);
            }
        }
    }

    public onFlag(flagKey: string) {
        if (flagKey === 'tried_peaceful') {
            const q = this.quests.get('Q_SIDE_PEACE');
            if (q && q.state === QuestState.LOCKED) {
                this.changeQuestState('Q_SIDE_PEACE', QuestState.AVAILABLE);
                useGameStore.getState().setPrompt('NEBENQUEST VERFÜGBAR: Friedliche Lösung');
            }
        } else if (flagKey === 'krause_arrested') {
            const q = this.quests.get('Q_SIDE_REPORT_ARREST');
            if (q && q.state === QuestState.LOCKED) {
                this.changeQuestState('Q_SIDE_REPORT_ARREST', QuestState.AVAILABLE);
                useGameStore.getState().setPrompt('NEBENQUEST VERFÜGBAR: Verhaftung melden');
            }
        }
    }

    private failQuest(questId: string, reason: string) {
        const quest = this.quests.get(questId);
        if (!quest) return;

        this.changeQuestState(questId, QuestState.FAILED);
        useGameStore.getState().setPrompt(`QUEST GESCHEITERT: ${quest.name} (${reason})`);
    }

    private changeQuestState(questId: string, newState: QuestState) {
        const quest = this.quests.get(questId);
        if (quest) {
            quest.state = newState;
            // Notify UI
        }
    }

    // --- Öffentliche API für UI ---
    public getActiveQuests(): Quest[] {
        return Array.from(this.quests.values()).filter(q => q.state === QuestState.ACTIVE);
    }

    public getAvailableQuests(): Quest[] {
        return Array.from(this.quests.values()).filter(q => q.state === QuestState.AVAILABLE);
    }
}

// Export Helper Instanz Zugriff für UI
export const getActiveQuests = () => AdvancedQuestManager.getInstance().getActiveQuests();
export const getAvailableQuests = () => AdvancedQuestManager.getInstance().getAvailableQuests();

export default AdvancedQuestManager;
