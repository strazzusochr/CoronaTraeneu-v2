import * as THREE from 'three';
import { AIPerceptionSystem } from './AIPerceptionSystem';

/**
 * V6.0 UTILITY-BASED AI CONTROLLER
 */

export interface AIState {
    aggression: number;
    courage: number;
    health: number;
}

export class NPCAIController {
    public static decideAction(npcId: string, pos: THREE.Vector3, state: AIState) {
        const threats = AIPerceptionSystem.getNearbyThreats(pos);

        // Formel: FleeUtility = ThreatLevel * (1-Courage) * (1-Health)
        const threatLevel = threats.length / 5;
        const fleeUtility = threatLevel * (1 - state.courage) * (1 - state.health);

        if (fleeUtility > 0.7) return 'FLEE';
        if (threatLevel > 0.3 && state.aggression > 0.5) return 'COMBAT';

        return 'WANDER';
    }
}
