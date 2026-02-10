import React, { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import InstancedLOD from "@/rendering/InstancedLOD";
import EnvironmentLoader from "@/rendering/EnvironmentLoader";
import FallbackScene from "@/rendering/FallbackScene"; // Optional usage if desired
import { getQualityPreset, QualityPreset } from "@/utils/quality";

interface SceneV2Props {
  assetsReady: {
    basis: boolean;
    env: boolean;
  };
}

export default function SceneV2({ assetsReady }: SceneV2Props) {
  const { gl, scene } = useThree();
  const [preset, setPreset] = useState<QualityPreset | null>(null);

  useEffect(() => {
    const p = getQualityPreset(gl);
    setPreset(p);

    // Global exposure for debugging
    (window as any).__QUALITY_PRESET = p;

    // Fallback environment logic
    if (!assetsReady.env || !p.enablePMREM) {
      scene.environment = null;
      // We rely on lights added in JSX below
    }
  }, [gl, scene, assetsReady]);

  if (!preset) return null; // Wait for detection

  return (
    <>
      {/* Dynamic Lighting / Environment */}
      {assetsReady.env && preset.enablePMREM ? (
        <EnvironmentLoader url="/env.hdr" />
      ) : (
        <>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 15, 10]} intensity={1} castShadow={preset.enableShadows} />
          <color attach="background" args={[new THREE.Color(preset.simpleEnvColor)]} />
        </>
      )}

      {/* Instanced LOD Group 
          - Adapts count to CPU capability
          - Disables KTX2 usage if software renderer to avoid decoding overhead
      */}
      <InstancedLOD
        count={preset.instancedCount}
        useKTX2={assetsReady.basis && preset.useKTX2}
      />
    </>
  );
}
