import React from 'react';
import { StephansplatzGround } from '@/world/WienScene';
import Street from './Street';
import Building from './Building';
import Sidewalk from './Sidewalk';
import Barriers from './Barriers';
import LandmarkVienna from './LandmarkVienna';
import ConcertStage from './ConcertStage';
import InstancedProps from './InstancedProps';
import Vegetation from './Vegetation';
import StreetLight from './StreetLights';
import Interactables from './Interactables';
import Destructibles from './Destructibles';
import GroundDecals from './GroundDecals';
import TrafficSystem from './TrafficSystem';
import { PoliceCar } from '@/components/game/entities/PoliceCar';
import { WaterCannon } from '@/components/game/entities/WaterCannon';
import { Ambulance } from '@/components/game/entities/Ambulance';
import ParticleSystem from '@/components/Effects/ParticleSystem';
import AudioManager, { AudioLayer } from '@/managers/AudioManager';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

type LevelVehicleType = 'POLICE_CAR' | 'WATER_CANNON' | 'AMBULANCE';

interface LevelVehicleSpawn {
    id: string;
    type: LevelVehicleType;
    position: [number, number, number];
    rotation: [number, number, number];
    isSirenActive: boolean;
}

const LEVEL1_VEHICLES: LevelVehicleSpawn[] = [
    {
        id: 'veh_police_stephansplatz_front',
        type: 'POLICE_CAR',
        position: [10, 0.6, 20],
        rotation: [0, Math.PI, 0],
        isSirenActive: true
    },
    {
        id: 'veh_watercannon_stage_south',
        type: 'WATER_CANNON',
        position: [-10, 0.6, 30],
        rotation: [0, 0, 0],
        isSirenActive: false
    },
    {
        id: 'veh_ambulance_north_exit',
        type: 'AMBULANCE',
        position: [0, 0.6, -20],
        rotation: [0, Math.PI / 2, 0],
        isSirenActive: true
    }
];

interface Level1PropInstance {
    id: string;
    position: [number, number, number];
    type: string;
}

const LEVEL1_PROP_INSTANCES: Level1PropInstance[] = [
    { id: 'prop_trash_can_south_1', position: [7, 0.4, 5], type: 'trash_can' },
    { id: 'prop_bench_south_1', position: [-7, 0.25, 15], type: 'bench' },
    { id: 'prop_bollard_center_1', position: [0, 0.45, 20], type: 'bollard' },
    { id: 'prop_trash_can_south_2', position: [6, 0.4, -15], type: 'trash_can' },
    { id: 'prop_bench_south_2', position: [-6, 0.25, -25], type: 'bench' },
    { id: 'prop_news_stand_east', position: [20, 0.4, 10], type: 'news_stand' },
    { id: 'prop_news_stand_west', position: [-20, 0.4, -10], type: 'news_stand' }
];

interface Level1VegetationInstance {
    id: string;
    position: [number, number, number];
    type: string;
}

const LEVEL1_VEGETATION: Level1VegetationInstance[] = [
    { id: 'veg_tree_east', position: [8, 0, -10], type: 'tree' },
    { id: 'veg_tree_west', position: [-8, 0, -15], type: 'tree' },
    { id: 'veg_bush_south', position: [7, 0, 10], type: 'bush' }
];

interface Level1StreetLightInstance {
    id: string;
    position: [number, number, number];
    rotation?: [number, number, number];
}

const LEVEL1_STREET_LIGHTS: Level1StreetLightInstance[] = [
    { id: 'light_south_east', position: [6, 3, -20] },
    { id: 'light_south_west', position: [-6, 3, -40], rotation: [0, Math.PI, 0] }
];

interface Level1InteractableInstance {
    id: string;
    position: [number, number, number];
    type: string;
}

const LEVEL1_INTERACTABLES: Level1InteractableInstance[] = [
    { id: 'int_terminal_stage', position: [5.5, 1.1, -5], type: 'terminal' },
    { id: 'int_atm_west', position: [-5.5, 0.9, 0], type: 'atm' }
];

