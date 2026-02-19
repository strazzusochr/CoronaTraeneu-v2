import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEngineLoop } from '@/core/EngineLoopManager';
import { useGameStore } from '@/stores/gameStore';
import { EmotionalState, NPCState } from '@/types/enums';
import { GAME_BALANCE } from '@/constants/GameBalance';

/**
 * WaterCannonSystem (V7.0)
 * High-End Partikel-Simulation für Wasserwerfer.
 * Integriert in den 120Hz Loop für präzise Kollisionsabfrage mit NPCs.
 */
export const WaterCannonSystem: React.FC<{ active?: boolean, position: [number, number, number], rotation: number }> = ({
    active = false,
    position,
    rotation
}) => {
    const particlesRef = useRef<THREE.Points>(null);
    const npcs = useGameStore(state => state.npcs);
    const updateNpc = useGameStore(state => state.updateNpc);

    const WATER_CANNON_FORCE = GAME_BALANCE.weapons.waterCannon.force;
    const WATER_CANNON_GRAVITY = GAME_BALANCE.weapons.waterCannon.gravity;
    const WATER_CANNON_HIT_RADIUS = GAME_BALANCE.weapons.waterCannon.hitRadius;
    const WATER_CANNON_VERTICAL_TOLERANCE = GAME_BALANCE.weapons.waterCannon.verticalTolerance;
    const WATER_CANNON_STRESS_INCREASE = GAME_BALANCE.weapons.waterCannon.stressIncrease;
    const WATER_CANNON_AGGRESSION_REDUCTION = GAME_BALANCE.weapons.waterCannon.aggressionReduction;

    // Particle Data (V7.0 Placeholder: Instanced Points)
    const particleCount = 1000;
    const positions = useMemo(() => new Float32Array(particleCount * 3), []);
    const velocities = useMemo(() => new Float32Array(particleCount * 3), []);

    // Initialize Particles
    useMemo(() => {
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = position[0];
            positions[i * 3 + 1] = position[1] + 2; // Höhe des Aufsatzes
            positions[i * 3 + 2] = position[2];
        }
    }, []);

    // 120Hz Physics & Collision
    useEngineLoop({
        onPhysics: (dt) => {
            if (!active || !particlesRef.current) return;

            const posAttr = particlesRef.current.geometry.attributes.position;

            for (let i = 0; i < particleCount; i++) {
                // Gravity & Movement
                positions[i * 3 + 1] -= WATER_CANNON_GRAVITY * dt;

                // Directional Force (Spray)
                const angle = rotation;
                positions[i * 3] += Math.sin(angle) * WATER_CANNON_FORCE * dt;
                positions[i * 3 + 2] += Math.cos(angle) * WATER_CANNON_FORCE * dt;

                // Simple Ground Collision
                if (positions[i * 3 + 1] < 0) {
                    positions[i * 3] = position[0];
                    positions[i * 3 + 1] = position[1] + 2;
                    positions[i * 3 + 2] = position[2];
                }

                // NPC Interaction (Spatial Query Placeholder)
                // In V7.0 AAA würden wir hier das SpatialGrid nutzen
                if (i % 50 === 0) { // Throttled Interaction
                    npcs.forEach(npc => {
                        const dist = Math.sqrt(
                            Math.pow(positions[i * 3] - npc.position[0], 2) +
                            Math.pow(positions[i * 3 + 2] - npc.position[2], 2)
                        );

                        if (dist < WATER_CANNON_HIT_RADIUS && Math.abs(positions[i * 3 + 1] - npc.position[1]) < WATER_CANNON_VERTICAL_TOLERANCE) {
                            // NPC wird getroffen: Stress hoch, Aggression runter
                            updateNpc(npc.id, {
                                state: NPCState.FLEE,
                                emotions: {
                                    ...npc.emotions,
                                    stress: Math.min(1, npc.emotions.stress + WATER_CANNON_STRESS_INCREASE),
                                    aggression: Math.max(0, npc.emotions.aggression - WATER_CANNON_AGGRESSION_REDUCTION),
                                    current: EmotionalState.TERRIFIED
                                }
                            });
                        }
                    });
                }
            }
            posAttr.needsUpdate = true;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#aaccff"
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};
