import React from "react";
import { Canvas } from "@react-three/fiber";
import SceneV2 from "@/components/SceneV2";
import { Stats } from "@react-three/drei";

export default function GameCanvasV2() {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Canvas
                frameloop="always"
                gl={{
                    antialias: false,
                    powerPreference: "high-performance",
                    // outputColorSpace will be set by R3F by default to SRGB
                }}
                dpr={[1, 1.5]} // Dynamic resolution limit
                camera={{ position: [0, 20, 60], fov: 60 }}
            >
                <color attach="background" args={['#0b0b0b']} />

                <SceneV2 />

                <Stats />
            </Canvas>

            <div style={{
                position: 'absolute', top: 10, left: 10,
                color: 'white', background: 'rgba(0,0,0,0.5)', padding: '5px'
            }}>
                <h2>Graphics Engine V2 Tech Demo</h2>
                <p>Worker Instancing + KTX2 Ready</p>
            </div>
        </div>
    );
}
