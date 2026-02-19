import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEngineLoop } from '@/core/EngineLoopManager';
import { VehiclePhysics } from '@/systems/VehiclePhysics';
import { Siren } from '@/components/3d/entities/Siren';
import AudioManager, { AudioLayer } from '@/managers/AudioManager';

interface VehicleBaseProps {
    position: [number, number, number];
    rotation: [number, number, number];
    color?: string;
    type: 'POLICE_CAR' | 'WATER_CANNON' | 'CIVILIAN_CAR' | 'AMBULANCE' | 'FIRE_TRUCK' | 'VAN';
    health?: number;
    hasSiren?: boolean;
    isSirenActive?: boolean;
}

/**
 * VEH-002: Vehicle
 * Base component for all vehicles, integrating physics and sirens.
 */
export const VehicleBase: React.FC<VehicleBaseProps> = ({
    position: initialPosition,
    rotation: initialRotation,
    color = '#ffffff',
    type,
    health = 100,
    hasSiren = false,
    isSirenActive = false
}) => {
    const meshRef = useRef<THREE.Group>(null);
    const bodyRef = useRef<THREE.Mesh>(null);
    const currentPos = useRef(new THREE.Vector3(...initialPosition));
    const currentRot = useRef(new THREE.Euler(...initialRotation));
    const sirenAudioRef = useRef<any>(null);

    // Siren Audio Logic
    React.useEffect(() => {
        if (isSirenActive && hasSiren) {
            sirenAudioRef.current = AudioManager.playSound('siren_loop', AudioLayer.EVENT, { 
                pos: [currentPos.current.x, currentPos.current.y, currentPos.current.z],
                loop: true 
            });
        } else {
            if (sirenAudioRef.current) {
                sirenAudioRef.current.pause();
                sirenAudioRef.current = null;
            }
        }

        return () => {
            if (sirenAudioRef.current) {
                sirenAudioRef.current.pause();
            }
        };
    }, [isSirenActive, hasSiren]);

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

            // 1. Calculate new speed and steering
            const { speed, steering } = VehiclePhysics.calculateMovement(
                vehicleState.speed,
                vehicleState.targetSpeed,
                vehicleState.steering,
                vehicleState.targetSteering,
                dt
            );
            vehicleState.speed = speed;
            vehicleState.steering = steering;

            // 2. Update transform
            const { position, rotation } = VehiclePhysics.updateTransform(
                currentPos.current,
                currentRot.current,
                speed,
                steering,
                dt
            );
            
            // Sync refs
            currentPos.current = position;
            currentRot.current = rotation;
        },
        onAI: () => {
            // Placeholder for AI driving logic
        }
    });

    useFrame((_state, delta) => {
        if (meshRef.current) {
            // Smooth Rendering Sync
            meshRef.current.position.copy(currentPos.current);
            meshRef.current.quaternion.setFromEuler(currentRot.current);
        }
    });

    return (
        <group ref={meshRef}>
            {/* Karosserie Placeholder (V7.0 Box/Hull) */}
            <mesh ref={bodyRef} castShadow receiveShadow>
                <boxGeometry args={[2, 1.2, 4.5]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.4}
                    metalness={0.8}
                />
            </mesh>

            {/* Siren System */}
            {hasSiren && (
                <group position={[0, 0.7, 0]}>
                    <Siren active={isSirenActive} />
                </group>
            )}

            {/* Lights */}
            <pointLight position={[0.8, 0, 2.3]} intensity={0.5} distance={5} color="white" />
            <pointLight position={[-0.8, 0, 2.3]} intensity={0.5} distance={5} color="white" />
        </group>
    );
};
