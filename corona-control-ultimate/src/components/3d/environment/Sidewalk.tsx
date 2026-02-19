import React from 'react';
import * as THREE from 'three';

interface SidewalkProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    width?: number;
    length?: number;
}

/**
 * ENV-005: Sidewalk
 * Represents a sidewalk section.
 */
export const Sidewalk: React.FC<SidewalkProps> = ({ 
    position, 
    rotation = [-Math.PI / 2, 0, 0], 
    width = 3, 
    length = 100 
}) => {
    return (
        <mesh position={position} rotation={rotation} receiveShadow>
            <planeGeometry args={[width, length]} />
            <meshStandardMaterial color="#666666" roughness={0.9} />
        </mesh>
    );
};

export default Sidewalk;
