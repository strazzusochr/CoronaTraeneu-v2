import React from 'react';
import * as THREE from 'three';

interface InteractableProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    type: 'door' | 'terminal' | 'atm';
    onInteract?: () => void;
}

/**
 * ENV-008: Interactables
 * Objects the player can interact with.
 */
export const Interactables: React.FC<InteractableProps> = ({ 
    position, 
    rotation = [0, 0, 0], 
    type,
    onInteract 
}) => {
    return (
        <group position={position} rotation={rotation} onClick={onInteract}>
            {type === 'door' && (
                <mesh castShadow>
                    <boxGeometry args={[1.2, 2.2, 0.1]} />
                    <meshStandardMaterial color="#442211" />
                </mesh>
            )}
            {type === 'terminal' && (
                <group>
                    <mesh castShadow>
                        <boxGeometry args={[0.5, 1.5, 0.4]} />
                        <meshStandardMaterial color="#222222" />
                    </mesh>
                    <mesh position={[0, 0.5, 0.25]} rotation={[-0.5, 0, 0]}>
                        <planeGeometry args={[0.4, 0.3]} />
                        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
                    </mesh>
                </group>
            )}
            {type === 'atm' && (
                <mesh castShadow>
                    <boxGeometry args={[0.8, 1.8, 0.6]} />
                    <meshStandardMaterial color="#3333aa" />
                </mesh>
            )}
        </group>
    );
};

export default Interactables;
