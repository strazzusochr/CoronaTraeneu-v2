import { SelectorNode, SequenceNode, Blackboard, BTStatus } from './BehaviorTree';
import { IsPlayerNearbyCondition, MoveToTargetAction, WaitAction } from './Nodes';
import type { NPCData } from '@/types/npc';

export const BTPresets = {
    createGuardTree: () => {
        const root = new SelectorNode('GuardRoot');
        const watchPlayer = new SequenceNode('WatchPlayer');
        watchPlayer.addChild(new IsPlayerNearbyCondition(8));
        watchPlayer.addChild(new WaitAction(1));
        const patrol = new SequenceNode('Patrol');
        patrol.addChild(new MoveToTargetAction(2.0));
        patrol.addChild(new WaitAction(3));
        root.addChild(watchPlayer);
        root.addChild(patrol);
        return root;
    },
    createCivilianTree: () => {
        const root = new SelectorNode('CivilianRoot');
        const flee = new SequenceNode('Flee');
        flee.addChild(new IsPlayerNearbyCondition(5));
        flee.addChild(new MoveToTargetAction(5.0));
        const wander = new SequenceNode('Wander');
        wander.addChild(new MoveToTargetAction(1.5));
        wander.addChild(new WaitAction(5));
        root.addChild(flee);
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
            this.trees.set(npc.id, BTPresets.createGuardTree());
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

            if (!bb.get('targetPos')) {
                const gridX = Math.round(npc.position[0] / 50) * 50;
                const gridZ = Math.round(npc.position[2] / 50) * 50;
                const off = Math.random() > 0.3 ? 6 : 0;
                const useNS = Math.random() > 0.5;
                let tx: number;
                let tz: number;
                if (useNS) {
                    tx = gridX + (Math.random() > 0.5 ? off : -off);
                    tz = npc.position[2] + (Math.random() - 0.5) * 80;
                } else {
                    tx = npc.position[0] + (Math.random() - 0.5) * 80;
                    tz = gridZ + (Math.random() > 0.5 ? off : -off);
                }
                const dx = tx - 0;
                const dz = tz - (-50);
                if (Math.sqrt(dx * dx + dz * dz) < 25) {
                    tx += 30;
                    tz += 30;
                }

                if (npc.type === 'POLICE') {
                    let patrolPoints = bb.get<[number, number, number][]>('patrolPoints');
                    let patrolIndex = bb.get<number>('patrolIndex') ?? 0;
                    if (!patrolPoints) {
                        const pOff = 6;
                        const bX = Math.round(npc.position[0] / 50) * 50;
                        const bZ = Math.round(npc.position[2] / 50) * 50;
                        patrolPoints = [
                            [bX - pOff, 0, bZ - 20],
                            [bX - pOff, 0, bZ + 20],
                            [bX + pOff, 0, bZ + 20],
                            [bX + pOff, 0, bZ - 20]
                        ];
                        bb.set('patrolPoints', patrolPoints);
                        bb.set('patrolIndex', 0);
                        patrolIndex = 0;
                    }
                    const next = patrolPoints[patrolIndex % patrolPoints.length];
                    bb.set('targetPos', next);
                } else {
                    bb.set('targetPos', [tx, 0, tz]);
                }
            }

            if (npc.type === 'RIOTER' && Math.random() > 0.95) {
                bb.set('targetPos', [
                    (Math.random() - 0.5) * 10,
                    0,
                    -50 + (Math.random() - 0.5) * 10
                ]);
            }

            tree.tick(bb, dt);

            const lastStatus = tree.status;
            if (lastStatus === BTStatus.SUCCESS) {
                if (npc.type === 'POLICE') {
                    const patrolPoints = bb.get<[number, number, number][]>('patrolPoints');
                    if (patrolPoints && patrolPoints.length > 0) {
                        const idx = (bb.get<number>('patrolIndex') ?? 0) + 1;
                        bb.set('patrolIndex', idx % patrolPoints.length);
                        bb.set('targetPos', patrolPoints[idx % patrolPoints.length]);
                    } else {
                        bb.set('targetPos', null);
                    }
                } else {
                    bb.set('targetPos', null);
                }
            }
        }
    }
}

export const btManager = new BTManager();
