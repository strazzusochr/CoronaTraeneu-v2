import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

interface BuildingProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    width?: number;
    height?: number;
    depth?: number;
    color?: string;
    type?: number;
}

const windowGeo = new THREE.BoxGeometry(1.2, 1.8, 0.2);
const glassMat = new THREE.MeshStandardMaterial({ 
    color: '#2e3b32', // Dunkles Grün/Grau für mediterrane Fensterläden
    transparent: true, 
    opacity: 0.85, 
    metalness: 0.3, 
    roughness: 0.4 
});

export const Building: React.FC<BuildingProps> = ({ 
    position, 
    rotation = [0, 0, 0], 
    width = 15,
    height = 25,
    depth = 15,
    color = '#E3D9C6',
}) => {
    const floorHeight = 4;
    const numFloors = Math.floor(height / floorHeight);
    const windowsPerFloor = Math.floor(width / 3);
    const windowsPerSide = Math.floor(depth / 3);
    const totalWindows = numFloors * (windowsPerFloor + windowsPerSide) * 2;

    const meshRef = useRef<THREE.InstancedMesh>(null);
    const tempObject = useMemo(() => new THREE.Object3D(), []);

    useEffect(() => {
        if (!meshRef.current) return;
        let idx = 0;
        
        // Face positioning logic
        const addFace = (pX: number, pY: number, pZ: number, rotY: number) => {
            if (idx >= totalWindows) return;
            tempObject.position.set(pX, pY, pZ);
            tempObject.rotation.set(0, rotY, 0);
            tempObject.updateMatrix();
            meshRef.current!.setMatrixAt(idx++, tempObject.matrix);
        };

        for (let f = 0; f < numFloors; f++) {
            const posY = (f * floorHeight + 2.5) - height / 2;
            
            // Front & Back
            for (let w = 0; w < windowsPerFloor; w++) {
                const posX = (w - (windowsPerFloor - 1) / 2) * 3;
                addFace(posX, posY, depth / 2 + 0.1, 0);
                addFace(posX, posY, -depth / 2 - 0.1, Math.PI);
            }
            // Sides
            const windowsSide = Math.floor(depth / 3);
            for (let w = 0; w < windowsSide; w++) {
                const posZ = (w - (windowsSide - 1) / 2) * 3;
                addFace(width / 2 + 0.1, posY, posZ, Math.PI / 2);
                addFace(-width / 2 - 0.1, posY, posZ, -Math.PI / 2);
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [numFloors, windowsPerFloor, depth, width, height, tempObject, totalWindows]);

    return (
        <group position={position} rotation={rotation}>
            <RigidBody type="fixed" colliders={false}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[width, height, depth]} />
                    <meshStandardMaterial color={color} roughness={0.8} metalness={0.05} />
                </mesh>
                
                {/* Rustika-Sockel (Erdgeschoss) */}
                <mesh position={[0, -height / 2 + floorHeight / 2, 0]} castShadow receiveShadow>
                    <boxGeometry args={[width + 0.2, floorHeight, depth + 0.2]} />
                    <meshStandardMaterial color="#bba793" roughness={0.9} />
                </mesh>
                
                <instancedMesh ref={meshRef} args={[windowGeo, glassMat, totalWindows]} />

                {[...Array(numFloors)].map((_, i) => (
                    <group key={`ledge-${i}`} position={[0, (i * floorHeight + 0.1) - height/2, 0]}>
                        <mesh castShadow receiveShadow>
                            <boxGeometry args={[width + 0.6, 0.25, depth + 0.6]} />
                            <meshStandardMaterial color="#c6b199" roughness={0.9} />
                        </mesh>
                    </group>
                ))}

                {/* Dachgesims (Cornice) */}
                <mesh position={[0, height / 2 + 0.4, 0]} castShadow receiveShadow>
                    <boxGeometry args={[width + 1.2, 0.8, depth + 1.2]} />
                    <meshStandardMaterial color="#a89278" roughness={0.9} />
                </mesh>

                <CuboidCollider args={[width / 2, height / 2, depth / 2]} />
            </RigidBody>
        </group>
    );
};

export default Building;
