import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';

// =====================================================
// BUILD 65: NPC V2 (FIXED)
// - Fixed Hoisting Error (die defined before usage)
// - Fixed Impure Init (Lazy ref init)
// =====================================================

interface NPCProps {
    position: [number, number, number];
}

const NPCV2: React.FC<NPCProps> = ({ position }) => {
    const rigidBodyRef = useRef<RapierRigidBody>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    
    // Game State
    const [hp, setHp] = useState(100);
    const [isDead, setIsDead] = useState(false);
    const [color, setColor] = useState("#00ff00");

    // AI State (Lazy Init for Purity)
    const aiState = useRef<{
        timer: number;
        changeInterval: number;
        direction: THREE.Vector3;
        speed: number;
    } | null>(null);

    // Initialize AI State if null
    if (!aiState.current) {
        aiState.current = {
            timer: Math.random() * 5,
            changeInterval: 2 + Math.random() * 3,
            direction: new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize(),
            speed: 5.0
        };
    }

    // Death Logic
    const die = () => {
        console.log("💀 NPC DIED");
        setIsDead(true);
        // Launch into air for drama
        rigidBodyRef.current?.applyImpulse({ x: 0, y: 20, z: 0 }, true);
    };

    // Event Listener for Damage
    useEffect(() => {
        const handleGameEvent = (e: CustomEvent) => {
            if (isDead) return;
            const { type, payload } = e.detail;
            
            if (type === 'HIT' && meshRef.current && payload.uuid === meshRef.current.uuid) {
                console.log(`🤕 NPC HIT! HP: ${hp} -> ${hp - payload.damage}`);
                
                // Visual Feedback (Flash Red)
                setColor("#ff0000");
                setTimeout(() => {
                    if (!isDead) setColor(hp - payload.damage <= 50 ? "#ffff00" : "#00ff00");
                }, 100);

                // Take Damage
                const newHp = hp - payload.damage;
                setHp(newHp);

                if (newHp <= 0) {
                    die();
                } else {
                    // Knockback
                    rigidBodyRef.current?.applyImpulse({ 
                        x: (Math.random() - 0.5) * 5, 
                        y: 5, 
                        z: (Math.random() - 0.5) * 5 
                    }, true);
                }
            }
        };

        window.addEventListener('GAME_EVENT', handleGameEvent as EventListener);
        return () => window.removeEventListener('GAME_EVENT', handleGameEvent as EventListener);
    }, [hp, isDead]); // Dependencies are important here

    useFrame((state, delta) => {
        if (!rigidBodyRef.current || isDead || !aiState.current) return;

        const currentVel = rigidBodyRef.current.linvel();
        
        // AI Logic (Only if alive)
        // Check local state ref
        const ai = aiState.current;

        ai.timer += delta;
        const isStuck = Math.abs(currentVel.x) < 0.1 && Math.abs(currentVel.z) < 0.1;

        if (ai.timer > ai.changeInterval || (isStuck && ai.timer > 1.0)) {
            ai.timer = 0;
            ai.changeInterval = 2 + Math.random() * 3;
            if (Math.random() < 0.1) {
                ai.direction.set(0, 0, 0); 
            } else {
                ai.direction.set(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
            }
        }

        const moveDir = ai.direction;
        const targetX = moveDir.x * ai.speed;
        const targetZ = moveDir.z * ai.speed;

        if (!rigidBodyRef.current.isSleeping()) rigidBodyRef.current.wakeUp();

        rigidBodyRef.current.setLinvel({
            x: THREE.MathUtils.lerp(currentVel.x, targetX, 5 * delta),
            y: currentVel.y, 
            z: THREE.MathUtils.lerp(currentVel.z, targetZ, 5 * delta)
        }, true);
    });

    if (isDead) {
        // Build 65: Just hide it but keep Logic? No, logic stops in useFrame check.
        // Returning null removes RigidBody from physics.
        // We might want to see the body fly up first?
        // If we return null immediately, the impulse might not even register or physics body vanishes.
        // Let's keep it rendered for 1 second?
        // For now, simpler: Return null (Instant vanish).
        return null; 
    }

    return (
        <RigidBody
            ref={rigidBodyRef}
            colliders={false}
            type="dynamic"
            position={position}
            enabledRotations={[false, false, false]} 
            friction={0.0}
            mass={1.0}
            linearDamping={0.1}
            canSleep={false}
            userData={{ type: 'npc' }} 
            name="npc"
        >
            <CapsuleCollider args={[0.5, 0.5]} position={[0, 1, 0]} />
            
            <mesh ref={meshRef} position={[0, 1, 0]} name="npc-mesh">
                <capsuleGeometry args={[0.5, 1, 4, 8]} />
                <meshStandardMaterial color={color} />
            </mesh>
            
            <mesh position={[0, 1.5, 0.4]}>
                <boxGeometry args={[0.3, 0.1, 0.1]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </RigidBody>
    );
};

export default NPCV2;
