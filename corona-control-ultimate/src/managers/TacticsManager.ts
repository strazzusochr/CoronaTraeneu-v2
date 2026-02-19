
import { NPCAIController } from '@/ai/NPCAIController';
import * as THREE from 'three';
import GameEventSystem from '@/systems/GameEventSystem';
import { useGameStore } from '@/stores/gameStore';

class TacticsManager {
    private static instance: TacticsManager;
    private squads: Map<number, number[]> = new Map(); // SquadID -> NPC IDs
    private controllers: Map<number, NPCAIController> = new Map();
    private wallAnchors: Map<number, THREE.Vector3> = new Map(); // Stabilized anchor per squad

    private constructor() { }

    public static getInstance(): TacticsManager {
        if (!TacticsManager.instance) {
            TacticsManager.instance = new TacticsManager();
        }
        return TacticsManager.instance;
    }

    // Assigns loose police to a squad
    public registerPolice(npcId: number) {
        // Simple logic: Add to squad 1 for testing
        if (!this.squads.has(1)) this.squads.set(1, []);
        this.squads.get(1)!.push(npcId);
        console.log(`Registered Police ${npcId} to Squad 1`);
    }

    // Called by NPCAIController to register itself
    public registerController(controller: NPCAIController) {
        // Access context via any cast because it's private (in a clean arch we'd have a getter)
        const id = (controller as any).context.id;

        if (!this.squads.has(1)) this.squads.set(1, []);
        // Avoid duplicate
        const squad = this.squads.get(1);
        if (squad && !squad.includes(id)) {
            squad.push(id);
        }

        // Store controller Ref
        this.controllers.set(id, controller);
    }

    public unregisterController(id: number) {
        this.controllers.delete(id);
        const s = this.squads.get(1);
        if (s) {
            const idx = s.indexOf(id);
            if (idx > -1) s.splice(idx, 1);
        }
    }

    // Command: Form a line between A and B
    public formWall(start: [number, number, number], end: [number, number, number], squadId: number = 1, curvature: number = 0) {
        this.formWallInternal(start, end, squadId, curvature);
    }

    public commandCharge(squadId: number = 1) {
        const squad = this.squads.get(squadId);
        if (!squad) return;

        for (const id of squad) {
            this.commandNpc(id, 'CHARGE');
        }
    }

    private executeCommandInternal(id: number, command: 'FORM' | 'CHARGE', pos?: [number, number, number]) {
        const ctrl = this.controllers.get(id);
        if (ctrl) {
            if (command === 'FORM' && pos) {
                ctrl.orderFormation(new THREE.Vector3(...pos));
            } else if (command === 'CHARGE') {
                ctrl.orderCharge();
            }
        }
    }

    private commandNpc(id: number, command: 'FORM' | 'CHARGE', data?: any) {
        this.executeCommandInternal(id, command, data);
    }

    public formWallInternal(start: [number, number, number], end: [number, number, number], squadId: number, curvature: number = 0) {
        const squad = this.squads.get(squadId);
        if (!squad) return;

        const count = squad.length;
        const startVec = new THREE.Vector3(...start);
        const endVec = new THREE.Vector3(...end);
        const mid = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
        const half = new THREE.Vector3().subVectors(endVec, startVec).multiplyScalar(0.5);

        // Hazard-aware anchor adjustment (6m radius, 3m retreat)
        const now = performance.now();
        const stimuli = GameEventSystem.getInstance().getActiveStimuli(now);
        let nearest: { dx: number, dz: number, d2: number } | null = null;
        for (const s of stimuli) {
            if (!(s.tags && (s.tags.includes('FIRE') || s.tags.includes('EXPLOSION') || s.tags.includes('GAS') || s.tags.includes('MOLOTOV') || s.tags.includes('TEARGAS')))) continue;
            const dx = s.position[0] - mid.x;
            const dz = s.position[2] - mid.z;
            const d2 = dx * dx + dz * dz;
            if (!nearest || d2 < nearest.d2) nearest = { dx, dz, d2 };
        }
        let desiredAnchor = mid.clone();
        if (nearest && nearest.d2 < 36) { // 6m
            const dist = Math.max(0.001, Math.sqrt(nearest.d2));
            desiredAnchor.x -= (nearest.dx / dist) * 3.0;
            desiredAnchor.z -= (nearest.dz / dist) * 3.0;
        }

        // Smooth anchor to avoid jitter (max 2m per command)
        const prev = this.wallAnchors.get(squadId) ?? desiredAnchor.clone();
        const move = new THREE.Vector3().subVectors(desiredAnchor, prev);
        const maxStep = 2.0;
        if (move.length() > maxStep) {
            move.setLength(maxStep);
        }
        const anchor = prev.clone().add(move);
        this.wallAnchors.set(squadId, anchor.clone());

        // Recompute wall endpoints around the stabilized anchor
        const newStart = new THREE.Vector3().subVectors(anchor, half);
        const newEnd = new THREE.Vector3().addVectors(anchor, half);

        const wallDir = new THREE.Vector3().subVectors(newEnd, newStart).normalize();
        const normal = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), wallDir).normalize();
        const tension = useGameStore.getState().tensionLevel;
        const echelon = tension > 70 ? 0.4 : 0.0;

        for (let i = 0; i < count; i++) {
            const t = count > 1 ? i / (count - 1) : 0.5;
            const basePos = new THREE.Vector3().lerpVectors(newStart, newEnd, t);

            const curveFactor = curvature > 0 ? (-4 * (t - 0.5) * (t - 0.5) + 1) : 0;
            const halfLen = half.length();
            const curveOffset = normal.clone().multiplyScalar(curvature * curveFactor * (halfLen * 0.2));

            const echelonOffset = normal.clone().multiplyScalar(i * echelon);
            const slotPos = basePos.add(curveOffset).add(echelonOffset);

            this.executeCommandInternal(squad[i], 'FORM', [slotPos.x, slotPos.y, slotPos.z]);
        }
    }
}

export default TacticsManager;
