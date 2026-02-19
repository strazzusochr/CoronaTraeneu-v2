import { SpatialGrid } from './ai/SpatialGrid';
import type { GridEntity } from './ai/SpatialGrid';
import { useGameStore } from '@/stores/gameStore';
import { FlowFieldSystem } from './FlowFieldSystem';
import { EngineLoop } from '@/core/EngineLoopManager';

class CrowdSystem {
    private static instance: CrowdSystem;
    private grid: SpatialGrid;
    private lastFlowFieldUpdate = Number.NEGATIVE_INFINITY;
    private readonly FLOWFIELD_INTERVAL = 100;

    private constructor() {
        this.grid = new SpatialGrid(4.0); // 4m cell size
    }

    public static getInstance(): CrowdSystem {
        if (!CrowdSystem.instance) {
            CrowdSystem.instance = new CrowdSystem();
        }
        return CrowdSystem.instance;
    }

    public update(_delta: number) {
        // Full grid rebuild every frame is O(N). N=500 is fast.
        // JS Map set/get is fast.
        // Let's do it every frame for accuracy, or throttle if heavy.

        this.grid.clear();

        const npcs = useGameStore.getState().npcs;
        // Optimization: Accessing array directly from store state might be slow if state is complex proxy.
        // Ideally we iterate a raw array.

        const playerPos = useGameStore.getState().player.position;
        if (playerPos) {
            const now = Date.now();
            if (now - this.lastFlowFieldUpdate >= this.FLOWFIELD_INTERVAL) {
                FlowFieldSystem.getInstance().calculateFlowField(playerPos[0], playerPos[2]);
                this.lastFlowFieldUpdate = now;
            }
        }

        for (const npc of npcs) {
            // Only add if active/close? Or all?
            // Add all for global avoidance logic readiness
            if (npc.position) {
                this.grid.insert(
                    npc.id,
                    npc.position[0],
                    npc.position[2],
                    npc.velocity ? npc.velocity[0] : 0,
                    npc.velocity ? npc.velocity[2] : 0,
                    npc.type
                );
            }
        }
    }

    public getNeighbors(x: number, z: number, radius: number): GridEntity[] {
        return this.grid.query(x, z, radius);
    }

    public resetForTests() {
        this.lastFlowFieldUpdate = Number.NEGATIVE_INFINITY;
        this.grid.clear();
    }
}

const crowdSystem = CrowdSystem.getInstance();
EngineLoop.onAIUpdate((dt) => crowdSystem.update(dt));

export default CrowdSystem;
