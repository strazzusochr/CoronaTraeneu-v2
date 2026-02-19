import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

/**
 * ENV-014: TrafficSystem
 * Basic traffic simulation placeholder.
 */
export const TrafficSystem: React.FC = () => {
    const bodiesRef = useRef<any[]>([]);
    const configs = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => {
            const laneX = (i % 2 === 0 ? 6 : -6);
            const streetOffset = (Math.floor(i / 4) - 2) * 50;
            const speed = 8 + (i % 3) * 4;
            const z = -300 + i * 30;
            return { x: laneX + streetOffset, y: 0.5, z, speed, color: ['#333', '#555', '#777', '#999', '#441111', '#114411'][i % 6] };
        });
    }, []);

    useFrame((state, delta) => {
        bodiesRef.current.forEach((rb, i) => {
            const cfg = configs[i];
            if (!rb || !cfg) return;
            const t = rb.translation();
            let newZ = t.z + delta * cfg.speed;

            const isNearCenter = Math.abs(cfg.x) < 15;
            const isInStageZ = newZ > -80 && newZ < -20;
            if (isNearCenter && isInStageZ) {
                newZ = -20;
            }

            if (newZ > 300) {
                newZ = -300;
                const lane = Math.random() > 0.5 ? 6 : -6;
                const streetOffset = (Math.floor(i / 4) - 2) * 50;
                cfg.x = lane + streetOffset;
            }
            rb.setNextKinematicTranslation({ x: cfg.x, y: cfg.y, z: newZ });
        });
    });

    return (
        <group name="TrafficSystem">
            {configs.map((cfg, i) => (
                <RigidBody
                    key={i}
                    type="kinematicPosition"
                    colliders={false}
                    ref={(api) => { if (api) bodiesRef.current[i] = api; }}
                    position={[cfg.x, cfg.y, cfg.z]}
                >
                    <CuboidCollider args={[1, 0.6, 2.25]} />
                    <mesh>
                        <boxGeometry args={[2, 1.2, 4.5]} />
                        <meshStandardMaterial 
                            color={cfg.color}
                            roughness={0.5}
                            metalness={0.8}
                        />
                    </mesh>
                    <mesh position={[0.7, 0.2, 2.3]}>
                        <boxGeometry args={[0.4, 0.2, 0.1]} />
                        <meshStandardMaterial color="#ffffaa" emissive="#ffffaa" emissiveIntensity={2} />
                    </mesh>
                    <mesh position={[-0.7, 0.2, 2.3]}>
                        <boxGeometry args={[0.4, 0.2, 0.1]} />
                        <meshStandardMaterial color="#ffffaa" emissive="#ffffaa" emissiveIntensity={2} />
                    </mesh>
                </RigidBody>
            ))}
        </group>
    );
};

export default TrafficSystem;
