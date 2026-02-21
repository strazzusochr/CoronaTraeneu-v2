import React, { Suspense } from 'react';
import Stephansdom from '../../buildings/Stephansdom';

interface LandmarkViennaProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    landmarkId?: 'stephansdom' | 'opera' | 'rathaus';
}

/**
 * ENV-011: LandmarkVienna
 * Wrapper for Viennese landmarks.
 */
export const LandmarkVienna: React.FC<LandmarkViennaProps> = ({ 
    position, 
    rotation = [0, 0, 0],
    landmarkId = 'stephansdom' 
}) => {
    return (
        <group position={position} rotation={rotation}>
            <Suspense fallback={null}>
                {landmarkId === 'stephansdom' && <Stephansdom />}
                {/* Add other landmarks as they are implemented */}
            </Suspense>
        </group>
    );
};

export default LandmarkVienna;
