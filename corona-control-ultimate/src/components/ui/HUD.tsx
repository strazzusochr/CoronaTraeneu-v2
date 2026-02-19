import React from 'react';
import './HUD.css';
import { useGameStore } from '@/stores/gameStore';
import { useTimeEngine, formatGameTime } from '@/core/TimeEngine';
import { usePhaseAnchor } from '@/core/PhaseAnchor';
import { UI_TIME_COLORS } from '@/shaders/ShaderConstants';
import type { UiAssetId } from '@/types/enums';

export const HUD = () => {
    const gameTimeSeconds = useTimeEngine(state => state.gameTimeSeconds);
    const { player, gameState, tensionLevel, moralLevel, escalationLevel } = useGameStore();
    const currentPhase = usePhaseAnchor(state => state.currentPhase);

    const HUD_ASSETS: Record<string, UiAssetId> = {
        phaseBadge: 'UIAS_BADGE_PHASE',
        objectiveBadge: 'UIAS_BADGE_OBJECTIVE',
        warningBadge: 'UIAS_BADGE_WARNING'
    };

    const timeString = formatGameTime(gameTimeSeconds);
    const minutes = gameTimeSeconds / 60;
    const hour = Math.floor(minutes / 60) % 24;

    const TENSION_THRESHOLDS = {
        warning: 40,
        critical: 70
    };

    const MORAL_THRESHOLDS = {
        low: 30,
        high: 70
    };

    const ESCALATION_THRESHOLDS = {
        medium: 50,
        high: 80
    };

    const timeColor = resolveTimeColor(hour);

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
                <div className="hud-bar-wrapper armor">
                    <div className="hud-bar-label">Schutzweste</div>
                    <div className="hud-bar-outer">
                        <div className="hud-bar-inner armor-bar" style={{ width: `${player.armor}%` }}></div>
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
                <div className="hud-bar-wrapper tension">
                    <div className="hud-bar-label">Lage-Spannung</div>
                    <div className="hud-bar-outer">
                        <div className="hud-bar-inner tension-bar" style={{ 
                            width: `${tensionLevel}%`,
                            backgroundColor: tensionLevel > TENSION_THRESHOLDS.critical
                                ? '#ff5722'
                                : (tensionLevel > TENSION_THRESHOLDS.warning ? '#ffeb3b' : '#2196f3')
                        }}></div>
                    </div>
                </div>
                <div className="hud-bar-wrapper moral">
                    <div className="hud-bar-label">Volks-Moral</div>
                    <div className="hud-bar-outer">
                        <div className="hud-bar-inner moral-bar" style={{ 
                            width: `${moralLevel}%`,
                            backgroundColor: moralLevel > MORAL_THRESHOLDS.high
                                ? '#4caf50'
                                : (moralLevel > MORAL_THRESHOLDS.low ? '#ffeb3b' : '#f44336')
                        }}></div>
                    </div>
                </div>
                <div className="hud-bar-wrapper escalation">
                    <div className="hud-bar-label">Eskalationsstufe</div>
                    <div className="hud-bar-outer">
                        <div className="hud-bar-inner escalation-bar" style={{ 
                            width: `${escalationLevel}%`,
                            backgroundColor: escalationLevel > ESCALATION_THRESHOLDS.high
                                ? '#b71c1c'
                                : (escalationLevel > ESCALATION_THRESHOLDS.medium ? '#e65100' : '#ff9800')
                        }}></div>
                    </div>
                </div>
            </div>

            {/* Top Center: Phase Status */}
            <div className="hud-top-center">
                <div className="hud-phase-badge" data-ui-asset={HUD_ASSETS.phaseBadge}>
                    PHASE <span className="phase-number">{currentPhase}</span> OPERATIV
                </div>
            </div>

            {/* Top Right: Objectives */}
            <div className="hud-objectives">
                <div className="hud-objective-title" data-ui-asset={HUD_ASSETS.objectiveBadge}>STREIFEN-PROTOKOLL</div>
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
                    EINSATZZEIT: <span style={{ color: timeColor, fontWeight: 700 }}>{timeString}</span> — WIEN INNERE STADT
                </div>
            </div>
        </div>
    );
};

export function resolveTimeColor(hour: number) {
    if (hour >= 6 && hour < 12) {
        return UI_TIME_COLORS.MORNING;
    } else if (hour >= 12 && hour < 18) {
        return UI_TIME_COLORS.MIDDAY;
    } else if (hour >= 18 && hour < 22) {
        return UI_TIME_COLORS.EVENING;
    } else {
        return UI_TIME_COLORS.NIGHT;
    }
}
