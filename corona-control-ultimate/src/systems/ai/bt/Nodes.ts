
import { BTNode, BTStatus, Blackboard } from './BehaviorTree';
import type { NPCData } from '@/types/npc';

/**
 * ActionNode - Basisklasse für Blattknoten, die tatsächliche Aktionen ausführen
 */
export abstract class ActionNode extends BTNode {
    constructor(name: string) {
        super(name);
    }
}

/**
 * ConditionNode - Prüft eine Bedingung und gibt SUCCESS oder FAILURE zurück
 */
export abstract class ConditionNode extends BTNode {
    constructor(name: string) {
        super(name);
    }
}

/**
 * MoveToTargetAction - Bewegt den NPC zu einem Zielpunkt im Blackboard
 */
export class MoveToTargetAction extends ActionNode {
    private speed: number;
    private arrivalThreshold: number;

    constructor(speed: number = 3.5, arrivalThreshold: number = 0.5) {
        super('MoveToTarget');
        this.speed = speed;
        this.arrivalThreshold = arrivalThreshold;
    }

    tick(blackboard: Blackboard, dt: number): BTStatus {
        const npc = blackboard.get<NPCData>('self');
        const target = blackboard.get<[number, number, number]>('targetPos');

        if (!npc || !target) return BTStatus.FAILURE;

        const dx = target[0] - npc.position[0];
        const dz = target[2] - npc.position[2];
        const dist = Math.sqrt(dx * dx + dz * dz);

        if (dist < this.arrivalThreshold) {
            return BTStatus.SUCCESS;
        }

        // Bewegung (vereinfacht, wird später durch NavMesh/Physik ersetzt)
        const dirX = dx / dist;
        const dirZ = dz / dist;
        
        npc.position[0] += dirX * this.speed * dt;
        npc.position[2] += dirZ * this.speed * dt;
        
        // Sanfte Rotation
        const targetRot = Math.atan2(dirX, dirZ);
        npc.rotation = targetRot; // Vereinfacht

        return BTStatus.RUNNING;
    }
}

/**
 * IsPlayerNearbyCondition - Prüft, ob der Spieler in einem bestimmten Radius ist
 */
export class IsPlayerNearbyCondition extends ConditionNode {
    private radius: number;

    constructor(radius: number = 10) {
        super('IsPlayerNearby');
        this.radius = radius;
    }

    tick(blackboard: Blackboard, _dt: number): BTStatus {
        const npc = blackboard.get<NPCData>('self');
        const playerPos = blackboard.get<[number, number, number]>('playerPos');

        if (!npc || !playerPos) return BTStatus.FAILURE;

        const dx = playerPos[0] - npc.position[0];
        const dz = playerPos[2] - npc.position[2];
        const distSq = dx * dx + dz * dz;

        if (distSq < this.radius * this.radius) {
            return BTStatus.SUCCESS;
        }

        return BTStatus.FAILURE;
    }
}

/**
 * WaitAction - Wartet eine bestimmte Zeit
 */
export class WaitAction extends ActionNode {
    private duration: number;
    private elapsed: number = 0;

    constructor(duration: number) {
        super(`Wait(${duration}s)`);
        this.duration = duration;
    }

    tick(_blackboard: Blackboard, dt: number): BTStatus {
        this.elapsed += dt;
        if (this.elapsed >= this.duration) {
            this.elapsed = 0;
            return BTStatus.SUCCESS;
        }
        return BTStatus.RUNNING;
    }
}
