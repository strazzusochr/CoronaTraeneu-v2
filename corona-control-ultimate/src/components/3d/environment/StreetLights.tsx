import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTimeEngine } from '@/core/TimeEngine';

interface StreetLightProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    intensity?: number;
    color?: string;
}

/**
 * ENV-013: StreetLights (V7.0)
 * Functional street lights with point lights, flicker and time-sync.
 */
export const StreetLight: React.FC<StreetLightProps> = ({ 
    position, 
    rotation = [0, 0, 0],
    intensity: baseIntensity = 5,
    color = "#fff5d7"
}) => {
    const lightRef = useRef<THREE.PointLight>(null);
    const emissiveRef = useRef<THREE.MeshStandardMaterial>(null);
    const gameTime = useTimeEngine(state => state.gameTimeSeconds);
    
    // Seed-based offset for staggered flicker (pure for the same position)
    const flickerOffset = useMemo(() => (position[0] * 12.9898 + position[2] * 78.233) % 100, [position]);
    
    // Night logic: 18:00 (64800s) to 06:00 (21600s)
    const isNight = gameTime > 64800 || gameTime < 21600;

    useFrame((state) => {
        if (!lightRef.current || !emissiveRef.current) return;
        
        if (!isNight) {
            lightRef.current.intensity = 0;
            emissiveRef.current.emissiveIntensity = 0;
            return;
        }

        // Realistic staggered flicker (Phase 3.2 compliance)
        const t = state.clock.elapsedTime + flickerOffset;
        const flicker = 0.95 + Math.sin(t * 10) * 0.05 + Math.sin(t * 41) * 0.02;
        
        lightRef.current.intensity = baseIntensity * flicker;
        emissiveRef.current.emissiveIntensity = 2 * flicker;
    });

    return (
        <group position={position} rotation={rotation}>
            {/* Pole */}
            <mesh castShadow>
                <cylinderGeometry args={[0.1, 0.15, 6, 8]} />
                <meshStandardMaterial color="#222222" />
            </mesh>
            
            {/* Arm */}
            <mesh position={[0.5, 3, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
                <meshStandardMaterial color="#222222" />
            </mesh>
            
            {/* Lamp Head */}
            <mesh position={[1, 3, 0]}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color="#333333" />
            </mesh>
            
            {/* The actual light */}
            <pointLight 
                ref={lightRef}
                position={[1, 2.8, 0]} 
                intensity={0} 
                color={color} 
                distance={15} 
                decay={2}
                castShadow={false}
            />
            
            {/* Emissive part of the lamp */}
            <mesh position={[1, 2.85, 0]}>
                <planeGeometry args={[0.3, 0.2]} />
                <meshStandardMaterial ref={emissiveRef} emissive={color} emissiveIntensity={0} />
            </mesh>
        </group>
    );
};

export default StreetLight;
