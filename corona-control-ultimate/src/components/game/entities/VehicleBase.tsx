import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEngineLoop } from '@/core/EngineLoopManager';

interface VehicleBaseProps {
    position: [number, number, number];
    rotation: [number, number, number];
    color?: string;
    type: 'POLICE_CAR' | 'WATER_CANNON' | 'CIVILIAN_CAR';
    health?: number;
}

/**
 * VehicleBase (V7.0)
 * Technisches Fundament für alle fahrbaren Einheiten im Wien-Szenario.
 * Integriert in den 120Hz Physik-Loop für präzises Fahrverhalten.
 */
export const VehicleBase: React.FC<VehicleBaseProps> = ({
    position,
    rotation,
    color = '#ffffff',
    type,
    health = 100
}) => {
    const meshRef = useRef<THREE.Group>(null);
    const bodyRef = useRef<THREE.Mesh>(null);

    // V7.0 Physics State
    const vehicleState = useMemo(() => ({
        speed: 0,
        steering: 0,
        targetSpeed: 0,
        targetSteering: 0
    }), []);

    // 120Hz Physics Calculation Update
    useEngineLoop({
        onPhysics: (dt) => {
            if (!meshRef.current) return;

            // Interpolate Speed & Steering for stability
            vehicleState.speed = THREE.MathUtils.lerp(vehicleState.speed, vehicleState.targetSpeed, dt * 5);
            vehicleState.steering = THREE.MathUtils.lerp(vehicleState.steering, vehicleState.targetSteering, dt * 10);

            // Movement Logic (Simplified for V7.0 Base)
            // Hier greift später die Rapier-Chassis-Simulation
        },
        onAI: () => {
            // Pathfinding oder NPC-Fahrverhalten hier triggern
        }
    });

    useFrame((_state, delta) => {
        if (meshRef.current) {
            // Smooth Rendering Sync
            meshRef.current.position.lerp(new THREE.Vector3(...position), delta * 15);

            const targetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation));
            meshRef.current.quaternion.slerp(targetQuat, delta * 10);
        }
    });

    return (
        <group ref={meshRef} position={position}>
            {/* Karosserie Placeholder (V7.0 Box/Hull) */}
            <mesh ref={bodyRef} castShadow receiveShadow>
                <boxGeometry args={[2, 1.2, 4.5]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.4}
                    metalness={0.8}
                    envMapIntensity={1}
                />
            </mesh>

            {/* Dach-Details (Sirene oder Wasserwerfer-Basis) */}
            <mesh position={[0, 0.7, 0.5]}>
                <boxGeometry args={[1.5, 0.4, 2]} />
                <meshStandardMaterial color="#222222" />
            </mesh>

            {/* Vorderlichter / Rücklichter Sims */}
            <pointLight position={[0.8, 0, 2.3]} intensity={0.5} distance={5} color="white" />
            <pointLight position={[-0.8, 0, 2.3]} intensity={0.5} distance={5} color="white" />

            {/* Debug Helper für Dev-Modus */}
            {import.meta.env.DEV && (
                <axesHelper args={[2]} />
            )}
        </group>
    );
};
