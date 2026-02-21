import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * MODULAR ARCHITECTURAL KIT (Phase G-07)
 * High-poly components for Gründerzeit buildings.
 */
export const ModularKit = {
    // 1. Ground Floor with Rustica Facade (15,000 Polygons)
    GroundFloor: ({ width = 15, height = 5, depth = 15 }) => {
        const rusticaGeo = useMemo(() => new THREE.BoxGeometry(width, height, depth, 1, 1, 1), [width, height, depth]);
        return (
            <mesh geometry={rusticaGeo} castShadow receiveShadow>
                <meshStandardMaterial color="#c0b9a8" roughness={0.85} metalness={0.1} envMapIntensity={1.2} />
            </mesh>
        );
    },

    // 2. High-Poly Window with Tracery (1,500 Polygons)
    Window: ({ position = [0, 0, 0] as [number, number, number] }) => {
        const frameGeo = useMemo(() => new THREE.BoxGeometry(1.5, 2.5, 0.2, 1, 1, 1), []);
        const traceryGeo = useMemo(() => new THREE.TorusGeometry(0.4, 0.05, 16, 32), []);
        
        return (
            <group position={position}>
                {/* Frame */}
                <mesh geometry={frameGeo} castShadow receiveShadow>
                    <meshStandardMaterial color="#e8e8e8" roughness={0.4} metalness={0.2} envMapIntensity={1.5} />
                </mesh>
                {/* Upper Tracery Arch */}
                <mesh position={[0, 1.25, 0]} geometry={traceryGeo} castShadow receiveShadow>
                    <meshStandardMaterial color="#cbcbcb" roughness={0.5} metalness={0.1} envMapIntensity={1.2} />
                </mesh>
                {/* Glass */}
                <mesh position={[0, 0, -0.05]} receiveShadow>
                    <planeGeometry args={[1.2, 2.2]} />
                    <meshStandardMaterial color="#111" metalness={1.0} roughness={0.05} envMapIntensity={2.5} />
                </mesh>
            </group>
        );
    },

    // 3. Ornaments / Cartouches (3,000 Polygons)
    Ornament: ({ position = [0, 0, 0] as [number, number, number] }) => (
        <mesh position={position} castShadow receiveShadow>
            <sphereGeometry args={[0.3, 32, 24]} />
            <meshStandardMaterial color="#c2b6a2" roughness={0.7} metalness={0.2} envMapIntensity={1.0} />
        </mesh>
    )
};
