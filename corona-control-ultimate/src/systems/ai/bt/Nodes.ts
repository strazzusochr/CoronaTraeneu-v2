
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

/**
 * SelectWanderTargetAction - Bestimmt ein zufälliges Ziel für NPC im vorgegebenen Radius
 */
export class SelectWanderTargetAction extends ActionNode {
    private radius: number;
    
    constructor(radius: number = 20) {
        super(`SelectWanderTarget(${radius}m)`);
        this.radius = radius;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tick(blackboard: Blackboard, _dt: number): BTStatus {
        const npc = blackboard.get<NPCData>('self');
        if (!npc) return BTStatus.FAILURE;

        // Nutze World-Building Raster: Rotiere grob entlang der Straßen (X/Z +/-)
        const currentTarget = blackboard.get<[number, number, number]>('targetPos');
        if (currentTarget) return BTStatus.SUCCESS; // Ziel existiert bereits

        const dx = (Math.random() - 0.5) * this.radius * 2;
        const dz = (Math.random() - 0.5) * this.radius * 2;
        
        const targetX = npc.position[0] + dx;
        const targetZ = npc.position[2] + dz;

        // Optional: Hier könnten spätere Kollisions-Prüfungen des World-Building-Protokolls rein
        blackboard.set('targetPos', [targetX, 0, targetZ]);
        
        return BTStatus.SUCCESS;
    }
}

/**
 * SelectFleeTargetAction - Bestimmt ein Fluchtziel weg vom Spieler
 */
export class SelectFleeTargetAction extends ActionNode {
    private fleeDistance: number;

    constructor(fleeDistance: number = 30) {
        super(`SelectFleeTarget(${fleeDistance}m)`);
        this.fleeDistance = fleeDistance;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tick(blackboard: Blackboard, _dt: number): BTStatus {
        const npc = blackboard.get<NPCData>('self');
        const playerPos = blackboard.get<[number, number, number]>('playerPos');
        
        if (!npc || !playerPos) return BTStatus.FAILURE;

        const currentTarget = blackboard.get<[number, number, number]>('targetPos');
        if (currentTarget) return BTStatus.SUCCESS; // Flüchtet bereits

        const dx = npc.position[0] - playerPos[0];
        const dz = npc.position[2] - playerPos[2];
        const dist = Math.sqrt(dx * dx + dz * dz) || 1; // ||1 vermeidet div by 0

        // Flieht in die entgegengesetzte Richtung des Spielers
        const targetX = npc.position[0] + (dx / dist) * this.fleeDistance;
        const targetZ = npc.position[2] + (dz / dist) * this.fleeDistance;

        blackboard.set('targetPos', [targetX, 0, targetZ]);

        return BTStatus.SUCCESS;
    }
}

/**
 * SelectPatrolTargetAction - Bestimmt das nächste Patrol-Target basierend auf einer Route
 */
export class SelectPatrolTargetAction extends ActionNode {
    constructor() {
        super('SelectPatrolTarget');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tick(blackboard: Blackboard, _dt: number): BTStatus {
        const npc = blackboard.get<NPCData>('self');
        if (!npc) return BTStatus.FAILURE;

        let patrolPoints = blackboard.get<[number, number, number][]>('patrolPoints');
        let patrolIndex = blackboard.get<number>('patrolIndex');

        // Initialisiere Patrouillen-Route (einfaches Quadrat um Spawn für den Anfang)
        if (!patrolPoints || patrolIndex === undefined) {
            const bX = Math.round(npc.position[0] / 10) * 10;
            const bZ = Math.round(npc.position[2] / 10) * 10;
            const off = 10;
            patrolPoints = [
                [bX - off, 0, bZ - off],
                [bX - off, 0, bZ + off],
                [bX + off, 0, bZ + off],
                [bX + off, 0, bZ - off]
            ];
            patrolIndex = 0;
            blackboard.set('patrolPoints', patrolPoints);
            blackboard.set('patrolIndex', patrolIndex);
        }

        const currentTarget = blackboard.get<[number, number, number]>('targetPos');
        if (currentTarget) return BTStatus.SUCCESS;

        const nextPoint = patrolPoints[patrolIndex % patrolPoints.length];
        blackboard.set('targetPos', nextPoint);

        return BTStatus.SUCCESS;
    }
}
