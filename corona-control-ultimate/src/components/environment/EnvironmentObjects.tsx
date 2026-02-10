/**
 * EnvironmentObjects - High-Poly Wiener Straßenmöbel
 * BUILD 31: AA GRAPHICS (BasicMaterial + Baked Shadows + Textures)
 * Fallback strategy because StandardMaterial crashes on HF
 */
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createMetalTexture, createWoodTexture, createAsphaltTexture, createCobblestoneTexture } from '@/utils/ProceduralTextures';

// Segment counts for high-poly 
const SEGMENTS = {
    LAMP_POST: 20,
    LAMP_LANTERN: 16,
    BENCH_DETAIL: 12,
    TREE_TRUNK: 24,
    TREE_LEAVES: 32,
};

import { useFrame } from '@react-three/fiber';
import TimeSystem from '@/core/TimeSystem';

// Helper: Fake Shadow Blob
const BlobShadow: React.FC<{ scale?: number, opacity?: number }> = ({ scale = 1, opacity = 0.5 }) => {
    const shadowGeo = useMemo(() => new THREE.CircleGeometry(0.5, 32), []);
    const shadowMat = useMemo(() => new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: opacity,
        side: THREE.DoubleSide
    }), [opacity]);

    return (
        <mesh
            geometry={shadowGeo}
            material={shadowMat}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.02, 0]} // Slightly above ground to avoid z-fighting
            scale={[scale, scale, 1]}
        />
    );
};

interface StreetLampProps {
    position?: [number, number, number];
    isLit?: boolean;
    id?: number;
}

export const StreetLamp: React.FC<StreetLampProps> = ({
    position = [0, 0, 0],
    isLit = true,
    id
}) => {
    // Geometry unchanged
    const baseGeo = useMemo(() => new THREE.CylinderGeometry(0.2, 0.28, 0.25, SEGMENTS.LAMP_POST, 4), []);
    const baseDetailGeo = useMemo(() => new THREE.TorusGeometry(0.24, 0.035, 10, SEGMENTS.LAMP_POST), []);
    const postGeo = useMemo(() => new THREE.CylinderGeometry(0.055, 0.075, 4.2, SEGMENTS.LAMP_POST, 16), []);
    const ringGeo = useMemo(() => new THREE.TorusGeometry(0.08, 0.015, 8, SEGMENTS.LAMP_POST), []);
    const armGeo = useMemo(() => {
        const curve = new THREE.CubicBezierCurve3(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0.2, 0.15, 0),
            new THREE.Vector3(0.4, 0.1, 0),
            new THREE.Vector3(0.5, -0.1, 0)
        );
        return new THREE.TubeGeometry(curve, 16, 0.025, 10, false);
    }, []);
    const lanternFrameGeo = useMemo(() => new THREE.CylinderGeometry(0.12, 0.14, 0.35, 6, 4), []);
    const lanternTopGeo = useMemo(() => new THREE.ConeGeometry(0.14, 0.12, 6, 4), []);
    const lanternGlassGeo = useMemo(() => new THREE.CylinderGeometry(0.1, 0.11, 0.28, 6, 4), []);

    // BUILD 31: BASIC MATERIALS + TEXTURES
    const metalMat = useMemo(() => new THREE.MeshBasicMaterial({
        map: createMetalTexture(),
        color: 0x888888 // Brighter base to simulate ambient light
    }), []);

    // Fake "Lit" effect via color emission simulation
    const glassMat = useMemo(() => new THREE.MeshBasicMaterial({
        color: isLit ? 0xFFFFDD : 0xEEEEEE,
        transparent: true,
        opacity: 0.9
    }), [isLit]);

    return (
        <group position={position}>
            {/* Fake Shadow */}
            <BlobShadow scale={0.8} opacity={0.6} />

            <mesh geometry={baseGeo} material={metalMat} position={[0, 0.125, 0]} />
            <mesh geometry={baseDetailGeo} material={metalMat} position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={postGeo} material={metalMat} position={[0, 2.35, 0]} />
            {[0.5, 1.5, 3.0, 4.2].map((y, i) => (
                <mesh key={`ring${i}`} geometry={ringGeo} material={metalMat} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} />
            ))}
            <mesh geometry={armGeo} material={metalMat} position={[0, 4.4, 0]} />
            <group position={[0.5, 4.2, 0]}>
                <mesh geometry={lanternFrameGeo} material={metalMat} />
                <mesh geometry={lanternTopGeo} material={metalMat} position={[0, 0.22, 0]} />
                <mesh geometry={lanternGlassGeo} material={glassMat} />
            </group>
        </group>
    );
};

interface ParkBenchProps {
    position?: [number, number, number];
    rotation?: [number, number, number];
}

