import React, { useEffect } from 'react';
import * as THREE from 'three';
// BUILD 46: NO PROCEDURAL TEXTURES! They crash WebGL on Hugging Face.
// See: checkpoint_v1.4.0_graphics_isolation.md (Build 15 diagnosis)

export const PLATZ_DIMENSIONS = {
    width: 120,
    length: 100,
};

const StephansplatzGeometry: React.FC = () => {
    useEffect(() => {
        (window as any).cityMounted = true;
        console.log("🏙️ Build 46: City WITHOUT Procedural Textures");
        return () => {
            (window as any).cityMounted = false;
        };
    }, []);

    // NO createCobblestoneTexture() - it kills WebGL on HF!

    return (
        <group name="Stephansplatz">
            {/* Ground Plane - PLAIN COLOR (no texture!) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                <planeGeometry args={[PLATZ_DIMENSIONS.width, PLATZ_DIMENSIONS.length]} />
                <meshBasicMaterial color="#8a7d6b" side={2} />
            </mesh>

            {/* Stephansdom */}
            <mesh position={[0, 15, -20]}>
                <boxGeometry args={[25, 30, 60]} />
                <meshBasicMaterial color="#8b7b6f" />
            </mesh>
            {/* Fake Shadow for Dom */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, -20]}>
                <planeGeometry args={[30, 65]} />
                <meshBasicMaterial color="#000000" transparent opacity={0.3} />
            </mesh>
            
            {/* Towers */}
            <mesh position={[10, 50, -20]}>
                <boxGeometry args={[8, 100, 8]} />
                <meshBasicMaterial color="#7a6d62" />
            </mesh>
            <mesh position={[-10, 30, -20]}>
                <boxGeometry args={[8, 60, 8]} />
                <meshBasicMaterial color="#7a6d62" />
            </mesh>
            <mesh position={[10, 115, -20]}>
                <coneGeometry args={[4, 30, 8]} />
                <meshBasicMaterial color="#5a4d42" />
            </mesh>

            {/* Haas-Haus */}
            <group position={[40, 0, 20]} rotation={[0, -Math.PI / 4, 0]}>
                <mesh position={[0, 12, 0]}>
                    <boxGeometry args={[18, 24, 18]} />
                    <meshBasicMaterial color="#9abcc8" opacity={0.9} transparent />
                </mesh>
                {/* Fake Shadow */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
                    <planeGeometry args={[20, 20]} />
                    <meshBasicMaterial color="#000000" transparent opacity={0.3} />
                </mesh>
            </group>

            {/* Other Buildings */}
            <mesh position={[-30, 10, 15]}>
                <boxGeometry args={[20, 20, 15]} />
                <meshBasicMaterial color="#9b8d7b" />
            </mesh>
            <mesh position={[30, 8, -60]}>
                <boxGeometry args={[15, 16, 12]} />
                <meshBasicMaterial color="#ab9b8b" />
            </mesh>
            <mesh position={[-25, 9, -55]}>
                <boxGeometry args={[12, 18, 10]} />
                <meshBasicMaterial color="#9b8b7b" />
            </mesh>
        </group>
    );
};

export default StephansplatzGeometry;
