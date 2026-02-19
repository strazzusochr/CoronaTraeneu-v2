import React, { useState } from 'react';
import * as THREE from 'three';

interface DestructibleProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    type: 'window' | 'crate' | 'fence';
    health?: number;
}

/**
 * ENV-009: Destructibles
 * Objects that can be damaged or destroyed.
 */
export const Destructibles: React.FC<DestructibleProps> = ({ 
    position, 
    rotation = [0, 0, 0], 
    type,
    health: initialHealth = 100
}) => {
    const [health, setHealth] = useState(initialHealth);
    const isDestroyed = health <= 0;

    const handleDamage = () => {
        setHealth(prev => Math.max(0, prev - 25));
    };

    if (isDestroyed) {
        return (
            <group position={position} rotation={rotation}>
                {/* Debris / Rubble */}
                <mesh>
                    <sphereGeometry args={[0.5, 4, 4]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </group>
        );
    }

    return (
        <group position={position} rotation={rotation} onClick={handleDamage}>
            {type === 'window' && (
                <mesh castShadow>
                    <planeGeometry args={[1.5, 2]} />
                    <meshStandardMaterial 
                        color="#88ccff" 
                        transparent 
                        opacity={0.5} 
                        roughness={0}
                        metalness={1}
                    />
                </mesh>
            )}
            {type === 'crate' && (
                <mesh castShadow>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#8b4513" />
                </mesh>
            )}
            {type === 'fence' && (
                <mesh castShadow>
                    <boxGeometry args={[3, 1, 0.1]} />
                    <meshStandardMaterial color="#444" wireframe />
                </mesh>
            )}
        </group>
    );
};

export default Destructibles;
