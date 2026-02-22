import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Detailed } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

/**
 * PETERSDOM (BASILICA DI SAN PIETRO)
 * High-fidelity AAA landmark for the Vatican/Rome setting.
 */
export const Petersdom: React.FC = () => {
    // 1. Main Basilica Base
    const baseGeo = useMemo(() => new THREE.BoxGeometry(80, 45, 120), []);
    
    // 2. The Great Dome (Cupola) - Profile for Lathe
    const domeProfile = useMemo(() => [
        new THREE.Vector2(20, 0),
        new THREE.Vector2(20, 5),    // Drum base
        new THREE.Vector2(20, 15),   // Drum top
        new THREE.Vector2(19.5, 20), // Start of curve
        new THREE.Vector2(18, 25),
        new THREE.Vector2(15, 30),
        new THREE.Vector2(10, 35),
        new THREE.Vector2(5, 38),
        new THREE.Vector2(0.1, 40)   // Tip (lantern base)
    ], []);
    const domeGeo = useMemo(() => new THREE.LatheGeometry(domeProfile, 32), [domeProfile]);

    // 3. Facade Columns
    const columnGeo = useMemo(() => new THREE.CylinderGeometry(1.2, 1.2, 35, 8), []);

    return (
        <RigidBody type="fixed" colliders={false}>
            {/* COLLIDERS */}
            <CuboidCollider position={[0, 22.5, 0]} args={[40, 22.5, 60]} />
            <CuboidCollider position={[0, 60, 0]} args={[20, 15, 20]} /> {/* Dome Bounding Box */}

            <Detailed distances={[0, 150, 400]} hysteresis={0.1}>
                {/* LOD-0: High Detail */}
                <group name="Petersdom_LOD0">
                    {/* Main Body */}
                    <mesh position={[0, 22.5, 0]} castShadow receiveShadow geometry={baseGeo}>
                        <meshStandardMaterial color="#d4c8b8" roughness={0.7} />
                    </mesh>

                    {/* The Dome */}
                    <group position={[0, 45, 0]}>
                        <mesh castShadow geometry={domeGeo}>
                            <meshStandardMaterial color="#7a7a7a" roughness={0.5} metalness={0.2} />
                        </mesh>
                        {/* Lantern on top */}
                        <mesh position={[0, 42, 0]}>
                            <cylinderGeometry args={[2, 2.5, 5, 12]} />
                            <meshStandardMaterial color="#d4c8b8" />
                        </mesh>
                    </group>

                    {/* Front Facade (simplified columns) */}
                    <group position={[0, 17.5, 61]}>
                        {[-30, -20, -10, 10, 20, 30].map((x, i) => (
                            <mesh key={i} position={[x, 0, 0]} castShadow geometry={columnGeo}>
                                <meshStandardMaterial color="#e8dfd2" />
                            </mesh>
                        ))}
                        {/* Pediment (Triangle) */}
                        <mesh position={[0, 22, 0]}>
                            <coneGeometry args={[40, 10, 4]} />
                            <meshStandardMaterial color="#d4c8b8" />
                        </mesh>
                    </group>
                </group>

                {/* LOD-1: Medium Detail */}
                <group name="Petersdom_LOD1">
                    <mesh position={[0, 22.5, 0]}>
                        <boxGeometry args={[80, 45, 120]} />
                        <meshStandardMaterial color="#d4c8b8" />
                    </mesh>
                    <mesh position={[0, 65, 0]}>
                        <sphereGeometry args={[25, 16, 12]} />
                        <meshStandardMaterial color="#7a7a7a" />
                    </mesh>
                </group>

                {/* LOD-2: Low Detail (Billboard Envelope) */}
                <group name="Petersdom_LOD2">
                    <mesh position={[0, 40, 0]}>
                        <boxGeometry args={[90, 80, 130]} />
                        <meshStandardMaterial color="#555" />
                    </mesh>
                </group>
            </Detailed>
        </RigidBody>
    );
};

export default Petersdom;
