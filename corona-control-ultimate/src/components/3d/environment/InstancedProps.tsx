import React, { useMemo } from 'react';
import * as THREE from 'three';

interface InstancedPropsProps {
    instances: Array<{
        position: [number, number, number];
        rotation?: [number, number, number];
        type: 'trash_can' | 'bench' | 'bollard' | 'news_stand';
    }>;
}

/**
 * OPT-001: InstancedProps
 * Performance-optimierte Darstellung von Umgebungsobjekten mittels InstancedMesh.
 */
export const InstancedProps: React.FC<InstancedPropsProps> = ({ instances }) => {
    // Geometrien und Materialien für die verschiedenen Typen
    const geometries = useMemo(() => ({
        trash_can: new THREE.CylinderGeometry(0.3, 0.3, 0.8, 8),
        bench: new THREE.BoxGeometry(2, 0.5, 0.8),
        bollard: new THREE.CylinderGeometry(0.1, 0.1, 0.9, 6),
        news_stand: new THREE.BoxGeometry(2, 2.5, 1.5)
    }), []);

    const materials = useMemo(() => ({
        trash_can: new THREE.MeshStandardMaterial({ color: "#444444" }),
        bench: new THREE.MeshStandardMaterial({ color: "#553311" }),
        bollard: new THREE.MeshStandardMaterial({ color: "#111111" }),
        news_stand: new THREE.MeshStandardMaterial({ color: "#224422" })
    }), []);

    // Gruppierung der Instanzen nach Typ
    const groupedInstances = useMemo(() => {
        const groups: Record<string, typeof instances> = {
            trash_can: [],
            bench: [],
            bollard: [],
            news_stand: []
        };
        instances.forEach(inst => groups[inst.type].push(inst));
        return groups;
    }, [instances]);

    return (
        <group name="InstancedProps">
            {Object.entries(groupedInstances).map(([type, insts]) => {
                if (insts.length === 0) return null;

                return (
                    <instancedMesh
                        key={type}
                        args={[geometries[type as keyof typeof geometries], materials[type as keyof typeof materials], insts.length]}
                        castShadow
                        receiveShadow
                        onUpdate={(self) => {
                            const matrix = new THREE.Matrix4();
                            insts.forEach((inst, i) => {
                                matrix.makeRotationFromEuler(new THREE.Euler(...(inst.rotation || [0, 0, 0])));
                                matrix.setPosition(...inst.position);
                                self.setMatrixAt(i, matrix);
                            });
                            self.instanceMatrix.needsUpdate = true;
                        }}
                    />
                );
            })}
        </group>
    );
};

export default InstancedProps;
