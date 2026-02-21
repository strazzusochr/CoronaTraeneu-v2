import { SelectorNode, SequenceNode, Blackboard } from './BehaviorTree';
import { 
    IsPlayerNearbyCondition, 
    MoveToTargetAction, 
    WaitAction,
    SelectWanderTargetAction,
    SelectFleeTargetAction,
    SelectPatrolTargetAction
} from './Nodes';
import type { NPCData } from '@/types/npc';

export const BTPresets = {
    createPoliceTree: () => {
        const root = new SelectorNode('PoliceRoot');
        // Zukünftig: PursueRioter, aktuell nur Patrouille
        const patrol = new SequenceNode('Patrol');
        patrol.addChild(new SelectPatrolTargetAction());
        patrol.addChild(new MoveToTargetAction(2.0));
        patrol.addChild(new WaitAction(2));
        root.addChild(patrol);
        return root;
    },
    createCivilianTree: () => {
        const root = new SelectorNode('CivilianRoot');
        const flee = new SequenceNode('Flee');
        flee.addChild(new IsPlayerNearbyCondition(6)); // Flucht, wenn Spieler zu nah
        flee.addChild(new SelectFleeTargetAction(20));
        flee.addChild(new MoveToTargetAction(4.5)); // Schnelles Laufen
        
        const wander = new SequenceNode('Wander');
        wander.addChild(new SelectWanderTargetAction(15));
        wander.addChild(new MoveToTargetAction(1.2)); // Normales Gehen
        wander.addChild(new WaitAction(4));
        
        root.addChild(flee);
        root.addChild(wander);
        return root;
    },
    createRioterTree: () => {
        const root = new SelectorNode('RioterRoot');
        // Zukünftig: Aggressives Verhalten (Attack), Flucht vor Polizei
        const wander = new SequenceNode('WanderMob');
        wander.addChild(new SelectWanderTargetAction(25));
        wander.addChild(new MoveToTargetAction(2.5)); // Schnelleres Gehen
        wander.addChild(new WaitAction(1));
        
        root.addChild(wander);
        return root;
    }
};

export class BTManager {
    private blackboards: Map<number, Blackboard> = new Map();
    private trees: Map<number, SelectorNode> = new Map();

    registerNPC(npc: NPCData): void {
        const bb = new Blackboard();
        bb.set('self', npc);
        this.blackboards.set(npc.id, bb);
        
        if (npc.type === 'POLICE') {
            this.trees.set(npc.id, BTPresets.createPoliceTree());
        } else if (npc.type === 'RIOTER') {
            this.trees.set(npc.id, BTPresets.createRioterTree());
        } else {
            this.trees.set(npc.id, BTPresets.createCivilianTree());
        }
    }

    update(npcs: NPCData[], playerPos: [number, number, number], dt: number): void {
        for (const npc of npcs) {
            let bb = this.blackboards.get(npc.id);
            let tree = this.trees.get(npc.id);
            if (!bb || !tree) {
                this.registerNPC(npc);
                bb = this.blackboards.get(npc.id)!;
                tree = this.trees.get(npc.id)!;
            }

            bb.set('playerPos', playerPos);

            // Behavior Tree ticken
            tree.tick(bb, dt);

            // Nach Abschluss eines Ziels (SUCCESS), setze Ziel zurück,
            // Nach Abschluss eines Ziels (SUCCESS), setze Ziel zurück,
            // (der root node gibt nur den return wert zurück),
            // müssen wir die Laufzeitlogik anpassen.
            // Die Action-Nodes setzen selbst BTStatus.SUCCESS wenn angekommen.
            // Der Tree fängt immer oben an bei jedem Tick.
            // Wir prüfen, ob unser Wander/Patrol Ziel erreicht ist in MoveToTargetAction
            // Dort kehrt es SUCCESS zurück. Wenn der SequenceNode durchläuft, wird 
            // alles returned. Wir löschen das TargetPos hier nur, wenn der Tree GANZ durch ist.
            // ABER: In diesem Simple-BT-Design ist es besser, wenn die Nodes das TargetPos 
            // droppen oder MoveToTarget es löscht, wenn angekommen.
            // Warten wir den Tick ab. Wenn ein Ziel erreicht wurde (Abstand < threshold),
            // MoveToTarget behält sein targetPos bis wir ankommen.
            
            // Fix für Target-Reset:
            if (bb.get('targetPos')) {
                const target = bb.get<[number, number, number]>('targetPos')!;
                const dx = target[0] - npc.position[0];
                const dz = target[2] - npc.position[2];
                if (Math.sqrt(dx * dx + dz * dz) < 1.0) {
                    bb.set('targetPos', null);
                    
                    if (npc.type === 'POLICE') {
                        const patrolPoints = bb.get<[number, number, number][]>('patrolPoints');
                        if (patrolPoints) {
                            const idx = (bb.get<number>('patrolIndex') ?? 0) + 1;
                            bb.set('patrolIndex', idx % patrolPoints.length);
                        }
                    }
                }
            }
        }
    }
}

export const btManager = new BTManager();
