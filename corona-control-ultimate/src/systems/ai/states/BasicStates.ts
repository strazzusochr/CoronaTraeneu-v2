import type { AIState } from '../StateMachine';
import { useGameStore } from '@/stores/gameStore';
import GameEventSystem from '@/systems/GameEventSystem';

// Wir erweitern AIController temporär um Zugriff auf protected members zu erlauben 
// (In sauberer OOP wären getter/setter da, hier nutzen wir casting/any für Speed)

export class IdleState implements AIState {
    name = 'IDLE';
    private timer: number = 0;

    enter(controller: any) {
        controller.npc.state = 'IDLE';
        this.timer = 1 + Math.random() * 3; // 1-4s wait
    }

    update(controller: any, delta: number) {
        this.timer -= delta;
        
        // Transition Logic
        if (this.timer <= 0) {
            controller.stateMachine.changeState(new WanderState());
        }

        // Threat Detection (Perception Based)
        if (controller.npc.type === 'RIOTER') {
            const playerStimulus = controller.activeStimuli.find((s: any) => s.tags?.includes('PLAYER'));
            if (playerStimulus) {
                 controller.stateMachine.changeState(new AttackState());
            } else {
                const target = controller.memory.getBestTarget(['THROW','EXPLOSION','FIRE','TEARGAS','GAS','AUDIO']);
                if (target && Math.random() < 0.7) {
                    controller.stateMachine.changeState(new InvestigateState(target));
                    return;
                }
            }
        }
        
        // Optional: Police investigate with smaller chance
        if (controller.npc.type === 'POLICE') {
            const target = controller.memory.getBestTarget(['EXPLOSION','FIRE','TEARGAS','GAS','AUDIO']);
            if (target && Math.random() < 0.3) {
                controller.stateMachine.changeState(new InvestigateState(target));
                return;
            }
        }
    }

    exit(_controller: any) {}
}

export class WanderState implements AIState {
    name = 'WALK';
    private target: [number, number, number] | null = null;

    enter(controller: any) {
        controller.npc.state = 'WALK';
        // Pick random point in 15m radius
        const angle = Math.random() * Math.PI * 2;
        const r = 5 + Math.random() * 10;
        this.target = [
            controller.npc.position[0] + r * Math.cos(angle),
            0.5,
            controller.npc.position[2] + r * Math.sin(angle)
        ];
    }

    update(controller: any, delta: number) {
        if (!this.target) return;

        const reached = controller.moveTo(this.target, 2.0, delta); // Speed 2.0

        if (reached) {
            controller.stateMachine.changeState(new IdleState());
        }
    }

    exit(_controller: any) {
        this.target = null;
    }
}

export class AttackState implements AIState {
    name = 'ATTACK';
    private lastThrowTime: number = 0;
    private static readonly MIN_THROW_RANGE = 8;
    private static readonly MAX_THROW_RANGE = 35;
    private static readonly BASE_COOLDOWN_MAX = 4000;
    private static readonly BASE_COOLDOWN_MIN = 800;
    private static readonly COOLDOWN_TENSION_FACTOR = 25;
    private static readonly MOLOTOV_TENSION_THRESHOLD = 75;
    private static readonly MOLOTOV_CHANCE = 0.4;
    private static readonly MOLOTOV_SPEED = 7;
    private static readonly STONE_SPEED = 12;
    private static readonly MOLOTOV_ARC_Y = 5;
    private static readonly STONE_ARC_Y = 3;
    
    enter(controller: any) {
        controller.npc.state = 'ATTACK';
    }

