import React from 'react';
import * as THREE from 'three';

interface PropProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    type: 'trash_can' | 'bench' | 'bollard' | 'news_stand';
}

/**
 * ENV-006: Props
 * Small environmental objects like trash cans, benches, etc.
 */
export const Props: React.FC<PropProps> = ({ 
    position, 
    rotation = [0, 0, 0], 
    type 
}) => {
    return (
        <group position={position} rotation={rotation}>
            {type === 'trash_can' && (
                <mesh castShadow>
                    <cylinderGeometry args={[0.3, 0.3, 0.8, 16]} />
                    <meshStandardMaterial color="#444444" />
                </mesh>
            )}
            {type === 'bench' && (
                <mesh castShadow>
                    <boxGeometry args={[2, 0.5, 0.8]} />
                    <meshStandardMaterial color="#553311" />
                </mesh>
            )}
            {type === 'bollard' && (
                <mesh castShadow>
                    <cylinderGeometry args={[0.1, 0.1, 0.9, 8]} />
                    <meshStandardMaterial color="#111111" />
                </mesh>
            )}
            {type === 'news_stand' && (
                <mesh castShadow>
                    <boxGeometry args={[2, 2.5, 1.5]} />
                    <meshStandardMaterial color="#224422" />
                </mesh>
            )}
        </group>
    );
};

export default Props;
