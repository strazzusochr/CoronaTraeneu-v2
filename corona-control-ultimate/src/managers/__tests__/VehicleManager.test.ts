import { describe, it, expect } from 'vitest';
import { useVehicleManager, VehicleType } from '../VehicleManager';

describe('VehicleManager', () => {
    it('setzt Health je Fahrzeugtyp gemäß DEFAULT_HEALTH-Mapping', () => {
        const manager = useVehicleManager.getState();

        const types: VehicleType[] = [
            VehicleType.POLICE_CAR,
            VehicleType.POLICE_VAN,
            VehicleType.WATER_CANNON,
            VehicleType.AMBULANCE,
            VehicleType.FIRE_TRUCK,
            VehicleType.NEWS_VAN,
            VehicleType.ARMORED,
        ];

        const expected: Record<VehicleType, number> = {
            [VehicleType.POLICE_CAR]: 100,
            [VehicleType.POLICE_VAN]: 150,
            [VehicleType.WATER_CANNON]: 200,
            [VehicleType.AMBULANCE]: 120,
            [VehicleType.FIRE_TRUCK]: 180,
            [VehicleType.NEWS_VAN]: 90,
            [VehicleType.ARMORED]: 300,
        };

        types.forEach((type) => {
            manager.spawnVehicle(type, [0, 0, 0]);
            const vehicles = useVehicleManager.getState().vehicles;
            const last = Object.values(vehicles).slice(-1)[0];
            expect(last.type).toBe(type);
            expect(last.health).toBe(expected[type]);
        });
    });
});

