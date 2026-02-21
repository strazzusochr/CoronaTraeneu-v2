import React, { useMemo } from 'react';
import * as THREE from 'three';

interface InstancedVegetationProps {
    instances: Array<{
        position: [number, number, number];
        rotation?: [number, number, number];
        scale?: number;
        type: 'tree' | 'bush' | 'shrub';
    }>;
}

/**
 * OPT-002: InstancedVegetation
 * Render hunderte Bäume und Büsche mit minimalen Draw-Calls.
 */
export const InstancedVegetation: React.FC<InstancedVegetationProps> = React.memo(({ instances }) => {
    // 1. Geometrien & Materialien
    const treeTrunkGeo = useMemo(() => new THREE.CylinderGeometry(0.2, 0.3, 4, 8), []);
    const treeTrunkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#4d2911", roughness: 0.9 }), []);
    
    const treeFoliageGeo = useMemo(() => new THREE.SphereGeometry(2, 8, 8), []);
    const treeFoliageMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2d5a27", roughness: 0.8 }), []);

    const bushGeo = useMemo(() => new THREE.SphereGeometry(0.8, 8, 8), []);
    const bushMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#3d7a37", roughness: 0.8 }), []);

    const shrubGeo = useMemo(() => new THREE.CylinderGeometry(2, 2.5, 1.5, 6), []);
    const shrubMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2d5a1e", roughness: 0.9 }), []);

    // 2. Gruppierung
    const grouped = useMemo(() => {
        const g: Record<string, typeof instances> = { tree: [], bush: [], shrub: [] };
        instances.forEach(i => g[i.type]?.push(i));
        return g;
    }, [instances]);

    return (
        <group name="InstancedVegetation">
            {/* Bäume - Stämme */}
            {grouped.tree.length > 0 && (
                <instancedMesh
                    args={[treeTrunkGeo, treeTrunkMat, grouped.tree.length]}
                    castShadow
                    onUpdate={(self) => {
                        const matrix = new THREE.Matrix4();
                        grouped.tree.forEach((inst, i) => {
                            matrix.makeRotationFromEuler(new THREE.Euler(...(inst.rotation || [0, 0, 0])));
                            matrix.setPosition(inst.position[0], inst.position[1] + 2, inst.position[2]); // Stamm-Mitte
                            matrix.scale(new THREE.Vector3(inst.scale || 1, inst.scale || 1, inst.scale || 1));
                            self.setMatrixAt(i, matrix);
                        });
                        self.instanceMatrix.needsUpdate = true;
                    }}
                />
            )}
            {/* Bäume - Kronen */}
            {grouped.tree.length > 0 && (
                <instancedMesh
                    args={[treeFoliageGeo, treeFoliageMat, grouped.tree.length]}
                    castShadow
                    onUpdate={(self) => {
                        const matrix = new THREE.Matrix4();
                        grouped.tree.forEach((inst, i) => {
                            matrix.makeRotationFromEuler(new THREE.Euler(...(inst.rotation || [0, 0, 0])));
                            matrix.setPosition(inst.position[0], inst.position[1] + 7, inst.position[2]); // Krone-Höhe (wie in CityEnv)
                            const s = (inst.scale || 1) * 1.5; // Größere Krone
                            matrix.scale(new THREE.Vector3(s, s, s));
                            self.setMatrixAt(i, matrix);
                        });
                        self.instanceMatrix.needsUpdate = true;
                    }}
                />
            )}
            {/* Büsche */}
            {grouped.bush.length > 0 && (
                <instancedMesh
                    args={[bushGeo, bushMat, grouped.bush.length]}
                    castShadow
                    onUpdate={(self) => {
                        const matrix = new THREE.Matrix4();
                        grouped.bush.forEach((inst, i) => {
                            matrix.makeRotationFromEuler(new THREE.Euler(...(inst.rotation || [0, 0, 0])));
                            matrix.setPosition(inst.position[0], inst.position[1] + 0.6, inst.position[2]);
                            matrix.scale(new THREE.Vector3(inst.scale || 1, (inst.scale || 1) * 0.7, inst.scale || 1));
                            self.setMatrixAt(i, matrix);
                        });
                        self.instanceMatrix.needsUpdate = true;
                    }}
                />
            )}
            {/* Sträucher */}
            {grouped.shrub.length > 0 && (
                <instancedMesh
                    args={[shrubGeo, shrubMat, grouped.shrub.length]}
                    castShadow
                    onUpdate={(self) => {
                        const matrix = new THREE.Matrix4();
                        const s = new THREE.Vector3();
                        grouped.shrub.forEach((inst, i) => {
                            matrix.makeRotationFromEuler(new THREE.Euler(...(inst.rotation || [0, 0, 0])));
                            matrix.setPosition(inst.position[0], inst.position[1] + 0.75, inst.position[2]);
                            s.set(inst.scale || 1, inst.scale || 1, inst.scale || 1);
                            matrix.scale(s);
                            self.setMatrixAt(i, matrix);
                        });
                        self.instanceMatrix.needsUpdate = true;
                    }}
                />
            )}
        </group>
    );
});

export default InstancedVegetation;
