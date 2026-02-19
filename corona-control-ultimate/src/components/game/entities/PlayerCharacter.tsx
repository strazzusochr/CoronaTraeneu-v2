import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useEngineLoop } from '@/core/EngineLoopManager';
import { useGameStore } from '@/stores/gameStore';
import { BaseCharacter } from './BaseCharacter';
import { NPCType, NPCState } from '@/types/enums';
import * as THREE from 'three';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';

/**
 * PlayerCharacter (V7.0)
 * Spezialisierte Komponente für den gesteuerten Charakter.
 * Nutzt den 120Hz Physik-Loop für präzises Movement.
 */
export const PlayerCharacter: React.FC = () => {
    const setPlayerPosition = useGameStore(state => state.setPlayerPosition);
    const { camera } = useThree();
    const bodyRef = useRef<any>(null);

    useEffect(() => {
        const p = useGameStore.getState().player.position;
        if (bodyRef.current) {
            bodyRef.current.setTranslation({ x: p[0], y: p[1], z: p[2] }, false);
            bodyRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, false);
        }
    }, []);

    const keys = useRef<{ [key: string]: boolean }>({});

    useEffect(() => {
        const handleDown = (e: KeyboardEvent) => { keys.current[e.code] = true; };
        const handleUp = (e: KeyboardEvent) => { keys.current[e.code] = false; };
        window.addEventListener('keydown', handleDown);
        window.addEventListener('keyup', handleUp);
        return () => {
            window.removeEventListener('keydown', handleDown);
            window.removeEventListener('keyup', handleUp);
        };
    }, []);

    useEngineLoop({
        onPhysics: (dt) => {
            const rb = bodyRef.current;
            if (!rb) return;

            let moveX = 0;
            let moveZ = 0;
            const speed = 10.0;

            if (keys.current['KeyW'] || keys.current['ArrowUp']) moveZ -= 1;
            if (keys.current['KeyS'] || keys.current['ArrowDown']) moveZ += 1;
            if (keys.current['KeyA'] || keys.current['ArrowLeft']) moveX -= 1;
            if (keys.current['KeyD'] || keys.current['ArrowRight']) moveX += 1;

            if (moveX !== 0 || moveZ !== 0) {
                const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
                const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
                forward.y = 0;
                right.y = 0;
                forward.normalize();
                right.normalize();

                const direction = new THREE.Vector3()
                    .addScaledVector(forward, -moveZ)
                    .addScaledVector(right, moveX)
                    .normalize();

                const v = rb.linvel();
                rb.setLinvel({ x: direction.x * speed, y: v.y, z: direction.z * speed }, true);
            } else {
                const v = rb.linvel();
                rb.setLinvel({ x: 0, y: v.y, z: 0 }, true);
            }

            const t = rb.translation();
            setPlayerPosition([t.x, t.y, t.z]);
        }
    });

    const currentRotation = useGameStore(state => state.player.rotation);

    return (
        <RigidBody
            ref={bodyRef}
            type="dynamic"
            colliders={false}
            enabledRotations={[false, true, false]}
            friction={0}
            linearDamping={2}
        >
            <CapsuleCollider args={[0.5, 0.9]} />
            <BaseCharacter
                position={[0, 0, 0]}
                rotation={currentRotation}
                type={NPCType.PLAYER}
                state={NPCState.IDLE}
                isPlayer={true}
                color="#3366ff"
            />
        </RigidBody>
    );
};
