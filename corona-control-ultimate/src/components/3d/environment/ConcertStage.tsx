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
        emissiveIntensity: 2 
    }), []);

    return (
        <group position={position} rotation={rotation}>
            {/* Haupt-Plattform */}
            <mesh position={[0, 1, 0]} receiveShadow castShadow>
                <boxGeometry args={[15, 2, 8]} />
                <primitive object={stageMaterial} attach="material" />
            </mesh>

            {/* Rückwand */}
            <mesh position={[0, 4.5, -3.8]} castShadow>
                <boxGeometry args={[14.5, 5, 0.2]} />
                <meshStandardMaterial color="#050505" />
            </mesh>

            {/* KILL THE BILL Banner */}
            <Text
                position={[0, 6, -3.6]}
                fontSize={1.2}
                color="#ff3c3c"
                anchorX="center"
                anchorY="middle"
            >
                KILL THE BILL
            </Text>
            <Text
                position={[0, 4.8, -3.6]}
                fontSize={0.4}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
            >
                LIVE AT STEPHANSPLATZ
            </Text>

            {/* Truss-System (Pfeiler) */}
            {[[-7, 4, 3.5], [7, 4, 3.5], [-7, 4, -3.5], [7, 4, -3.5]].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]}>
                    <cylinderGeometry args={[0.2, 0.2, 8, 8]} />
                    <primitive object={trussMaterial} attach="material" />
                </mesh>
            ))}

            {/* Dach-Truss */}
            <mesh position={[0, 8, 0]}>
                <boxGeometry args={[15, 0.4, 8]} />
                <primitive object={trussMaterial} attach="material" />
            </mesh>

            {/* Große Bildschirme (Seitlich) */}
            <mesh position={[-8.5, 4.5, 0]} rotation={[0, Math.PI / 4, 0]}>
                <boxGeometry args={[0.1, 5, 3]} />
                <primitive object={screenMaterial} attach="material" />
            </mesh>
            <mesh position={[8.5, 4.5, 0]} rotation={[0, -Math.PI / 4, 0]}>
                <boxGeometry args={[0.1, 5, 3]} />
                <primitive object={screenMaterial} attach="material" />
            </mesh>

            {/* Lautsprecher-Türme */}
            {[[-6, 4, 4.5], [6, 4, 4.5]].map((pos, i) => (
                <group key={i} position={pos as [number, number, number]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.5, 4, 1.5]} />
                        <meshStandardMaterial color="#000000" />
                    </mesh>
                    {/* Speaker Holes */}
                    {[1, 0, -1].map(y => (
                        <mesh key={y} position={[0, y * 1.2, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
                            <meshStandardMaterial color="#111111" />
                        </mesh>
                    ))}
                </group>
            ))}

            {/* Band-Mitglieder (Dummies) */}
            {/* Sänger */}
            <mesh position={[0, 2.9, 0]} castShadow>
                <capsuleGeometry args={[0.3, 1.2, 4, 8]} />
                <meshStandardMaterial color="#ff3c3c" />
            </mesh>
            {/* Gitarrist */}
            <mesh position={[-2.5, 2.9, -1]} castShadow>
                <capsuleGeometry args={[0.3, 1.2, 4, 8]} />
                <meshStandardMaterial color="#333333" />
            </mesh>
            {/* Bassist */}
            <mesh position={[2.5, 2.9, -1]} castShadow>
                <capsuleGeometry args={[0.3, 1.2, 4, 8]} />
                <meshStandardMaterial color="#333333" />
            </mesh>
            {/* Schlagzeuger */}
            <mesh position={[0, 2.9, -3]} castShadow>
                <boxGeometry args={[1.2, 1.2, 1.2]} />
                <meshStandardMaterial color="#555555" />
            </mesh>

            {/* Stage Lights (Visual only) */}
            {[[-5, 7.5, 3], [0, 7.5, 3], [5, 7.5, 3]].map((pos, i) => (
                <group key={i} position={pos as [number, number, number]}>
                    <mesh rotation={[Math.PI / 4, 0, 0]}>
                        <cylinderGeometry args={[0.3, 0.5, 0.8, 16]} />
                        <meshStandardMaterial color="#333" emissive={i === 1 ? "#ff0000" : "#00d2ff"} emissiveIntensity={5} />
                    </mesh>
                    <spotLight 
                        position={[0, 0, 0]} 
                        angle={0.5} 
                        penumbra={0.5} 
                        intensity={10} 
                        color={i === 1 ? "#ff0000" : "#00d2ff"} 
                        castShadow
                    />
                </group>
            ))}
        </group>
    );
};

export default ConcertStage;
