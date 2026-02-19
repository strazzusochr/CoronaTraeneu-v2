import type { AIState } from '../StateMachine';
import GameEventSystem from '@/systems/GameEventSystem';

export class FormationHoldState implements AIState {
    name = 'FORMATION_HOLD';
    private targetPos: [number, number, number] | null = null;

    constructor(targetPos?: [number, number, number]) {
        if (targetPos) this.targetPos = targetPos;
    }

    enter(controller: any) {
        controller.npc.state = 'IDLE'; // Animation state
        // If targetPos was passed in constructor, use it. 
        // Otherwise assume it's set on controller or TacticsManager.
        if (!this.targetPos && controller.formationTarget) {
            this.targetPos = controller.formationTarget;
        }
    }

    update(controller: any, delta: number) {
        const now = performance.now();
        const stimuli = GameEventSystem.getInstance().getActiveStimuli(now);
        let nearest: { dx: number, dz: number, distSq: number } | null = null;
        for (const s of stimuli) {
            if (!(s.tags && (s.tags.includes('FIRE') || s.tags.includes('EXPLOSION') || s.tags.includes('GAS') || s.tags.includes('MOLOTOV') || s.tags.includes('TEARGAS')))) continue;
            const dx = s.position[0] - controller.npc.position[0];
            const dz = s.position[2] - controller.npc.position[2];
            const d2 = dx*dx + dz*dz;
            if (!nearest || d2 < nearest.distSq) {
                nearest = { dx, dz, distSq: d2 };
            }
        }

        const dangerRadius = 36; // 6m
        if (nearest && nearest.distSq < dangerRadius) {
            const dist = Math.max(0.001, Math.sqrt(nearest.distSq));
            const dirX = nearest.dx / dist;
            const dirZ = nearest.dz / dist;
            const retreatDist = 4.0;
            const safe: [number, number, number] = [
                controller.npc.position[0] - dirX * retreatDist,
                0.5,
                controller.npc.position[2] - dirZ * retreatDist
            ];
            controller.moveTo(safe, 3.5, delta);
            controller.npc.state = 'WALK';
            return;
        }

        if (this.targetPos) {
            const range = 0.5;
            const dx = controller.npc.position[0] - this.targetPos[0];
            const dz = controller.npc.position[2] - this.targetPos[2];
            const distSq = dx*dx + dz*dz;
            if (distSq > range * range) {
                controller.moveTo(this.targetPos, 3.5, delta);
                controller.npc.state = 'WALK';
            } else {
                controller.npc.state = 'IDLE';
            }
        }

        // 2. Break formation if authorized (e.g. attacked heavily) or commanded
        // For now, strict obedience.
    }

    exit(_controller: any) {}
}

export class ArrestState implements AIState {
    name = 'ARREST';
    enter(controller: any) {
        controller.npc.state = 'ATTACK'; 
    }
    update(_controller: any, _delta: number) {
        // Placeholder
    }
    exit(_controller: any) {}
}
