import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getFeatureState } from '@/core/FeatureFlags';

/**
 * V6.0 LOD (Level of Detail) System
 * 
 * Levels:
 * 0: < 15m (Full Details)
 * 1: 15-30m (Reduced Physics)
 * 2: 30-60m (Low Poly)
 * 3: 60-100m (Static/Billboard)
 * 4: > 100m (Culled)
 */

interface LODProps {
    position: [number, number, number];
    children: (lod: number) => React.ReactNode;
}

export const LODSystem: React.FC<LODProps> = ({ position, children }) => {
    const [lodLevel, setLodLevel] = React.useState(0);
    const posVector = useMemo(() => new THREE.Vector3(...position), [position]);

    useFrame((state) => {
        if (!getFeatureState('LOD_SYSTEM')) return;

        const distance = state.camera.position.distanceTo(posVector);

        let newLevel = 0;
        if (distance > 100) newLevel = 4;
        else if (distance > 60) newLevel = 3;
        else if (distance > 30) newLevel = 2;
        else if (distance > 15) newLevel = 1;

        if (newLevel !== lodLevel) {
            setLodLevel(newLevel);
        }
    });

    return (
        <group position={position}>
            {children(lodLevel)}
        </group>
    );
};
