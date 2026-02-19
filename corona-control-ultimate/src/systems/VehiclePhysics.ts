import * as THREE from 'three';

/**
 * VEH-010: VehiclePhysics
 * Physics calculations for vehicle movement and steering.
 */
export class VehiclePhysics {
    public static calculateMovement(
        currentSpeed: number,
        targetSpeed: number,
        currentSteering: number,
        targetSteering: number,
        dt: number,
        config = { acceleration: 5, braking: 10, steeringSpeed: 5 }
    ) {
        let newSpeed = currentSpeed;
        if (targetSpeed > currentSpeed) {
            newSpeed = Math.min(targetSpeed, currentSpeed + config.acceleration * dt);
        } else if (targetSpeed < currentSpeed) {
            newSpeed = Math.max(targetSpeed, currentSpeed - config.braking * dt);
        }

        const newSteering = THREE.MathUtils.lerp(currentSteering, targetSteering, config.steeringSpeed * dt);

        return { speed: newSpeed, steering: newSteering };
    }

    public static updateTransform(
        position: THREE.Vector3,
        rotation: THREE.Euler,
        speed: number,
        steering: number,
        dt: number
    ) {
        // Simple bicycle model for steering
        rotation.y += steering * speed * 0.1 * dt;
        
        const direction = new THREE.Vector3(0, 0, 1).applyEuler(rotation);
        position.add(direction.multiplyScalar(speed * dt));

        return { position, rotation };
    }
}
