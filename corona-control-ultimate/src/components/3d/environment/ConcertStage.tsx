import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface ConcertStageProps {
    position: [number, number, number];
    rotation?: [number, number, number];
}

/**
 * ENV-020: ConcertStage
 * Eine große Event-Bühne für die Band "KILL THE BILL".
 * Mit Beleuchtung, Lautsprechern und Band-Mitgliedern.
 */
export const ConcertStage: React.FC<ConcertStageProps> = ({ 
    position, 
    rotation = [0, 0, 0] 
}) => {
    // Materialien
    const trussMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#222222', metalness: 0.8, roughness: 0.2 }), []);
    const stageMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111111', roughness: 0.9 }), []);
    const screenMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
        color: '#ffffff', 
        emissive: '#00d2ff', 
        emissiveIntensity: 3 
    }), []);
    const singerMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffcc00', emissive: '#aa5500', roughness: 0.3 }), []);
    const dancerMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ff22aa', emissive: '#550033', roughness: 0.4 }), []);

    // Animation / Zeit für dynamische Lichter (einfach über useFrame, falls gewollt, hier statisch bunt)

    return (
        <group position={position} rotation={rotation} scale={[1.8, 1.8, 1.8]}>
            {/* Haupt-Plattform */}
            <mesh position={[0, 1, 0]} receiveShadow castShadow>
                <boxGeometry args={[16, 2, 10]} />
                <primitive object={stageMaterial} attach="material" />
            </mesh>

            {/* Rückwand */}
            <mesh position={[0, 5.5, -4.8]} castShadow>
                <boxGeometry args={[15.5, 7, 0.2]} />
                <meshStandardMaterial color="#050505" />
            </mesh>

            {/* KILL THE BILL Banner */}
            <Text
                position={[0, 7.5, -4.6]}
                fontSize={1.8}
                color="#ff1111"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor="#ffaa00"
            >
                KILL THE BILL
            </Text>
            <Text
                position={[0, 5.8, -4.6]}
                fontSize={0.6}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
            >
                THE ULTIMATE RESISTANCE
            </Text>

            {/* Truss-System (Pfeiler) */}
            {[[-7.5, 5, 4.5], [7.5, 5, 4.5], [-7.5, 5, -4.5], [7.5, 5, -4.5]].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]}>
                    <cylinderGeometry args={[0.25, 0.25, 10, 8]} />
                    <primitive object={trussMaterial} attach="material" />
                </mesh>
            ))}

            {/* Dach-Truss */}
            <mesh position={[0, 10, 0]}>
                <boxGeometry args={[16, 0.5, 10]} />
                <primitive object={trussMaterial} attach="material" />
            </mesh>

            {/* Große Bildschirme (Seitlich) */}
            <mesh position={[-9.5, 5.5, 0]} rotation={[0, Math.PI / 5, 0]}>
                <boxGeometry args={[0.2, 6, 4]} />
                <primitive object={screenMaterial} attach="material" />
            </mesh>
            <mesh position={[9.5, 5.5, 0]} rotation={[0, -Math.PI / 5, 0]}>
                <boxGeometry args={[0.2, 6, 4]} />
                <primitive object={screenMaterial} attach="material" />
            </mesh>

            {/* Lautsprecher-Türme */}
            {[[-6.5, 4.5, 5.5], [6.5, 4.5, 5.5]].map((pos, i) => (
                <group key={i} position={pos as [number, number, number]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[2, 5, 2]} />
                        <meshStandardMaterial color="#000000" />
                    </mesh>
                    {/* Speaker Holes */}
                    {[1.5, 0, -1.5].map(y => (
                        <mesh key={y} position={[0, y, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.6, 0.6, 0.1, 16]} />
                            <meshStandardMaterial color="#111111" />
                        </mesh>
                    ))}
                </group>
            ))}

            {/* Band-Mitglieder */}
            
            {/* Leadsänger (Zentral) */}
            <mesh position={[0, 2.9, 2]} castShadow>
                <capsuleGeometry args={[0.35, 1.3, 4, 8]} />
                <primitive object={singerMaterial} attach="material" />
            </mesh>

            {/* Go-Go Tänzerinnen auf Podesten */}
            {[[-3.5, 2.5, 0], [3.5, 2.5, 0], [0, 2.8, -2]].map((pos, i) => (
                <group key={`gogo-${i}`} position={pos as [number, number, number]}>
                    {/* Podest */}
                    <mesh position={[0, 0, 0]} receiveShadow castShadow>
                        <cylinderGeometry args={[0.8, 0.8, 0.5, 16]} />
                        <meshStandardMaterial color={i === 2 ? "#cc00ff" : "#00ffff"} emissive={i === 2 ? "#330044" : "#003333"} />
                    </mesh>
                    {/* Tänzerin */}
                    <mesh position={[0, 1.1, 0]} castShadow>
                        <capsuleGeometry args={[0.25, 1.1, 4, 8]} />
                        <primitive object={dancerMaterial} attach="material" />
                    </mesh>
                </group>
            ))}

            {/* Dynamische Bunte Stage Lights */}
            {/* Vorne (Bunt) */}
            {[
                { pos: [-6, 9.5, 4], color: '#ff0055' },
                { pos: [-2, 9.5, 4.5], color: '#00ffaa' },
                { pos: [2, 9.5, 4.5], color: '#ffee00' },
                { pos: [6, 9.5, 4], color: '#aa00ff' }
            ].map((light, i) => (
                <group key={`light-f-${i}`} position={light.pos as [number, number, number]}>
                    <mesh rotation={[Math.PI / 3, 0, 0]}>
                        <cylinderGeometry args={[0.4, 0.6, 1, 16]} />
                        <meshStandardMaterial color="#222" emissive={light.color} emissiveIntensity={4} />
                    </mesh>
                    <spotLight 
                        position={[0, 0, 0]} 
                        target-position={[light.pos[0] * 0.5, 1, 0]}
                        angle={0.6} 
                        penumbra={0.8} 
                        intensity={15} 
                        color={light.color} 
                        castShadow
                    />
                </group>
            ))}

            {/* Hinten (Backlight/Laser) */}
            {[[-5, 2, -4.5], [0, 2, -4.5], [5, 2, -4.5]].map((pos, i) => (
                <pointLight key={`light-b-${i}`} position={pos as [number, number, number]} color={i === 1 ? "#ff0000" : "#0055ff"} intensity={25} distance={15} />
            ))}

        </group>
    );
};

export default ConcertStage;
