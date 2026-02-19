import React from 'react';
import { VehicleBase } from './VehicleBase';

interface PoliceCarProps {
    position: [number, number, number];
    rotation: [number, number, number];
    isSirenActive?: boolean;
}

/**
 * VEH-003: PoliceCar
 */
export const PoliceCar: React.FC<PoliceCarProps> = (props) => {
    return (
        <VehicleBase 
            {...props} 
            type="POLICE_CAR" 
            color="#ffffff" 
            hasSiren={true} 
        />
    );
};

export default PoliceCar;
