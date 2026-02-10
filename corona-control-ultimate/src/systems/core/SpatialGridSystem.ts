/**
 * MEGA-SPEC: SPATIAL GRID SYSTEM
 * 
 * 1000x1000m world
 * 5x5m cells -> 40,000 cells
 * O(1) entity registration and lookup
 */

export class SpatialGridSystem {
    private static instance: SpatialGridSystem;
    private grid: Map<string, Set<string>> = new Map();
    private cellSize: number = 5;
    private worldSize: number = 1000;
    private offset: number = 500; // Shift origin so center is 0,0

    private constructor() { }

    public static getInstance(): SpatialGridSystem {
        if (!SpatialGridSystem.instance) {
            SpatialGridSystem.instance = new SpatialGridSystem();
        }
        return SpatialGridSystem.instance;
    }

    private getKey(x: number, z: number): string {
        const gx = Math.floor((x + this.offset) / this.cellSize);
        const gz = Math.floor((z + this.offset) / this.cellSize);
        return `${gx}_${gz}`;
    }

    public updateEntity(id: string, oldPos: [number, number, number] | null, newPos: [number, number, number]): void {
        const newKey = this.getKey(newPos[0], newPos[2]);

        if (oldPos) {
            const oldKey = this.getKey(oldPos[0], oldPos[2]);
            if (oldKey === newKey) return; // Still in same cell

            // Remove from old
            const oldSet = this.grid.get(oldKey);
            if (oldSet) {
                oldSet.delete(id);
                if (oldSet.size === 0) this.grid.delete(oldKey);
            }
        }

        // Add to new
        if (!this.grid.has(newKey)) {
            this.grid.set(newKey, new Set());
        }
        this.grid.get(newKey)!.add(id);
    }

    public getEntitiesInRadius(x: number, z: number, radius: number): string[] {
        const results: string[] = [];
        const minX = x - radius;
        const maxX = x + radius;
        const minZ = z - radius;
        const maxZ = z + radius;

        for (let ix = minX; ix <= maxX + this.cellSize; ix += this.cellSize) {
            for (let iz = minZ; iz <= maxZ + this.cellSize; iz += this.cellSize) {
                const key = this.getKey(ix, iz);
                const set = this.grid.get(key);
                if (set) {
                    results.push(...Array.from(set));
                }
            }
        }
        return results;
    }

    public clear(): void {
        this.grid.clear();
    }
}

// Singleton Instance for Phase 5 NPCs
export const spatialGrid = SpatialGridSystem.getInstance();

// Hook for React components
export const useSpatialGrid = () => spatialGrid;
