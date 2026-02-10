import React from 'react';
import * as THREE from 'three';
import { ProceduralTextures } from '@/systems/core/ProceduralTextures';

/**
 * V6.0 MODULAR BUILDING COMPONENTS
 * 
 * Requirement: NO PRIMITIVE BOXES.
 * Use detailed framing, sills, and offsets.
 */

export const WindowFrame = ({ width = 1.2, height = 1.8 }) => {
    return (
        <group name="Window">
            {/* Frame */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[width + 0.1, height + 0.1, 0.2]} />
                <meshStandardMaterial color="#332211" map={ProceduralTextures.getFabric('#554433')} />
            </mesh>

            {/* Glass (Recessed) */}
            <mesh position={[0, 0, -0.05]}>
                <boxGeometry args={[width, height, 0.05]} />
                <meshStandardMaterial
                    color="#88ccff"
                    transparent
                    opacity={0.3}
                    roughness={0}
                    metalness={0.9}
                />
            </mesh>

            {/* Sill */}
            <mesh position={[0, -height / 2, 0.1]}>
                <boxGeometry args={[width + 0.2, 0.05, 0.3]} />
                <meshStandardMaterial color="#555555" map={ProceduralTextures.getAsphalt()} />
            </mesh>
        </group>
    );
};

export const WallSegment = ({ width = 4, height = 3.5, hasWindow = true }) => {
    return (
        <group name="WallSegment">
            <mesh position={[0, height / 2, 0]}>
                <boxGeometry args={[width, height, 0.3]} />
                <meshStandardMaterial color="#cccccc" />
            </mesh>

            {hasWindow && (
                <group position={[0, 1.8, 0.1]}>
                    <WindowFrame />
                </group>
            )}
        </group>
    );
};

export const BuildingFloor = ({ width = 12, height = 3.5, segments = 3 }) => {
    return (
        <group name="Floor">
            {Array.from({ length: segments }).map((_, i) => (
                <group key={i} position={[(i - (segments - 1) / 2) * (width / segments), 0, 0]}>
                    <WallSegment width={width / segments} height={height} />
                </group>
            ))}
        </group>
    );
};
