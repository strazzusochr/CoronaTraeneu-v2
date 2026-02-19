import { create } from 'zustand';

export enum VehicleType {
    POLICE_CAR = 'POLICE_CAR',
    POLICE_VAN = 'POLICE_VAN',
    WATER_CANNON = 'WATER_CANNON',
    AMBULANCE = 'AMBULANCE',
    FIRE_TRUCK = 'FIRE_TRUCK',
    NEWS_VAN = 'NEWS_VAN',
    ARMORED = 'ARMORED'
}

interface VehicleData {
    id: string;
    type: VehicleType;
    position: [number, number, number];
    rotation: [number, number, number];
    health: number;
    active: boolean;
}

interface VehicleStore {
    vehicles: Record<string, VehicleData>;
    spawnVehicle: (type: VehicleType, position: [number, number, number]) => void;
    updateVehicle: (id: string, data: Partial<VehicleData>) => void;
    removeVehicle: (id: string) => void;
}

/**
 * VEH-001: VehicleManager
 * Global store for managing all vehicles in the scene.
 */
export const useVehicleManager = create<VehicleStore>((set) => ({
    vehicles: {},
    spawnVehicle: (type, position) => set((state) => {
        const id = `veh_${Math.random().toString(36).substr(2, 9)}`;
        const DEFAULT_HEALTH: Record<VehicleType, number> = {
            [VehicleType.POLICE_CAR]: 100,
            [VehicleType.POLICE_VAN]: 150,
            [VehicleType.WATER_CANNON]: 200,
            [VehicleType.AMBULANCE]: 120,
            [VehicleType.FIRE_TRUCK]: 180,
            [VehicleType.NEWS_VAN]: 90,
            [VehicleType.ARMORED]: 300
        };

        return {
            vehicles: {
                ...state.vehicles,
                [id]: {
                    id,
                    type,
                    position,
                    rotation: [0, 0, 0],
                    health: DEFAULT_HEALTH[type] ?? 100,
                    active: true
                }
            }
        };
    }),
    updateVehicle: (id, data) => set((state) => ({
        vehicles: {
            ...state.vehicles,
            [id]: { ...state.vehicles[id], ...data }
        }
    })),
    removeVehicle: (id) => set((state) => {
        const { [id]: _, ...rest } = state.vehicles;
        return { vehicles: rest };
    })
}));
