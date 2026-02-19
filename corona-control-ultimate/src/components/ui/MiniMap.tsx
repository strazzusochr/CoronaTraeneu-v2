import React from 'react';
import { useGameStore } from '@/stores/gameStore';
import './MiniMap.css';

/**
 * UI-007: MiniMap
 * Displays player position and nearby NPCs on a 2D map.
 */
export const MiniMap: React.FC = () => {
    const { player, npcs } = useGameStore();
    
    // Scale: 200m world = 150px map
    const WORLD_SIZE = 200;
    const MAP_SIZE = 150;
    const SCALE = MAP_SIZE / WORLD_SIZE;

    const worldToMap = (pos: [number, number, number]): { x: number, y: number } => {
        return {
            x: (pos[0] * SCALE) + (MAP_SIZE / 2),
            y: (pos[2] * SCALE) + (MAP_SIZE / 2)
        };
    };

    const playerPos = worldToMap(player.position);

    return (
        <div className="minimap-container">
            <div className="minimap-outer">
                <div className="minimap-inner">
                    {/* Grid Lines */}
                    <div className="minimap-grid"></div>
                    
                    {/* NPCs */}
                    {npcs.map(npc => {
                        const pos = worldToMap(npc.position);
                        if (pos.x < 0 || pos.x > MAP_SIZE || pos.y < 0 || pos.y > MAP_SIZE) return null;
                        
                        return (
                            <div 
                                key={npc.id} 
                                className={`minimap-dot npc ${npc.type.toLowerCase()}`}
                                style={{ left: pos.x, top: pos.y }}
                            />
                        );
                    })}

                    {/* Player */}
                    <div 
                        className="minimap-dot player"
                        style={{ 
                            left: playerPos.x, 
                            top: playerPos.y,
                            transform: `translate(-50%, -50%) rotate(${player.rotation}rad)`
                        }}
                    >
                        <div className="player-arrow"></div>
                    </div>
                </div>
            </div>
            <div className="minimap-label">WIEN - SEKTOR 1</div>
        </div>
    );
};

export default MiniMap;
