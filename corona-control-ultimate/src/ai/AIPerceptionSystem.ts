import * as THREE from 'three';
import { spatialGrid } from '@/systems/core/SpatialGridSystem';

/**
 * V6.0 AI PERCEPTION SYSTEM
 * 
 * vision: 120° FOV, 30m Range
 * hearing: 15m Range
 * memory: tracks 'seen' entities
 */

export class AIPerceptionSystem {
    public static canSee(npcId: string, npcPos: THREE.Vector3, targetPos: THREE.Vector3, fov: number = 120): boolean {
        const dist = npcPos.distanceTo(targetPos);
        if (dist > 30) return false;

        // Angle check
        // Simplified for 2D ground plane
        const dir = new THREE.Vector3().subVectors(targetPos, npcPos).normalize();
        const forward = new THREE.Vector3(0, 0, 1); // Assume look at Z+ for placeholder
        const angle = forward.angleTo(dir) * (180 / Math.PI);

        return angle < fov / 2;
    }

    public static getNearbyThreats(npcPos: THREE.Vector3, radius: number = 10): string[] {
        return spatialGrid.getEntitiesInRadius(npcPos.x, npcPos.z, radius);
    }
}
