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

        const time = state.clock.elapsedTime;

        // Reset all matrices to hide unused instances (scale 0)
        for (let i = npcs.length; i < 500; i++) {
            tempObject.position.set(0, -100, 0);
            tempObject.scale.set(0, 0, 0);
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);
        }

        npcs.forEach((npc, i) => {
            if (i >= 500) return;

            // 1. Position-Sync
            tempObject.position.set(npc.position[0], npc.position[1], npc.position[2]);
            
            // Animation: Leichtes Wippen/Tanzen vor der Bühne
            const distToStage = Math.sqrt(
                Math.pow(npc.position[0], 2) + 
                Math.pow(npc.position[2] - (-50), 2)
            );
            
            if (distToStage < 40) {
                // Bobbing animation based on distance to stage (simulating rhythm)
                const freq = 2 + (Math.sin(time * 0.5) * 0.5);
                const bob = Math.sin(time * 8 + i) * 0.05;
                tempObject.position.y += Math.max(0, bob);
                
                // Slight swaying
                tempObject.rotation.z = Math.sin(time * 4 + i) * 0.05;
            } else {
                tempObject.rotation.z = 0;
            }

            tempObject.rotation.y = npc.rotation;
            tempObject.scale.set(1, 1, 1);
            tempObject.updateMatrix();
            meshRef.current!.setMatrixAt(i, tempObject.matrix);

            // 2. Emotionale Visualisierung
            if (npc.emotions.current === EmotionalState.AGGRESSIVE) {
                tempColor.set('#ff3333');
            } else if (npc.emotions.current === EmotionalState.STRESSED) {
                tempColor.set('#8888ff');
            } else if (npc.type === 'POLICE') {
                tempColor.set('#112244');
            } else {
                tempColor.set('#ffffff');
            }
            meshRef.current!.setColorAt(i, tempColor);
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
