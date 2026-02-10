import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEngineLoop } from '@/core/EngineLoopManager';
import { NPCState, NPCType } from '@/types/enums';

interface BaseCharacterProps {
    position: [number, number, number];
    rotation: number;
    scale?: number;
    color?: string;
    type: NPCType;
    state: NPCState;
    lodLevel?: number;
    isPlayer?: boolean;
}

/**
 * BaseCharacter (V7.0)
 * Technisches Fundament für alle High-Poly Charaktere im Corona Control Project.
 * Unterstützt LOD, Skeletal Animation Placeholders und Engine-Loop Integration.
 */
export const BaseCharacter: React.FC<BaseCharacterProps> = ({
    position,
    rotation,
    scale = 1,
    color = '#ffccaa',
    type,
    state,
    lodLevel = 0,
    isPlayer = false
}) => {
    const meshRef = useRef<THREE.Group>(null);
    const bodyRef = useRef<THREE.Mesh>(null);

    // V7.0 Animation State Logic
    const animationState = useMemo(() => ({
        mixer: null as THREE.AnimationMixer | null,
        currentAction: null as THREE.AnimationAction | null,
        nextAction: null as string | null
    }), []);

    // 120Hz Physics & Animation Update
    useEngineLoop({
        onPhysics: (dt) => {
            if (!meshRef.current) return;
            // Hier wird später die Rapier-Physik-Synchronisation stattfinden
        },
        onAI: () => {
            // KI-Logic Updates (10Hz) werden hier getriggert oder beobachtet
        }
    });

    useFrame((_state, delta) => {
        if (meshRef.current) {
            // Smooth Position & Rotation Interpolation
            meshRef.current.position.lerp(new THREE.Vector3(...position), delta * 15);

            // Handle Wrap-around for rotation
            const targetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rotation, 0));
            meshRef.current.quaternion.slerp(targetQuat, delta * 10);
        }
    });

    return (
        <group ref={meshRef} position={position} scale={[scale, scale, scale]}>
            {/* V7.0 LOD Placeholder: High-Poly Sim (Capsule + Head) */}
            <mesh ref={bodyRef} castShadow receiveShadow>
                <capsuleGeometry args={[0.4, 1, 4, 16]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.7}
                    metalness={0.1}
                    emissive={isPlayer ? '#003366' : '#000000'}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Kopf-Platzhalter für Blickrichtung */}
            <mesh position={[0, 0.8, 0.2]}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Debug-Info (Visualisierung der Achsen) */}
            {import.meta.env.DEV && (
                <axesHelper args={[1]} />
            )}
        </group>
    );
};
