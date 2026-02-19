import React from 'react';
import { VehicleBase } from './VehicleBase';

interface WaterCannonProps {
    position: [number, number, number];
    rotation: [number, number, number];
    isSirenActive?: boolean;
}

/**
 * VEH-005: WaterCannon
 */
export const WaterCannon: React.FC<WaterCannonProps> = (props) => {
    return (
        <group>
            <VehicleBase 
                {...props} 
                type="WATER_CANNON" 
                color="#003366" 
                hasSiren={true} 
            />
            {/* Water Cannon Turret */}
            <group position={[props.position[0], props.position[1] + 1.5, props.position[2]]}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.3, 0.4, 0.8]} />
                    <meshStandardMaterial color="#222222" />
                </mesh>
                <mesh position={[0, 0.2, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 1.2]} />
                    <meshStandardMaterial color="#444444" />
                </mesh>
            </group>
        </group>
    );
};

export default WaterCannon;
