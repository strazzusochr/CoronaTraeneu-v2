import React from 'react';
import * as THREE from 'three';

interface GroundDecalProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    type: 'graffiti' | 'crack' | 'dirt';
}

/**
 * ENV-012: GroundDecals
 * Visual details on the ground surfaces.
 */
export const GroundDecals: React.FC<GroundDecalProps> = ({ 
    position, 
    rotation = [-Math.PI / 2, 0, 0], 
    type 
}) => {
    const getColor = () => {
        switch (type) {
            case 'graffiti': return '#ff00ff';
            case 'crack': return '#111111';
            case 'dirt': return '#332211';
            default: return '#ffffff';
        }
    };

    return (
        <mesh position={position} rotation={rotation} receiveShadow>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial 
                color={getColor()} 
                transparent 
                opacity={0.6} 
                depthWrite={false} 
            />
        </mesh>
    );
};

export default GroundDecals;