interface Level1DestructibleInstance {
    id: string;
    position: [number, number, number];
    type: string;
    rotation?: [number, number, number];
}

const LEVEL1_DESTRUCTIBLES: Level1DestructibleInstance[] = [
    { id: 'dest_crate_center', position: [0, 0.5, 15], type: 'crate' },
    { id: 'dest_window_east', position: [10, 2, -10], type: 'window', rotation: [0, -Math.PI / 2, 0] }
];

interface Level1GroundDecalInstance {
    id: string;
    position: [number, number, number];
    type: string;
}

const LEVEL1_GROUND_DECALS: Level1GroundDecalInstance[] = [
    { id: 'decal_graffiti_center', position: [0, 0.03, 5], type: 'graffiti' },
    { id: 'decal_crack_south', position: [2, 0.03, -5], type: 'crack' }
];

/**
 * ENV-001: CityEnvironment
 * Main container for the 3D city environment.
 */
export const CityEnvironment: React.FC = () => {
    // Phase 13: Ambient City Audio & Band Music
    React.useEffect(() => {
        const cityAmbient = AudioManager.playSound('city_ambient', AudioLayer.AMBIENT, { loop: true });
        const concertMusic = AudioManager.playSound('kill_the_bill_live', AudioLayer.MUSIC, { 
            loop: true, 
            volume: 0.8,
            pos: [0, 5, -50] // Position der Bühne
        });
        
        return () => {
            if (cityAmbient) cityAmbient.pause();
            if (concertMusic) concertMusic.pause();
        };
    }, []);

    // Prozedurale Stadt-Generierung (Viennese Style)
    const buildingGrid = React.useMemo(() => {
        const buildings = [];
        const blocks = 10;
        const blockSize = 60;
        
        for (let x = -blocks/2; x < blocks/2; x++) {
            for (let z = -blocks/2; z < blocks/2; z++) {
                // Den zentralen Bereich (Stephansplatz + Bühne) freilassen
                if (Math.abs(x) <= 1 && Math.abs(z) <= 2) continue;
                
                const baseX = x * blockSize;
                const baseZ = z * blockSize;
                
                // Erstelle einen Häuserblock mit 4-6 Gebäuden
                const numBuildings = 4 + Math.floor(Math.random() * 2);
                for (let i = 0; i < numBuildings; i++) {
                    const angle = (i / numBuildings) * Math.PI * 2;
                    const radius = 15 + Math.random() * 5;
                    const subX = Math.cos(angle) * radius;
                    const subZ = Math.sin(angle) * radius;
                    
                    const height = 18 + Math.random() * 12;
                    const width = 20 + Math.random() * 10;
                    const depth = 20 + Math.random() * 10;
                    const color = ['#E3D9C6', '#D4C5A9', '#C8B896', '#B9A687', '#EAE0D5'][Math.floor(Math.random() * 5)];
                    
                    buildings.push(
                        <Building 
                            key={`b-${x}-${z}-${i}`} 
                            position={[baseX + subX, 0, baseZ + subZ]} 
                            width={width}
                            height={height}
                            depth={depth}
                            color={color}
                            rotation={[0, angle + Math.PI / 2, 0]}
                        />
                    );
                }
            }
        }
        return buildings;
    }, []);

    return (
        <group name="CityEnvironment">
            {/* Ground / Base Layer */}
            <StephansplatzGround />
            <RigidBody type="fixed" colliders={false} position={[0, -0.05, 0]}>
                <CuboidCollider args={[500, 0.05, 500]} />
            </RigidBody>
            
            {/* Hauptstraßen & Gehwege (Raster) */}
            {[...Array(5)].map((_, i) => (
                <React.Fragment key={`grid-${i}`}>
                    {/* Nord-Süd Straßen */}
                    <Street position={[(i - 2) * 50, 0.01, 0]} length={1000} />
                    <Sidewalk position={[(i - 2) * 50 + 6, 0.02, 0]} length={1000} />
                    <Sidewalk position={[(i - 2) * 50 - 6, 0.02, 0]} length={1000} />

                    {/* Ost-West Straßen */}
                    <Street position={[0, 0.01, (i - 2) * 50]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} length={1000} />
                    <Sidewalk position={[0, 0.02, (i - 2) * 50 + 6]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} length={1000} />
                    <Sidewalk position={[0, 0.02, (i - 2) * 50 - 6]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} length={1000} />
                </React.Fragment>
            ))}
            
            {/* Prozedurale Gebäude-Blöcke */}
            {buildingGrid}
            
            {/* Landmark: Stephansdom (Zentrum Nord) */}
            <LandmarkVienna position={[0, 0, -80]} landmarkId="stephansdom" />
            
            {/* Die Konzert-Bühne (Zentrum Süd) */}
            <ConcertStage position={[0, 0, -50]} rotation={[0, 0, 0]} />
            
            {/* Barrikaden um den Bühnenbereich */}
            <Barriers position={[-10, 0.6, -35]} type="police" rotation={[0, Math.PI/4, 0]} />
            <Barriers position={[10, 0.6, -35]} type="police" rotation={[0, -Math.PI/4, 0]} />
            <Barriers position={[0, 0.6, -30]} type="police" rotation={[0, 0, 0]} />
            
            {/* Props (Optimized with Instancing) */}
            <InstancedProps 
                instances={LEVEL1_PROP_INSTANCES.map((instance) => ({
                    position: instance.position,
                    type: instance.type
                }))}
            />

            {/* Vegetation */}
            {LEVEL1_VEGETATION.map((veg) => (
                <Vegetation key={veg.id} position={veg.position} type={veg.type} />
            ))}

            {/* Street Lights */}
            {LEVEL1_STREET_LIGHTS.map((light) => (
                <StreetLight
                    key={light.id}
                    position={light.position}
                    rotation={light.rotation}
                />
            ))}

            {/* Interactables */}
            {LEVEL1_INTERACTABLES.map((interactable) => (
                <Interactables
                    key={interactable.id}
                    position={interactable.position}
                    type={interactable.type}
                />
            ))}

            {/* Destructibles */}
            {LEVEL1_DESTRUCTIBLES.map((destructible) => (
                <Destructibles
                    key={destructible.id}
                    position={destructible.position}
                    type={destructible.type}
                    rotation={destructible.rotation}
                />
            ))}

            {/* Ground Decals */}
            {LEVEL1_GROUND_DECALS.map((decal) => (
                <GroundDecals key={decal.id} position={decal.position} type={decal.type} />
            ))}

            {/* Traffic System */}
            <TrafficSystem />

            {/* Vehicles (Phase 11) */}
            {LEVEL1_VEHICLES.map((vehicle) => {
                if (vehicle.type === 'POLICE_CAR') {
                    return (
                        <PoliceCar
                            key={vehicle.id}
                            position={vehicle.position}
                            rotation={vehicle.rotation}
                            isSirenActive={vehicle.isSirenActive}
                        />
                    );
                }

                if (vehicle.type === 'WATER_CANNON') {
                    return (
                        <WaterCannon
                            key={vehicle.id}
                            position={vehicle.position}
                            rotation={vehicle.rotation}
                            isSirenActive={vehicle.isSirenActive}
                        />
                    );
                }

                return (
                    <Ambulance
                        key={vehicle.id}
                        position={vehicle.position}
                        rotation={vehicle.rotation}
                        isSirenActive={vehicle.isSirenActive}
                    />
                );
            })}

            {/* Effects (Phase 12) */}
            <ParticleSystem />

            {/* Additional Environment Elements will be added here */}
        </group>
    );
};

export default CityEnvironment;
