import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { create } from 'zustand';

/**
 * EFF-001: ParticleSystem
 * Centralized high-performance particle system using InstancedMesh.
 */

export enum ParticleType {
    EXPLOSION = 'EXPLOSION',
    FIRE = 'FIRE',
    SMOKE = 'SMOKE',
    BLOOD = 'BLOOD',
    TEARGAS = 'TEARGAS',
    SPARKS = 'SPARKS',
    WATER = 'WATER'
}

interface Particle {
    id: number;
    type: ParticleType;
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    life: number;
    maxLife: number;
    size: number;
    color: string;
}

interface ParticleStore {
    particles: Particle[];
    spawnEffect: (type: ParticleType, position: [number, number, number], options?: Partial<{
        count: number,
        color: string,
        size: number,
        velocity: [number, number, number],
        spread: number
    }>) => void;
    spawnExplosion: (position: [number, number, number], color: string, count?: number) => void;
    updateParticles: (delta: number) => void;
}

export const useParticleStore = create<ParticleStore>((set, get) => ({
    particles: [],
    spawnEffect: (type, position, options = {}) => {
        const {
            count = 10,
            color = '#ffffff',
            size = 0.1,
            spread = 1.0
        } = options;

        const newParticles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 5 * spread,
                (Math.random() - 0.5) * 5 * spread + (type === ParticleType.FIRE || type === ParticleType.SMOKE ? 2 : 0),
                (Math.random() - 0.5) * 5 * spread
            );

            if (options.velocity) {
                velocity.add(new THREE.Vector3(...options.velocity));
            }

            newParticles.push({
                id: Math.random() + Date.now(),
                type,
                position: new THREE.Vector3(...position),
                velocity,
                life: 1.0,
                maxLife: 1.0,
                size,
                color
            });
        }
        set({ particles: [...get().particles, ...newParticles] });
    },
    spawnExplosion: (position, color, count = 10) => {
        get().spawnEffect(ParticleType.EXPLOSION, position, { color, count, size: 0.2 });
    },
    updateParticles: (delta) => {
        const gravity = new THREE.Vector3(0, -9.81, 0);
        
        set((state) => ({
            particles: state.particles
                .map(p => {
                    const newVel = p.velocity.clone();
                    
                    // Apply gravity for blood and sparks
                    if (p.type === ParticleType.BLOOD || p.type === ParticleType.SPARKS || p.type === ParticleType.WATER) {
                        newVel.add(gravity.clone().multiplyScalar(delta));
                    }
                    
                    // Apply upward drift for smoke/fire
                    if (p.type === ParticleType.SMOKE || p.type === ParticleType.FIRE || p.type === ParticleType.TEARGAS) {
                        newVel.y += delta * 2;
                    }

                    return {
                        ...p,
                        position: p.position.clone().add(newVel.clone().multiplyScalar(delta)),
                        velocity: newVel,
                        life: p.life - delta
                    };
                })
                .filter(p => p.life > 0)
        }));
    }
}));

const ParticleSystem: React.FC = () => {
    const particles = useParticleStore(state => state.particles);
    const updateParticles = useParticleStore(state => state.updateParticles);
    
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((_, delta) => {
        if (particles.length > 0) {
            updateParticles(delta);
        }

        if (meshRef.current) {
            particles.forEach((p, i) => {
                dummy.position.copy(p.position);
                const scale = (p.life / p.maxLife) * p.size;
                dummy.scale.set(scale, scale, scale);
                dummy.updateMatrix();
                meshRef.current!.setMatrixAt(i, dummy.matrix);
                
                // Set color if supported by the shader/material
                // Note: InstancedMesh colors require more setup, skipping for now to keep it simple
            });
            meshRef.current.count = particles.length;
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, 1000]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial transparent opacity={0.6} />
        </instancedMesh>
    );
};

export default ParticleSystem;
