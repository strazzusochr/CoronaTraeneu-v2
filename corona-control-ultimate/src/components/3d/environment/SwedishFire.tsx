import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointLight, Group } from 'three';
import { useGameStore } from '@/stores/gameStore';

interface SwedishFireProps {
    position: [number, number, number];
    scale?: number;
}

export const SwedishFire: React.FC<SwedishFireProps> = ({ position, scale = 1 }) => {
    const lightRef = useRef<PointLight>(null);
    const fireMeshRef = useRef<Group>(null);
    
    const dayTime = useGameStore((state) => state.gameState.dayTime);
    
    // Dunkelheit definieren (z.B. nach 19 Uhr oder vor 6 Uhr)
    const hours = dayTime / 60;
    const isNight = hours > 19 || hours < 6;
    
    const logs = useMemo(() => {
        return [
            { pos: [0, 0.4, 0], height: 0.8, rot: 0 },
            { pos: [0.15, 0.3, 0.1], height: 0.6, rot: 0.1 },
            { pos: [-0.1, 0.5, 0.15], height: 1.0, rot: -0.1 },
        ];
    }, []);

    useFrame((state) => {
        if (!isNight) {
            if (lightRef.current) lightRef.current.intensity = 0;
            return;
        }
        
        // Flacker-Effekt für das Licht
        if (lightRef.current) {
            const time = state.clock.elapsedTime;
            // Basis-Intensität + Flackern durch Sinus-Überlagerungen
            const flicker = Math.sin(time * 15) * 0.1 + Math.sin(time * 25) * 0.05 + Math.random() * 0.1;
            lightRef.current.intensity = 1.5 + flicker;
        }

        // Simuliere kleine Flammenbewegung durch Skalieren/Rotieren der "Feuer"-Meshes
        if (fireMeshRef.current) {
            const time = state.clock.elapsedTime;
            fireMeshRef.current.scale.y = 1 + Math.sin(time * 20) * 0.2;
            fireMeshRef.current.scale.x = 1 + Math.sin(time * 15) * 0.1;
            fireMeshRef.current.scale.z = 1 + Math.cos(time * 17) * 0.1;
        }
    });

    return (
        <group position={position} scale={scale}>
            {/* Holzstämme (dunkel/angekohlt oben, Rinde seitlich) */}
            <group receiveShadow castShadow>
                {logs.map((log, i) => (
                    <mesh key={i} position={log.pos as [number, number, number]} rotation={[log.rot, i, log.rot]} castShadow>
                        <cylinderGeometry args={[0.12, 0.15, log.height, 8]} />
                        <meshStandardMaterial color="#3d2817" roughness={0.9} />
                    </mesh>
                ))}
            </group>

            {/* Feuer und Licht (nur nachts aktiv) */}
            {isNight && (
                <group position={[0, 1.0, 0]}>
                    <pointLight
                        ref={lightRef}
                        color="#ff6600"
                        distance={15}
                        decay={2}
                        intensity={1.5}
                        castShadow={false}
                    />
                    
                    {/* Flammen-Geometrie (simplifiziert) */}
                    <group ref={fireMeshRef}>
                        <mesh position={[0, 0, 0]}>
                            <coneGeometry args={[0.2, 0.6, 5]} />
                            <meshBasicMaterial color="#ffaa00" transparent opacity={0.8} />
                        </mesh>
                        <mesh position={[0.05, -0.1, 0.05]}>
                            <coneGeometry args={[0.15, 0.4, 4]} />
                            <meshBasicMaterial color="#ff3300" transparent opacity={0.9} />
                        </mesh>
                        <mesh position={[-0.05, -0.15, -0.05]}>
                            <coneGeometry args={[0.1, 0.3, 4]} />
                            <meshBasicMaterial color="#ffdd00" transparent opacity={0.7} />
                        </mesh>
                    </group>
                </group>
            )}
        </group>
    );
};
