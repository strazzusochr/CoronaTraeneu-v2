import React from 'react';
import { usePhaseAnchor } from '@/core/PhaseAnchor';
import { useFeatureFlags } from '@/core/FeatureFlags';

export const DebugOverlay = () => {
    const { currentPhase, promotePhase, rollbackToStable, phaseStatus } = usePhaseAnchor();
    const flags = useFeatureFlags((state) => state.flags);

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
                <strong>STATUS:</strong> {phaseStatus[currentPhase]}
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
