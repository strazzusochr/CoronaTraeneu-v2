/**
 * V6.0 DE-ESCALATION MANAGER
 * 
 * Logic:
 * - Relationship Score (-100 to +100)
 * - Branching Dialogs
 * - Karma Checks
 */

export class DeescalationManager {
    private relationshipScore: number = 0;

    public static getDialogOptions(npcType: string) {
        if (npcType === 'DEMONSTRATOR') {
            return [
                { id: 'calm', text: 'Bitte beruhigen Sie sich, wir sind nur hier um zu schützen.', karmaCost: 0 },
                { id: 'warn', text: 'Dies ist eine illegale Versammlung. Gehen Sie nach Hause.', karmaCost: 5 },
                { id: 'aggressive', text: 'Zurückweichen! Oder wir setzen Zwangsmittel ein.', karmaCost: 15 },
            ];
        }
        return [];
    }

    public static handleResponse(npcId: string, choiceId: string) {
        console.log(`[Deescalation] NPC ${npcId} reagiert auf Choice: ${choiceId}`);
        // Logic to update RelationshipScore or NPC State
    }
}
