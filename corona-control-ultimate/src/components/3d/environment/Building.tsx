import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createFacadeTexture } from '@/utils/ProceduralTextures';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

interface BuildingProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
    type?: 'residential' | 'commercial' | 'landmark';
    width?: number;
    height?: number;
    depth?: number;
    color?: string;
}

/**
 * ENV-002: Building
 * Represents a building in the city with Viennese style.
 */
export const Building: React.FC<BuildingProps> = ({ 
    position, 
    rotation = [0, 0, 0], 
    scale = [1, 1, 1],
    type = 'residential',
    width = 15,
    height = 25,
    depth = 15,
    color = '#E3D9C6'
}) => {
    const texture = useMemo(() => {
        const tex = createFacadeTexture(512, color);
        tex.repeat.set(width / 5, height / 5);
        return tex;
    }, [width, height, color]);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <RigidBody type="fixed" colliders={false}>
                <group>
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[width, height, depth]} />
                        <meshStandardMaterial 
                            map={texture}
                            color={type === 'landmark' ? '#fff' : '#fff'} 
                            roughness={0.7}
                            metalness={0.1}
                        />
                    </mesh>
                    <mesh position={[0, height / 2 + 1, 0]} rotation={[0, 0, 0]}>
                        <boxGeometry args={[width + 1, 2, depth + 1]} />
                        <meshStandardMaterial color="#444" />
                    </mesh>
                    <CuboidCollider args={[width / 2, height / 2, depth / 2]} />
                </group>
            </RigidBody>
        </group>
    );
};

export default Building;
