import React from 'react';
import { usePhaseAnchor } from '@/core/PhaseAnchor';
import { useFeatureFlags } from '@/core/FeatureFlags';
import { useGameStore } from '@/stores/gameStore';

export const DebugOverlay = () => {
    const { currentPhase, promotePhase, rollbackToStable, phaseStatus } = usePhaseAnchor();
    const flags = useFeatureFlags((state) => state.flags);
    const triggerScenario = useGameStore(state => state.triggerScenario);
    const npcCount = useGameStore(state => state.npcs.length);
    const [fps, setFps] = React.useState(0);
    const frameCount = React.useRef(0);
    const lastTime = React.useRef(performance.now());

    const debugButtonStyle: React.CSSProperties = {
        background: 'rgba(255, 255, 255, 0.05)',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '4px 8px',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '9px',
        textAlign: 'center'
    };

    React.useEffect(() => {
        let handle: number;
        const loop = () => {
            frameCount.current++;
            const now = performance.now();
            if (now > lastTime.current + 1000) {
                setFps(Math.round((frameCount.current * 1000) / (now - lastTime.current)));
                frameCount.current = 0;
                lastTime.current = now;
            }
            handle = requestAnimationFrame(loop);
        };
        handle = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(handle);
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 1000,
            background: 'rgba(15, 15, 20, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#00d2ff',
            padding: '20px',
            fontFamily: "'Outfit', monospace",
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            fontSize: '11px',
            pointerEvents: 'auto'
        }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '13px', letterSpacing: '2px', color: '#fff' }}>🚨 PHASE CONTROL</h3>

            <div style={{ marginBottom: '15px', color: 'rgba(255,255,255,0.7)' }}>
                <strong>PHASE:</strong> <span style={{ color: '#00d2ff' }}>{currentPhase}</span><br />
                <strong>STATUS:</strong> {phaseStatus[currentPhase]}<br />
                <strong>PERFORMANCE:</strong> <span style={{ color: fps > 30 ? '#00ff00' : '#ff3c3c' }}>{fps} FPS</span><br />
                <strong>NPCs:</strong> <span style={{ color: '#fff' }}>{npcCount}</span>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <strong style={{ display: 'block', marginBottom: '8px', opacity: 0.7 }}>SCENARIOS:</strong>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                    <button onClick={() => triggerScenario('DEMONSTRATION')} style={debugButtonStyle}>DEMO (+50)</button>
                    <button onClick={() => triggerScenario('POLICE_UNIT')} style={debugButtonStyle}>POLICE (+50)</button>
                    <button onClick={() => triggerScenario('CLASH')} style={debugButtonStyle}>CLASH (25/25)</button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <button
                    onClick={() => promotePhase()}
                    style={{
                        background: 'rgba(0, 210, 255, 0.2)',
                        color: 'white',
                        border: '1px solid #00d2ff',
                        padding: '6px 10px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '9px'
                    }}
                >
                    PROMOTE
                </button>
                <button
                    onClick={() => rollbackToStable()}
                    style={{
                        background: 'rgba(255, 60, 60, 0.2)',
                        color: 'white',
                        border: '1px solid #ff3c3c',
                        padding: '6px 10px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '9px'
                    }}
                >
                    ROLLBACK
                </button>
            </div>

            <div>
                <strong style={{ opacity: 0.5, letterSpacing: '1px' }}>ACTIVE EXTENSIONS:</strong>
                <ul style={{ paddingLeft: '15px', margin: '5px 0', listStyle: 'square' }}>
                    {Object.entries(flags)
                        .filter(([_, enabled]) => enabled)
                        .map(([key]) => (
                            <li key={key} style={{ marginBottom: '2px' }}>{key}</li>
                        ))}
                    {Object.values(flags).every(v => !v) && <li>Baseline Stable</li>}
                </ul>
            </div>
        </div>
    );
};
