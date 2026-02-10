import { WaterCannonSystem } from '@/systems/WaterCannonSystem';
import { VehicleBase } from '@/components/game/entities/VehicleBase';
import { BuildingFloor } from '@/components/buildings/BuildingComponents';
import { ProceduralTextures } from '@/utils/ProceduralTextures';

/**
 * V7.0 WIEN WORLD GENERATOR
 * Erweitert um prozedurale Altbau-Fassaden und Aktive Systeme.
 */

export const StephansplatzGround = (): React.ReactElement => {
    const texture = ProceduralTextures.getAsphalt();
    texture.repeat.set(40, 40);
    texture.wrapS = texture.wrapT = 1000;

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial
                map={texture}
                roughness={0.9}
                metalness={0.1}
            />
        </mesh>
    );
};

export const StephansplatzWorld = (): React.ReactElement => {
    return (
        <group name="Stephansplatz">
            <StephansplatzGround />

            {/* Gebäude-Block A: Karntner Straße Ecke */}
            <group position={[-50, 0, -30]}>
                {[0, 3.5, 7, 10.5].map(h => (
                    <group key={h} position={[0, h, 0]}>
                        <BuildingFloor segments={12} height={3.5} />
                    </group>
                ))}
            </group>

            {/* Gebäude-Block B: Graben Ecke */}
            <group position={[30, 0, -40]} rotation={[0, -Math.PI / 6, 0]}>
                {[0, 3.5, 7].map(h => (
                    <group key={h} position={[0, h, 0]}>
                        <BuildingFloor segments={8} height={4} />
                    </group>
                ))}
            </group>

            {/* AKTIVE SYSTEME: Wasserwerfer-Stationierung */}
            <group position={[10, 0, 20]}>
                <VehicleBase
                    type="WATER_CANNON"
                    position={[0, 0.6, 0]}
                    rotation={[0, Math.PI, 0]}
                    color="#003366"
                />
                <WaterCannonSystem
                    active={true}
                    position={[10, 0, 20]}
                    rotation={Math.PI}
                />
            </group>

            {/* Dynamische Props: Barrikaden Placeholder */}
            <group position={[-10, 0, 5]}>
                <mesh castShadow>
                    <boxGeometry args={[4, 1.5, 0.5]} />
                    <meshStandardMaterial color="#333333" />
                </mesh>
            </group>
        </group>
    );
};
