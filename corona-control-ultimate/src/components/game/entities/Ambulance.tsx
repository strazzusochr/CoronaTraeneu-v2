import React from 'react';
import { VehicleBase } from './VehicleBase';

interface AmbulanceProps {
    position: [number, number, number];
    rotation: [number, number, number];
    isSirenActive?: boolean;
}

/**
 * VEH-006: Ambulance
 */
export const Ambulance: React.FC<AmbulanceProps> = (props) => {
    return (
        <VehicleBase 
            {...props} 
            type="AMBULANCE" 
            color="#ffffff" 
            hasSiren={true} 
        />
    );
};

export default Ambulance;
