import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

/**
 * ENV-014: TrafficSystem
 * Basic traffic simulation placeholder on Rome Grid Coordinates.
 */
export const TrafficSystem: React.FC = () => {
    const bodiesRef = useRef<any[]>([]);
    
    const configs = useMemo(() => {
        // Die validen, ununterbrochenen Straßenachsen im 48-Einheiten Rom-Raster (außerhalb des Parks)
        const validVerticalStreets = [-116, 124]; // X-Koordinaten
        const validHorizontalStreets = [-116, 124]; // Z-Koordinaten

        const cars = [];
        let idCount = 0;
        
        // Vertikale Straßen (Z ändert sich, X konstant)
        validVerticalStreets.forEach((xPos) => {
            for (let i = 0; i < 8; i++) {
                const isForward = i % 2 === 0;
                const laneX = isForward ? 2 : -2;
                const speed = (isForward ? 1 : -1) * (10 + Math.random() * 5);
                const startZ = -200 + i * 50;
                cars.push({
                    id: idCount++,
                    type: 'vertical',
                    x: xPos + laneX,
                    y: 0.6,
                    z: startZ,
                    speed: speed,
                    rotation: isForward ? 0 : Math.PI,
                    color: ['#333', '#555', '#777', '#999', '#441111', '#114411'][idCount % 6]
                });
            }
        });

        // Horizontale Straßen (X ändert sich, Z konstant)
        validHorizontalStreets.forEach((zPos) => {
            for (let i = 0; i < 8; i++) {
                const isForward = i % 2 === 0;
                const laneZ = isForward ? -2 : 2; // Rechtsverkehr auf der Z Achse
                const speed = (isForward ? 1 : -1) * (10 + Math.random() * 5);
                const startX = -200 + i * 50;
                cars.push({
                    id: idCount++,
                    type: 'horizontal',
                    x: startX,
                    y: 0.6,
                    z: zPos + laneZ,
                    speed: speed,
                    rotation: isForward ? -Math.PI / 2 : Math.PI / 2,
                    color: ['#333', '#555', '#777', '#999', '#441111', '#114411'][idCount % 6]
                });
            }
        });

        return cars;
    }, []);

    useFrame((state, delta) => {
        bodiesRef.current.forEach((rb, i) => {
            const cfg = configs[i];
            if (!rb || !cfg) return;
            const t = rb.translation();
            
            let newX = t.x;
            let newZ = t.z;

            if (cfg.type === 'vertical') {
                newZ += cfg.speed * delta;
                if (newZ > 250) newZ = -250;
                if (newZ < -250) newZ = 250;
            } else {
                newX += cfg.speed * delta;
                if (newX > 250) newX = -250;
                if (newX < -250) newX = 250;
            }

            rb.setNextKinematicTranslation({ x: newX, y: cfg.y, z: newZ });
        });
    });

    return (
        <group name="TrafficSystem">
            {configs.map((cfg, i) => (
                <RigidBody
                    key={i}
                    type="kinematicPosition"
                    colliders={false}
                    ref={(api) => { if (api) bodiesRef.current[i] = api; }}
                    position={[cfg.x, cfg.y, cfg.z]}
                >
                    <CuboidCollider args={[1, 0.6, 2.25]} />
                    <group rotation={[0, cfg.rotation, 0]}>
                        <mesh>
                            <boxGeometry args={[2, 1.2, 4.5]} />
                            <meshStandardMaterial 
                                color={cfg.color}
                                roughness={0.5}
                                metalness={0.8}
                            />
                        </mesh>
                        {/* Scheinwerfer */}
                        <mesh position={[0.7, 0.2, 2.3]}>
                            <boxGeometry args={[0.4, 0.2, 0.1]} />
                            <meshStandardMaterial color="#ffffaa" emissive="#ffffaa" emissiveIntensity={2} />
                        </mesh>
                        <mesh position={[-0.7, 0.2, 2.3]}>
                            <boxGeometry args={[0.4, 0.2, 0.1]} />
                            <meshStandardMaterial color="#ffffaa" emissive="#ffffaa" emissiveIntensity={2} />
                        </mesh>
                    </group>
                </RigidBody>
            ))}
        </group>
    );
};

export default TrafficSystem;
