import React from 'react';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import PlayerV2 from '@/components/PlayerV2';
import NPCV2 from '@/components/NPCV2';

// =====================================================
// BUILD 60: PLAYER V2 + FIRST NPC
// - PlayerV2 (Red)
// - NPCV2 (Green)
// =====================================================

const PhysicsColliders: React.FC = () => {
    return (
        <>
            {/* Ground */}
            <RigidBody type="fixed" position={[0, -0.5, 0]} friction={2}>
                <CuboidCollider args={[60, 0.5, 50]} />
            </RigidBody>

            {/* Buildings Colliders */}
            <RigidBody type="fixed" position={[0, 15, -20]}><CuboidCollider args={[12.5, 15, 30]} /></RigidBody>
            <RigidBody type="fixed" position={[10, 50, -20]}><CuboidCollider args={[4, 50, 4]} /></RigidBody>
            <RigidBody type="fixed" position={[-10, 30, -20]}><CuboidCollider args={[4, 30, 4]} /></RigidBody>
            <RigidBody type="fixed" position={[40, 12, 20]} rotation={[0, -Math.PI / 4, 0]}><CuboidCollider args={[9, 12, 9]} /></RigidBody>
            <RigidBody type="fixed" position={[-30, 10, 15]}><CuboidCollider args={[10, 10, 7.5]} /></RigidBody>
            <RigidBody type="fixed" position={[30, 8, -60]}><CuboidCollider args={[7.5, 8, 6]} /></RigidBody>
            <RigidBody type="fixed" position={[-25, 9, -55]}><CuboidCollider args={[6, 9, 5]} /></RigidBody>
        </>
    );
};

const PhysicsWorld: React.FC = () => {
    console.log("🪐 PHYSICS WORLD MOUNTING (PLAYER V2 + NPC 1)...");
    return (
        <Physics gravity={[0, -9.81, 0]} timeStep="vary">
            <PlayerV2 />

// BUILD 61: 10 NPCs
            {Array.from({ length: 10 }).map((_, i) => (
                <NPCV2 key={i} position={[5 + (i % 3) * 2, 10, 5 + Math.floor(i / 3) * 2]} />
            ))}

            <PhysicsColliders />
        </Physics>
    );
};

export default PhysicsWorld;