    update(controller: any, delta: number) {
        // Check Perception for Player Update
        const playerStimulus = controller.activeStimuli.find((s: any) => s.tags?.includes('PLAYER'));
        
        if (playerStimulus) {
            // Update known position
            controller.lastPlayerPos = playerStimulus.position;
        }

        if (!controller.lastPlayerPos) {
            controller.stateMachine.changeState(new IdleState());
            return;
        }

        // Move to Player
        const reached = controller.moveTo(controller.lastPlayerPos, 4.5, delta); // Fast approach
        if (reached) { /* Attack logic would be here */ }

        // Give up if lost sight (no stimulus) AND distance is far
        // Assuming if we have stimulus, we "see" him.
        if (!playerStimulus && controller.distanceToPlayer > 20) {
             controller.stateMachine.changeState(new WanderState()); // Give up
             return;
        }

        if (controller.npc.type === 'RIOTER' && controller.lastPlayerPos) {
            const store = useGameStore.getState();
            const tension = store.tensionLevel;
            const now = performance.now();
            const dx = controller.lastPlayerPos[0] - controller.npc.position[0];
            const dz = controller.lastPlayerPos[2] - controller.npc.position[2];
            const dist = Math.sqrt(dx*dx + dz*dz);
            const minRange = AttackState.MIN_THROW_RANGE;
            const maxRange = AttackState.MAX_THROW_RANGE;
            const cooldownMs = Math.max(
                AttackState.BASE_COOLDOWN_MIN,
                AttackState.BASE_COOLDOWN_MAX - tension * AttackState.COOLDOWN_TENSION_FACTOR
            );

            if (dist >= minRange && dist <= maxRange && (now - this.lastThrowTime) > cooldownMs) {
                const dirX = dx / dist;
                const dirZ = dz / dist;
                const pos: [number, number, number] = [
                    controller.npc.position[0],
                    1.2,
                    controller.npc.position[2]
                ];
                const isMolotov = tension > AttackState.MOLOTOV_TENSION_THRESHOLD && Math.random() < AttackState.MOLOTOV_CHANCE;
                const speed = isMolotov ? AttackState.MOLOTOV_SPEED : AttackState.STONE_SPEED;
                const arcY = isMolotov ? AttackState.MOLOTOV_ARC_Y : AttackState.STONE_ARC_Y;
                const vel: [number, number, number] = [dirX * speed, arcY, dirZ * speed];

                store.addProjectile(pos, vel, isMolotov ? 'MOLOTOV' : 'STONE');
                GameEventSystem.getInstance().emit({
                    type: 'AUDIO',
                    position: pos,
                    sourceId: controller.npc.id,
                    intensity: 0.3,
                    timestamp: now,
                    tags: ['THROW']
                });

                this.lastThrowTime = now;
            }
        }
    }

    exit(_controller: any) {}
}

export class PanicState implements AIState {
    name = 'PANIC';
    private timer: number = 0;
    private escapeDir: [number, number, number] | null = null;

    enter(controller: any) {
        controller.npc.state = 'PANIC';
        this.timer = 5 + Math.random() * 5; // 5-10s panic
        
        // Pick escape direction (random for now, ideally away from danger)
        const angle = Math.random() * Math.PI * 2;
        this.escapeDir = [Math.sin(angle), 0, Math.cos(angle)];
    }

    update(controller: any, delta: number) {
        this.timer -= delta;
        if (this.timer <= 0) {
            controller.stateMachine.changeState(new IdleState());
            return;
        }

        if (this.escapeDir) {
            const target: [number, number, number] = [
                controller.npc.position[0] + this.escapeDir[0] * 5,
                0.5,
                controller.npc.position[2] + this.escapeDir[2] * 5
            ];
            controller.moveTo(target, 5.0, delta); // Fast Run (Speed 5)
        }
    }

    exit(_controller: any) {}
}

export class InvestigateState implements AIState {
    name = 'INVESTIGATE';
    private target: [number, number, number];
    private timer: number;
    constructor(target: [number, number, number]) {
        this.target = [target[0], target[1] || 0.5, target[2]];
        this.timer = 6.0; // seconds
    }
    enter(controller: any) {
        controller.npc.state = 'WALK';
    }
    update(controller: any, delta: number) {
        this.timer -= delta;
        const reached = controller.moveTo(this.target, 2.5, delta);
        // If we see the player while investigating, escalate
        const playerStimulus = controller.activeStimuli.find((s: any) => s.tags?.includes('PLAYER'));
        if (playerStimulus && controller.npc.type !== 'CIVILIAN') {
            controller.stateMachine.changeState(new AttackState());
            return;
        }
        if (reached || this.timer <= 0) {
            controller.stateMachine.changeState(new IdleState());
        }
    }
    exit(_controller: any) {}
}
