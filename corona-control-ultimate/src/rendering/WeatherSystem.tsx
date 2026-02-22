import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/stores/gameStore';

/**
 * WEATHER SYSTEM (Phase 3.4)
 * Handles Rain droplets, Fog intensity mapping, and Heatwave shimmer.
 */
export const WeatherSystem: React.FC = () => {
    // Currently, weather relies on the global tension & simple conditions
    // For AAA feel, we will implement Rain as a ParticleSystem
    const rainRef = useRef<THREE.Points>(null);
    const particleCount = 10000;

    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const vel = new Float32Array(particleCount * 3);
        const rand = (s: number) => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
        let seed = 12345;
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (rand(seed++) - 0.5) * 100;     // X: -50 to 50
            pos[i * 3 + 1] = rand(seed++) * 40;          // Y: 0 to 40
            pos[i * 3 + 2] = (rand(seed++) - 0.5) * 100; // Z: -50 to 50
            
            vel[i * 3] = 0;
            vel[i * 3 + 1] = - (rand(seed++) * 5 + 5);   // Fall speed
            vel[i * 3 + 2] = 0;
        }
        return [pos, vel];
    }, []);

    // Fetch weather flag from store mapping or tension logic
    // We'll simulate rain activating at Tension > 80 (Chaos)
    const globalTension = useGameStore(state => state.tensionLevel || 0);
    const isRaining = globalTension >= 80;

    useFrame((state, delta) => {
        if (!rainRef.current) return;
        
        // Hide points if not raining by pushing them far away or scaling size
        const mat = rainRef.current.material as THREE.PointsMaterial;
        mat.opacity = isRaining ? 0.6 : 0;
        mat.needsUpdate = true;

        if (!isRaining) return;

        const positionsArray = rainRef.current.geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < particleCount; i++) {
            // Apply velocity
            positionsArray[i * 3 + 1] += velocities[i * 3 + 1] * delta;
            
            // Loop rain droplets
            if (positionsArray[i * 3 + 1] < 0) {
                positionsArray[i * 3 + 1] = 40; // Reset height
                positionsArray[i * 3] = state.camera.position.x + (Math.random() - 0.5) * 80; // Keep around camera
                positionsArray[i * 3 + 2] = state.camera.position.z + (Math.random() - 0.5) * 80;
            }
        }
        
        rainRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={rainRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#aaaaaa"
                size={0.1}
                transparent
                opacity={0}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default WeatherSystem;
