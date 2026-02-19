import { describe, it, expect } from 'vitest';
import WienGenerator, { CHUNK_SIZE } from '@/world/WienGenerator';

describe('WienGenerator', () => {
  it('generates and streams chunks around player position', () => {
    const chunks = WienGenerator.updateStreamingPools(0, 0);
    expect(chunks.length).toBeGreaterThan(0);
    const hasCenter = chunks.some(c => c.x === 0 && c.z === 0);
    expect(hasCenter).toBe(true);
  });

  it('moves streaming window when player moves beyond threshold', () => {
    const chunksStart = WienGenerator.updateStreamingPools(0, 0);
    const chunksMoved = WienGenerator.updateStreamingPools(CHUNK_SIZE * 4, 0);
    const keysStart = new Set(chunksStart.map(c => `${c.x},${c.z}`));
    const keysMoved = new Set(chunksMoved.map(c => `${c.x},${c.z}`));
    let diff = 0;
    keysMoved.forEach(k => { if (!keysStart.has(k)) diff++; });
    expect(diff).toBeGreaterThan(0);
  });
});
