
import React from 'react';
import { useGameStore } from '@/stores/gameStore';
import NPC from './NPC';
import InstancedCrowd from './InstancedCrowd';
import * as THREE from 'three';

const CrowdRenderer: React.FC = () => {
    const npcs = useGameStore(state => state.npcs);
    const playerPos = useGameStore(state => state.player.position);
    const DISTANCE_THRESHOLD = 15; // PERFORMANCE: Reduziert auf 15m (vorher 50m) für CPU-Entlastung. InstancedCrowd übernimmt den Rest.

    // Filter für nahe NPCs (High Detail)
    // Wir rendern hier nur die, die NAH sind. InstancedCrowd kümmert sich um den Rest.
    const detailedNPCs = npcs.filter(npc => {
        const dx = playerPos[0] - npc.position[0];
        const dz = playerPos[2] - npc.position[2];
        const distSq = dx * dx + dz * dz;
        return distSq <= DISTANCE_THRESHOLD * DISTANCE_THRESHOLD;
    });

    return (
        <>
            {/* High Detail NPCs */}
            {detailedNPCs.map(npc => (
                <NPC
                    key={npc.id}
                    id={npc.id}
                    type={npc.type}
                    state={npc.state}
                    position={npc.position}
                />
            ))}

            {/* Low Detail Background Crowd */}
            <InstancedCrowd distanceThreshold={DISTANCE_THRESHOLD} />
        </>
    );
};

export default CrowdRenderer;
