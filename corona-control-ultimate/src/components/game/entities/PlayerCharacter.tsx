import React, { useRef, useEffect } from 'react';
import { useEngineLoop } from '@/core/EngineLoopManager';
import { useGameStore } from '@/stores/gameStore';
import { BaseCharacter } from './BaseCharacter';
import { NPCType, NPCState } from '@/types/enums';

/**
 * PlayerCharacter (V7.0)
 * Spezialisierte Komponente für den gesteuerten Charakter.
 * Nutzt den 120Hz Physik-Loop für präzises Movement.
 */
export const PlayerCharacter: React.FC = () => {
    const player = useGameStore(state => state.player);
    const setPlayerPosition = useGameStore(state => state.setPlayerPosition);

    // Input Buffer (Direkter Zugriff ohne React-Rerender Overhead)
    const keys = useRef<{ [key: string]: boolean }>({});

    useEffect(() => {
        const handleDown = (e: KeyboardEvent) => { keys.current[e.code] = true; };
        const handleUp = (e: KeyboardEvent) => { keys.current[e.code] = false; };
        window.addEventListener('keydown', handleDown);
        window.addEventListener('keyup', handleUp);
        return () => {
            window.removeEventListener('keydown', handleDown);
            window.removeEventListener('keyup', handleUp);
        };
    }, []);

    // 120Hz Physics & Movement Loop
    useEngineLoop({
        onPhysics: (dt) => {
            if (!player) return;

            let moveX = 0;
            let moveZ = 0;
            const speed = 7.5; // V7.0 Standard Speed

            if (keys.current['KeyW'] || keys.current['ArrowUp']) moveZ -= 1;
            if (keys.current['KeyS'] || keys.current['ArrowDown']) moveZ += 1;
            if (keys.current['KeyA'] || keys.current['ArrowLeft']) moveX -= 1;
            if (keys.current['KeyD'] || keys.current['ArrowRight']) moveX += 1;

            if (moveX !== 0 || moveZ !== 0) {
                // Normalisierung
                const length = Math.sqrt(moveX * moveX + moveZ * moveZ);
                const nextPos: [number, number, number] = [
                    player.position[0] + (moveX / length) * speed * dt,
                    player.position[1],
                    player.position[2] + (moveZ / length) * speed * dt
                ];

                // Store-Update für globale Sichtbarkeit & Persistenz
                setPlayerPosition(nextPos);
            }
        }
    });

    return (
        <BaseCharacter
            position={player?.position || [0, 1, 0]}
            rotation={player?.rotation || 0}
            type={NPCType.PLAYER}
            state={NPCState.IDLE}
            isPlayer={true}
            color="#3366ff"
        />
    );
};
