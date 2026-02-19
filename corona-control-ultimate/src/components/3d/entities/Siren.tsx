import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SirenProps {
    active: boolean;
    color1?: string;
    color2?: string;
}

export const getSirenIntensities = (isActive: boolean, time: number): [number, number] => {
    if (!isActive) return [0, 0];
    const flash = Math.sin(time * 10) > 0;
    return flash ? [5, 0] : [0, 5];
};

/**
 * VEH-012: Siren
 * Visual siren effects for emergency vehicles.
 */
export const Siren: React.FC<SirenProps> = ({ 
    active, 
    color1 = "#0000ff", 
    color2 = "#ff0000" 
}) => {
    const lightRef1 = React.useRef<THREE.PointLight>(null);
    const lightRef2 = React.useRef<THREE.PointLight>(null);

    const intensities = React.useRef<[number, number]>([0, 0]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        intensities.current = getSirenIntensities(active, t);
        if (lightRef1.current) lightRef1.current.intensity = intensities.current[0];
        if (lightRef2.current) lightRef2.current.intensity = intensities.current[1];
    });

    return (
        <group>
            <pointLight ref={lightRef1} color={color1} distance={10} decay={2} position={[-0.5, 0.5, 0]} />
            <pointLight ref={lightRef2} color={color2} distance={10} decay={2} position={[0.5, 0.5, 0]} />
            
            {/* Visual Mesh for the siren bar */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[1.2, 0.2, 0.3]} />
                <meshStandardMaterial color="#333333" />
            </mesh>
        </group>
    );
};

export default Siren;
