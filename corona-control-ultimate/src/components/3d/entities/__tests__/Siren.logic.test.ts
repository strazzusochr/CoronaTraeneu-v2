import { describe, it, expect } from 'vitest';
import { getSirenIntensities } from '@/components/3d/entities/Siren';

describe('Siren logic', () => {
  it('returns zero intensities when inactive', () => {
    const [i1, i2] = getSirenIntensities(false, 0);
    expect(i1).toBe(0);
    expect(i2).toBe(0);
  });

  it('alternates intensities when active over time', () => {
    const [a1, a2] = getSirenIntensities(true, 0);
    const [b1, b2] = getSirenIntensities(true, 0.2);
    expect(a1 === 0 || a1 === 5).toBe(true);
    expect(a2 === 0 || a2 === 5).toBe(true);
    expect(b1 === 0 || b1 === 5).toBe(true);
    expect(b2 === 0 || b2 === 5).toBe(true);
    expect(a1 !== a2).toBe(true);
    expect(b1 !== b2).toBe(true);
  });
});
