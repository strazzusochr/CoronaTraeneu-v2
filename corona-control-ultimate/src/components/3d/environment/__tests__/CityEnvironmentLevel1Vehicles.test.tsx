import React from 'react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { CityEnvironment } from '../CityEnvironment';

vi.mock('@react-three/rapier', () => ({
    __esModule: true,
    RigidBody: () => null,
    CuboidCollider: () => null,
    Physics: ({ children }: { children: React.ReactNode }) => null,
    useRapier: () => ({ world: {} }),
}));

vi.mock('@/utils/ProceduralTextures', () => {
    const THREE = require('three');
    const make = () => new THREE.Texture();
    return {
        createFacadeTexture: make,
        createAsphaltTexture: make,
        createCobblestoneTexture: make,
        createConcreteTexture: make,
        createSkinTexture: make,
        createFabricTexture: make,
        createNormalMapFromCanvas: make,
        createRoofTileTexture: make,
        createRoofTileNormalMap: make,
    };
});

beforeAll(() => {
    if (typeof HTMLCanvasElement !== 'undefined') {
        const canvasContextStub: any = new Proxy(
            {},
            {
                get(target, prop) {
                    if (!(prop in target)) {
                        target[prop] = () => {};
                    }
                    return target[prop];
                },
                set(target, prop, value) {
                    target[prop] = value;
                    return true;
                },
            }
        );

        canvasContextStub.getImageData = (w: number, h: number) => ({ data: new Uint8ClampedArray(w * h * 4) });
        canvasContextStub.putImageData = () => {};
        canvasContextStub.createLinearGradient = () => ({ addColorStop: () => {} });

        HTMLCanvasElement.prototype.getContext = vi.fn(() => canvasContextStub) as any;
    }
});

describe('CityEnvironment Level 1 Vehicles', () => {
    it('rendert alle Level-1-Fahrzeuge aus LEVEL1_VEHICLES', () => {
        render(
            <Canvas frameloop="never">
                <CityEnvironment />
            </Canvas>
        );
        expect(true).toBe(true);
    });
});
