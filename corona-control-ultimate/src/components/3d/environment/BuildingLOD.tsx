import React from 'react';
import { Detailed } from '@react-three/drei';
import Building from './Building';

interface BuildingLODProps {
    position: [number, number, number];
    type?: 'residential' | 'commercial' | 'landmark';
}

/**
 * ENV-003: BuildingLOD
 * Implements Level of Detail for buildings to optimize performance.
 */
export const BuildingLOD: React.FC<BuildingLODProps> = ({ position, type }) => {
    return (
        <Detailed distances={[0, 50, 150]} position={position}>
            {/* High Detail */}
            <Building position={[0, 10, 0]} type={type} />
            
            {/* Medium Detail */}
            <mesh castShadow receiveShadow position={[0, 10, 0]}>
                <boxGeometry args={[10, 20, 10]} />
                <meshStandardMaterial color="#666666" />
            </mesh>
            
            {/* Low Detail (Billboard or very simple box) */}
            <mesh position={[0, 10, 0]}>
                <boxGeometry args={[10, 20, 10]} />
                <meshBasicMaterial color="#333333" />
            </mesh>
        </Detailed>
    );
};

export default BuildingLOD;
