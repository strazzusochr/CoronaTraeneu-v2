import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';

// =====================================================
// BUILD 64: PLAYER V2 + RAYCASTING (SHOOTING)
// - Left Click = Shoot
// - Raycaster detects 'npc'
// =====================================================

const PlayerV2: React.FC = () => {
    const { camera, gl, scene, raycaster } = useThree();
    const rigidBodyRef = useRef<RapierRigidBody>(null);
    const [input, setInput] = useState({ f: false, b: false, l: false, r: false, jump: false });
    const rotationRef = useRef({ yaw: 0, pitch: 0 });

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            const low = e.key.toLowerCase();
            if (low === 'w') setInput(s => ({ ...s, f: true }));
            if (low === 's') setInput(s => ({ ...s, b: true }));
            if (low === 'a') setInput(s => ({ ...s, l: true }));
            if (low === 'd') setInput(s => ({ ...s, r: true }));
            if (low === ' ') setInput(s => ({ ...s, jump: true }));

            if (low === 'r' && rigidBodyRef.current) {
                console.log("♻️ RESET");
                rigidBodyRef.current.setTranslation({ x: 0, y: 10, z: 0 }, true);
                rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
                rotationRef.current.yaw = 0;
                rotationRef.current.pitch = 0;
            }
        };
        const up = (e: KeyboardEvent) => {
            const low = e.key.toLowerCase();
            if (low === 'w') setInput(s => ({ ...s, f: false }));
            if (low === 's') setInput(s => ({ ...s, b: false }));
            if (low === 'a') setInput(s => ({ ...s, l: false }));
            if (low === 'd') setInput(s => ({ ...s, r: false }));
            if (low === ' ') setInput(s => ({ ...s, jump: false }));
        };

        const move = (e: MouseEvent) => {
            if (document.pointerLockElement) {
                const sensitivity = 0.002;
                rotationRef.current.yaw -= e.movementX * sensitivity;
                rotationRef.current.pitch -= e.movementY * sensitivity;
                rotationRef.current.pitch = Math.max(-1.5, Math.min(1.5, rotationRef.current.pitch));
            }
        };

        const click = (e: MouseEvent) => {
            if (document.pointerLockElement) {
                // SHOOT LOGIC
                if (e.button === 0) { // Left Click
                    shoot();
                }
            } else {
                gl.domElement.requestPointerLock();
            }
        };

        // Raycast Function
        const shoot = () => {
            raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
            // Search specifically for meshes named 'npc-mesh'
            const intersects = raycaster.intersectObjects(scene.children, true);

            for (let i = 0; i < intersects.length; i++) {
                const hit = intersects[i];
                // Check if hit object is NPC (by name or user data)
                // Note: intersectObjects returns meshes.
                if (hit.object.name === 'npc-mesh' || hit.object.parent?.name === 'npc') {
                    console.log("🔫 SHOT NPC!", hit.object.uuid);

                    // BUILD 65: DISPATCH EVENT
                    window.dispatchEvent(new CustomEvent('GAME_EVENT', {
                        detail: {
                            type: 'HIT',
                            payload: { uuid: hit.object.uuid, damage: 35 } // 3 shots to kill 
                        }
                    }));

                    // Visual feedback (Flash White)
                    if (hit.object instanceof THREE.Mesh) {
                        // Temporary color change logic would need state or ref access.
                        // For now, let's rely on the onClick handler if possible, 
                        // but onClick is pure React. We need to bridge to Three.js logic to affect the component.
                        // Actually, we can dispatch a custom event? Or just mutate logic.

                        // Hacky visual feedback:
                        (hit.object.material as THREE.MeshStandardMaterial).emissive.setHex(0xffffff);
                        setTimeout(() => {
                            if (hit.object) (hit.object.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
                        }, 100);
                    }

                    // Physics Impulse? 
                    // We don't have access to the specific NPC's RigidBody ref here easily 
                    // unless we use Rapier's raycasting.
                    // But we can verify "Hit Detection" works.
                    break;
                }
            }
        };

        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        document.addEventListener('mousemove', move);
        gl.domElement.addEventListener('mousedown', click);

        return () => {
            window.removeEventListener('keydown', down);
            window.removeEventListener('keyup', up);
            document.removeEventListener('mousemove', move);
            gl.domElement.removeEventListener('mousedown', click);
        };
    }, [gl, camera, scene, raycaster]);

    // Helpers
    const vec3A = new THREE.Vector3();
    const vec3B = new THREE.Vector3();
    const upAxis = new THREE.Vector3(0, 1, 0);

    useFrame((state, delta) => {
        if (!rigidBodyRef.current) return;

        const pos = rigidBodyRef.current.translation();
        const vel = rigidBodyRef.current.linvel();

        // CONTROLS
        vec3A.set(0, 0, -1).applyAxisAngle(upAxis, rotationRef.current.yaw);
        vec3B.set(1, 0, 0).applyAxisAngle(upAxis, rotationRef.current.yaw);

        const speed = 6.0;
        let moveX = 0;
        let moveZ = 0;

        if (input.f) { moveX += vec3A.x; moveZ += vec3A.z; }
        if (input.b) { moveX -= vec3A.x; moveZ -= vec3A.z; }
        if (input.r) { moveX += vec3B.x; moveZ += vec3B.z; }
        if (input.l) { moveX -= vec3B.x; moveZ -= vec3B.z; }

        const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
        if (len > 0.001) { moveX /= len; moveZ /= len; }

        const targetX = moveX * speed;
        const targetZ = moveZ * speed;

        let targetY = vel.y;
        if (input.jump && Math.abs(vel.y) < 0.1) targetY = 5.0;

        if (!isNaN(targetX) && !isNaN(targetZ)) {
            rigidBodyRef.current.setLinvel({
                x: THREE.MathUtils.lerp(vel.x, targetX, 15 * delta),
                y: targetY,
                z: THREE.MathUtils.lerp(vel.z, targetZ, 15 * delta)
            }, true);
        }

        if (!isNaN(pos.x)) {
            camera.position.set(pos.x, pos.y + 1.7, pos.z);
            const newRot = new THREE.Euler(rotationRef.current.pitch, rotationRef.current.yaw, 0, 'YXZ');
            camera.quaternion.setFromEuler(newRot);
        }
    });

    return (
        <RigidBody
            ref={rigidBodyRef}
            colliders={false}
            type="dynamic"
            position={[0, 10, 0]}
            enabledRotations={[false, false, false]}
            friction={0.0}
            mass={5.0}
        >
            <CapsuleCollider args={[0.5, 0.5]} position={[0, 1, 0]} />
            <mesh position={[0, 1, 0]}>
                <capsuleGeometry args={[0.5, 1, 4, 8]} />
                <meshStandardMaterial color="#00ffff" wireframe />
            </mesh>

            {/* Crosshair */}
            <mesh position={[0, 0, -1]} parent={camera}>
                <ringGeometry args={[0.0005, 0.001, 32]} />
                <meshBasicMaterial color="white" transparent opacity={0.5} />
            </mesh>
        </RigidBody>
    );
};

export default PlayerV2;
