import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpatialGrid } from '@/systems/core/SpatialGridSystem';
import { getFeatureState } from '@/core/FeatureFlags';
import { useGameStore } from '@/stores/gameStore';
import { EmotionalState } from '@/types/enums';

/**
 * V7.0 INSTANCED CROWD SYSTEM
 * Hocheffiziente Darstellung von Massen-NPCs basierend auf dem GameStore.
 */
export const InstancedCrowd = () => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const grid = useSpatialGrid();
    const npcs = useGameStore(state => state.npcs);
    const updateNpc = useGameStore(state => state.updateNpc);

    const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
    const tempObject = useMemo(() => new THREE.Object3D(), []);
    const tempColor = useMemo(() => new THREE.Color(), []);

    useFrame((state, delta) => {
        if (!getFeatureState('CROWD_500')) return;
        if (!meshRef.current) return;

        npcs.forEach((npc, i) => {
            if (i >= meshRef.current!.count) return;

            // 1. Position-Sync (Simple Velocity Simulation für V7.0 Placeholder)
            tempObject.position.set(npc.position[0], npc.position[1], npc.position[2]);

            // LookAt (Placeholder für Blickrichtung)
            tempObject.rotation.y = npc.rotation;
            tempObject.updateMatrix();
            meshRef.current!.setMatrixAt(i, tempObject.matrix);

            // 2. Emotionale Visualisierung
            // Aggressive NPCs leuchten leicht rot, gestresste NPCs bläulich
            if (npc.emotions.current === EmotionalState.AGGRESSIVE) {
                tempColor.set('#ff3333');
            } else if (npc.emotions.current === EmotionalState.STRESSED) {
                tempColor.set('#8888ff');
            } else {
                tempColor.set('#ffffff');
            }
            meshRef.current!.setColorAt(i, tempColor);

            // 3. Grid Sync (Throttled via NPC Index & Time)
            if ((state.clock.elapsedTime * 10 + i) % 10 < 1) {
                const vx = npc.velocity[0];
                const vz = npc.velocity[2];
                // Update position logic (simplified for placeholder)
                const nextPos: [number, number, number] = [
                    npc.position[0] + vx * delta,
                    npc.position[1],
                    npc.position[2] + vz * delta
                ];
                // In einer echten V7.0 Engine würde hier der Physik-Loop greifen
                // Wir synchronisieren hier nur den Grid-Zustand für die KI
                grid.updateEntity(`npc_${npc.id}`, npc.position, nextPos);
            }
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, 500]} castShadow receiveShadow>
            <capsuleGeometry args={[0.3, 1.2, 4, 8]} />
            <meshStandardMaterial />
        </instancedMesh>
    );
};
