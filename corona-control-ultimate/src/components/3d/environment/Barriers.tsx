import React from 'react';
import * as THREE from 'three';

interface BarrierProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    type?: 'police' | 'concrete' | 'fence';
}

/**
 * ENV-010: Barriers
 * Physical barriers for crowd control.
 */
export const Barriers: React.FC<BarrierProps> = ({ 
    position, 
    rotation = [0, 0, 0], 
    type = 'police' 
}) => {
    const getColor = () => {
        switch (type) {
            case 'police': return '#2222ff';
            case 'concrete': return '#999999';
            case 'fence': return '#cccccc';
            default: return '#333333';
        }
    };

    return (
        <group position={position} rotation={rotation}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[4, 1.2, 0.5]} />
                <meshStandardMaterial color={getColor()} />
            </mesh>
            {/* Feet/Supports */}
            <mesh position={[-1.5, -0.5, 0]}>
                <boxGeometry args={[0.2, 0.2, 1]} />
                <meshStandardMaterial color="#222222" />
            </mesh>
            <mesh position={[1.5, -0.5, 0]}>
                <boxGeometry args={[0.2, 0.2, 1]} />
                <meshStandardMaterial color="#222222" />
            </mesh>
        </group>
    );
};

export default Barriers;
