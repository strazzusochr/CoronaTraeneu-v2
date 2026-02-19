import React from 'react';
import * as THREE from 'three';

interface StreetProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    width?: number;
    length?: number;
}

/**
 * ENV-004: Street
 * Represents a street section.
 */
export const Street: React.FC<StreetProps> = ({ 
    position, 
    rotation = [-Math.PI / 2, 0, 0], 
    width = 10, 
    length = 100 
}) => {
    return (
        <mesh position={position} rotation={rotation} receiveShadow>
            <planeGeometry args={[width, length]} />
            <meshStandardMaterial color="#333333" roughness={0.8} />
        </mesh>
    );
};

export default Street;
