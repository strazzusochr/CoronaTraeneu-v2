import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
  InstancedLOD.tsx
  - erstellt ein InstancedMesh mit 'count' Instanzen
  - erstellt SharedArrayBuffer in main thread und übergibt ihn an Worker
  - Worker füllt Matrizen (16 floats pro Instanz)
  - main thread liest Matrizen (Float32Array view) und updated instanceMatrix
*/

interface InstancedLODProps {
    count?: number;
    useKTX2?: boolean;
}

export default function InstancedLOD({ count = 2000, useKTX2 = true }: InstancedLODProps) {
    const instRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useRef(new THREE.Object3D()).current;
    const MATRIX_SIZE = 16;

    // Local view of shared matrices
    const matricesViewRef = useRef<Float32Array | null>(null);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        // create SharedArrayBuffer in main thread
        const sab = new SharedArrayBuffer(count * MATRIX_SIZE * Float32Array.BYTES_PER_ELEMENT);
        const matricesView = new Float32Array(sab);
        matricesViewRef.current = matricesView;

        // spawn worker module and send sab
        // Note: Vite handles worker imports with query parameters or direct import
        const worker = new Worker(new URL("../workers/simWorker.ts", import.meta.url), {
            type: "module",
        });
        workerRef.current = worker;
        worker.postMessage({ type: "init", shared: sab, count });

        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
                workerRef.current = null;
            }
        };
    }, [count]);

    useFrame(() => {
        const mats = matricesViewRef.current;
        if (!mats || !instRef.current) return;

        // update instanced matrices from shared buffer
        for (let i = 0; i < count; i++) {
            // three.js expects column-major Float32Array order for fromArray
            dummy.matrix.fromArray(mats, i * MATRIX_SIZE);
            // if matrix not decomposed or manipulated, directly assign
            instRef.current.setMatrixAt(i, dummy.matrix);
        }
        instRef.current.instanceMatrix.needsUpdate = true;
    });

    // Simple material and geometry; 
    // TODO: replace with PBR material + KTX2 textures if available and useKTX2 is true
    return (
        <instancedMesh ref={instRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial
                metalness={0.2}
                roughness={0.6}
                color={useKTX2 ? "white" : "#ccaa00"} // Visual debug: Gold = No KTX2/Software
            />
        </instancedMesh>
    );
}