export const ParkBench: React.FC<ParkBenchProps> = ({
    position = [0, 0, 0],
    rotation = [0, 0, 0]
}) => {
    // Geo unchanged
    const legGeo = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0); shape.lineTo(0.08, 0); shape.lineTo(0.08, 0.45);
        shape.quadraticCurveTo(0.12, 0.55, 0.06, 0.65); shape.lineTo(0.04, 0.65);
        shape.quadraticCurveTo(0.1, 0.52, 0.04, 0.42); shape.lineTo(0.04, 0.08); shape.lineTo(0, 0.08);
        shape.closePath();
        return new THREE.ExtrudeGeometry(shape, { depth: 0.04, bevelEnabled: false });
    }, []);
    const armrestGeo = useMemo(() => {
        const curve = new THREE.CubicBezierCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0.12, 0.08), new THREE.Vector3(0, 0.18, 0.2), new THREE.Vector3(0, 0.12, 0.35));
        return new THREE.TubeGeometry(curve, 8, 0.02, 8, false);
    }, []);
    const slatGeo = useMemo(() => new THREE.BoxGeometry(1.6, 0.025, 0.08), []);
    const backSlatGeo = useMemo(() => new THREE.BoxGeometry(1.6, 0.02, 0.07), []);

    // BUILD 31: BASIC MATERIALS + TEXTURE
    const ironMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x444444 }), []);
    const woodMat = useMemo(() => new THREE.MeshBasicMaterial({
        map: createWoodTexture(),
        color: 0xDDBC99 // Lighter for visibility without light
    }), []);

    return (
        <group position={position} rotation={rotation}>
            {/* Fake Shadow - Rectangular approximation using 2 circles? No, just one long one under */}
            <group scale={[2, 0.8, 1]} position={[0, 0, 0]}>
                <BlobShadow scale={1} opacity={0.4} />
            </group>

            <mesh geometry={legGeo} material={ironMat} position={[-0.7, 0, -0.15]} />
            <mesh geometry={legGeo} material={ironMat} position={[0.7, 0, -0.15]} />
            <mesh geometry={armrestGeo} material={ironMat} position={[-0.75, 0.42, -0.15]} />
            <mesh geometry={armrestGeo} material={ironMat} position={[0.75, 0.42, -0.15]} />
            {[0, 0.1, 0.2, 0.3].map((z, i) => (
                <mesh key={`seat${i}`} geometry={slatGeo} material={woodMat} position={[0, 0.44, z - 0.15]} />
            ))}
            {[0.52, 0.62, 0.72].map((y, i) => (
                <mesh key={`back${i}`} geometry={backSlatGeo} material={woodMat} position={[0, y, -0.18]} rotation={[0.15, 0, 0]} />
            ))}
        </group>
    );
};

interface TrashBinProps {
    position?: [number, number, number];
}

export const TrashBin: React.FC<TrashBinProps> = ({
    position = [0, 0, 0]
}) => {
    const bodyGeo = useMemo(() => new THREE.CylinderGeometry(0.18, 0.17, 0.7, 16), []);
    const lidGeo = useMemo(() => new THREE.CylinderGeometry(0.19, 0.19, 0.05, 16), []);
    const standGeo = useMemo(() => new THREE.CylinderGeometry(0.04, 0.05, 0.9, 8), []);

    // BUILD 31
    const yellowMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xFFD700 }), []); // Bright Gold
    const metalMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x666666 }), []);

    return (
        <group position={position}>
            <BlobShadow scale={0.6} opacity={0.4} />
            <mesh geometry={standGeo} material={metalMat} position={[0, 0.45, 0]} />
            <mesh geometry={bodyGeo} material={yellowMat} position={[0, 1.1, 0]} />
            <mesh geometry={lidGeo} material={yellowMat} position={[0, 1.48, 0]} />
        </group>
    );
};

interface TreeProps {
    position?: [number, number, number];
    scale?: number;
    type?: 'linden' | 'chestnut';
}

export const Tree: React.FC<TreeProps> = ({
    position = [0, 0, 0],
    scale = 1,
    type = 'linden'
}) => {
    const trunkGeo = useMemo(() => new THREE.CylinderGeometry(0.15, 0.25, 3.5, 8), []);
    const leafClusterGeo = useMemo(() => new THREE.IcosahedronGeometry(1.2, 1), []);

    // BUILD 31: Fake AO in color (darker bark at bottom?)
    // Hard to do vertex colors here easily without custom geo.
    // Just use good base colors.
    const barkMat = useMemo(() => new THREE.MeshBasicMaterial({
        map: createWoodTexture([90, 70, 50]),
        color: 0x997755
    }), []);

    const leafMat = useMemo(() => new THREE.MeshBasicMaterial({
        color: type === 'linden' ? 0x77BB55 : 0x669944
    }), [type]);

    return (
        <group position={position} scale={scale}>
            {/* Big soft shadow for tree */}
            <BlobShadow scale={2.5} opacity={0.3} />

            <mesh geometry={trunkGeo} material={barkMat} position={[0, 1.75, 0]} />
            <mesh geometry={leafClusterGeo} material={leafMat} position={[0, 5.5, 0]} />
            <mesh geometry={leafClusterGeo} material={leafMat} position={[-0.8, 5, 0.3]} scale={0.85} />
            <mesh geometry={leafClusterGeo} material={leafMat} position={[0.8, 5.1, -0.2]} scale={0.8} />
        </group>
    );
};

interface StreetSegmentProps {
    position?: [number, number, number];
    width?: number;
    length?: number;
}

export const StreetSegment: React.FC<StreetSegmentProps> = ({
    position = [0, 0, 0],
    width = 8,
    length = 20
}) => {
    return null;
};

export default {
    StreetLamp,
    ParkBench,
    TrashBin,
    Tree,
    StreetSegment
};
