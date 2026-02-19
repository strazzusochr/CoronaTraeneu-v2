import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { VehiclePhysics } from '@/systems/VehiclePhysics';

describe('VehiclePhysics', () => {
  it('accelerates towards target speed', () => {
    const res = VehiclePhysics.calculateMovement(0, 10, 0, 0, 1);
    expect(res.speed).toBeGreaterThan(0);
    expect(res.speed).toBeLessThanOrEqual(10);
  });

  it('updates position based on speed and rotation', () => {
    const pos = new THREE.Vector3(0, 0, 0);
    const rot = new THREE.Euler(0, 0, 0);
    const { position } = VehiclePhysics.updateTransform(pos, rot, 5, 0, 1);
    expect(position.z).toBeGreaterThan(0);
  });
});
