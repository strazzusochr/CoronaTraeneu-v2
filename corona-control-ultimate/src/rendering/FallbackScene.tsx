import React from "react";
import { Grid } from "@react-three/drei";

export default function FallbackScene() {
    return (
        <>
            <color attach="background" args={['#202020']} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 20, 10]} intensity={1.5} />

            <Grid
                args={[100, 100]}
                cellColor="#6f6f6f"
                sectionColor="#9d4b4b"
                fadeDistance={50}
            />

            <mesh position={[0, 0.5, 0]}>
                <boxGeometry />
                <meshStandardMaterial color="orange" wireframe />
            </mesh>
        </>
    );
}
