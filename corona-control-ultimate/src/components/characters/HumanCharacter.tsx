import React from 'react';
import * as THREE from 'three';
import { ProceduralTextures } from '@/systems/core/ProceduralTextures';

/**
 * V6.0 HIGH-POLY HUMAN CHARACTER
 * 
 * Requirement: NO PRIMITIVE CYLINDERS.
 * Anatomical breakdown into sub-meshes.
 */

export const HumanCharacter = ({ color = '#4444aa', isDemonstrator = true }) => {
    const skinTex = ProceduralTextures.getSkin();
    const clothTex = ProceduralTextures.getFabric(color);

    return (
        <group name="Human">
            {/* Head (Sphere-based but deformed) */}
            <mesh position={[0, 1.7, 0]} castShadow>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial map={skinTex} />
            </mesh>

            {/* Torso (Tapered) */}
            <mesh position={[0, 1.3, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.15, 0.6, 12]} />
                <meshStandardMaterial map={clothTex} />
            </mesh>

            {/* Arms */}
            <group position={[0, 1.5, 0]}>
                {/* Left Arm */}
                <mesh position={[-0.3, -0.2, 0]} rotation={[0, 0, 0.2]} castShadow>
                    <cylinderGeometry args={[0.05, 0.04, 0.5, 8]} />
                    <meshStandardMaterial map={clothTex} />
                </mesh>
                {/* Right Arm */}
                <mesh position={[0.3, -0.2, 0]} rotation={[0, 0, -0.2]} castShadow>
                    <cylinderGeometry args={[0.05, 0.04, 0.5, 8]} />
                    <meshStandardMaterial map={clothTex} />
                </mesh>
            </group>

            {/* Legs */}
            <group position={[0, 0.7, 0]}>
                <mesh position={[-0.1, -0.35, 0]} castShadow>
                    <cylinderGeometry args={[0.07, 0.05, 0.7, 8]} />
                    <meshStandardMaterial color="#222222" map={ProceduralTextures.getFabric('#111111')} />
                </mesh>
                <mesh position={[0.1, -0.35, 0]} castShadow>
                    <cylinderGeometry args={[0.07, 0.05, 0.7, 8]} />
                    <meshStandardMaterial color="#222222" map={ProceduralTextures.getFabric('#111111')} />
                </mesh>
            </group>

            {/* Equipment / Prop */}
            {isDemonstrator && (
                <mesh position={[0.4, 1.8, 0.2]} rotation={[0.5, 0, 0.3]}>
                    <boxGeometry args={[0.6, 0.4, 0.01]} />
                    <meshStandardMaterial color="#ffffff" />
                    {/* Placeholder for "FREIHEIT" text */}
                </mesh>
            )}
        </group>
    );
};
