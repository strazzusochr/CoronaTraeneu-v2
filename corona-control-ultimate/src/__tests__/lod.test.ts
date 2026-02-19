import { describe, it, expect } from 'vitest';
import { LODProvider, useLOD } from '../scene/lod/LODManager';
import React from 'react';
import { renderHook } from '@testing-library/react';

describe('LODManager', () => {
    it('provides default thresholds', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(LODProvider, null, children);

        const { result } = renderHook(() => useLOD(), { wrapper });

        expect(result.current.high).toBe(15);
        expect(result.current.medium).toBe(40);
        expect(result.current.low).toBe(80);
    });

    it('allows overriding thresholds', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(LODProvider, { thresholds: { high: 10 } }, children);

        const { result } = renderHook(() => useLOD(), { wrapper });

        expect(result.current.high).toBe(10);
        expect(result.current.medium).toBe(40);
    });
});
