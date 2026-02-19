import React from 'react';
import * as THREE from 'three';

interface VegetationProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    type: 'tree' | 'bush' | 'flower_pot';
}

/**
 * ENV-007: Vegetation
 * Environmental greenery.
 */
export const Vegetation: React.FC<VegetationProps> = ({ 
    position, 
    rotation = [0, 0, 0], 
    type 
}) => {
    return (
        <group position={position} rotation={rotation}>
            {type === 'tree' && (
                <group>
                    {/* Trunk */}
                    <mesh castShadow>
                        <cylinderGeometry args={[0.2, 0.3, 4, 8]} />
                        <meshStandardMaterial color="#4d2911" />
                    </mesh>
                    {/* Foliage */}
                    <mesh position={[0, 3, 0]} castShadow>
                        <sphereGeometry args={[2, 8, 8]} />
                        <meshStandardMaterial color="#2d5a27" />
                    </mesh>
                </group>
            )}
            {type === 'bush' && (
                <mesh castShadow>
                    <sphereGeometry args={[0.8, 8, 8]} scale={[1, 0.7, 1]} />
                    <meshStandardMaterial color="#3d7a37" />
                </mesh>
            )}
            {type === 'flower_pot' && (
                <group>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.4, 0.3, 0.5, 8]} />
                        <meshStandardMaterial color="#8b4513" />
                    </mesh>
                    <mesh position={[0, 0.4, 0]}>
                        <sphereGeometry args={[0.3, 8, 8]} />
                        <meshStandardMaterial color="#228b22" />
                    </mesh>
                </group>
            )}
        </group>
    );
};

export default Vegetation;
