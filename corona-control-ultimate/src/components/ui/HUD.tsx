import React from 'react';
import './HUD.css';
import { useGameStore } from '@/stores/gameStore';
import { useTimeEngine, formatGameTime } from '@/core/TimeEngine';

export const HUD = () => {
    const gameTimeSeconds = useTimeEngine(state => state.gameTimeSeconds);
    const { player, gameState } = useGameStore();

    const timeString = formatGameTime(gameTimeSeconds);

    return (
        <div className="hud-container">
            {/* Top Left: Bars */}
            <div className="hud-top-left">
                <div className="hud-bar-wrapper hp">
                    <div className="hud-bar-label">Physische Verfassung</div>
                    <div className="hud-bar-outer">
                        <div className="hud-bar-inner" style={{ width: `${gameState.health}%` }}></div>
                    </div>
                </div>
                <div className="hud-bar-wrapper stamina">
                    <div className="hud-bar-label">Ausdauer</div>
                    <div className="hud-bar-outer">
                        <div className="hud-bar-inner" style={{ width: `${player.stamina}%` }}></div>
                    </div>
                </div>
                <div className="hud-bar-wrapper karma">
                    <div className="hud-bar-label">Karma / Ansehen</div>
                    <div className="hud-bar-outer">
                        {/* Karma Scale: -100 to +100 -> 0% to 100% */}
                        <div className="hud-bar-inner" style={{
                            width: `${(player.karma + 100) / 2}%`,
                            backgroundColor: player.karma >= 0 ? '#4caf50' : '#f44336'
                        }}></div>
                    </div>
                </div>
            </div>

            {/* Top Right: Objectives */}
            <div className="hud-objectives">
                <div className="hud-objective-title">STREIFEN-PROTOKOLL</div>
                {useGameStore.getState().missions.map((m, i) => (
                    <div key={m.id} className={`hud-objective-item ${i < gameState.currentMissionIndex ? 'completed' : ''}`}>
                        <div className="hud-objective-dot"></div>
                        {m.description} ({m.currentAmount}/{m.targetAmount})
                    </div>
                ))}
            </div>

            {/* Bottom Center: Contextual Info & Prompts */}
            <div className="hud-bottom-center">
                {gameState.activePrompt && (
                    <div className="hud-prompt-box">
                        {gameState.activePrompt}
                    </div>
                )}
                <div className="hud-time-display">
                    EINSATZZEIT: <span style={{ color: '#00d2ff', fontWeight: 700 }}>{timeString}</span> — WIEN INNERE STADT
                </div>
            </div>
        </div>
    );
};
