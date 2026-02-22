import React, { useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';

export const InteractionMenu: React.FC = () => {
    const activeInteraction = useGameStore(state => state.gameState.activeInteraction);
    const closeInteractionMenu = useGameStore(state => state.closeInteractionMenu);

    useEffect(() => {
        if (!activeInteraction) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key.toLowerCase() === 'e') {
                closeInteractionMenu();
                return;
            }

            const index = parseInt(e.key) - 1;
            if (index >= 0 && index < activeInteraction.options.length) {
                const opt = activeInteraction.options[index];
                opt.action();
                closeInteractionMenu();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeInteraction, closeInteractionMenu]);

    if (!activeInteraction) return null;

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(15, 20, 25, 0.95)',
            border: '2px solid #4fc3f7',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 0 30px rgba(0, 191, 255, 0.3)',
            color: 'white',
            zIndex: 10000,
            pointerEvents: 'auto',
            minWidth: '300px'
        }}>
            <h3 style={{ margin: '0 0 20px 0', borderBottom: '1px solid #333', paddingBottom: '12px', color: '#4fc3f7', textAlign: 'center', fontSize: '1.2rem', textTransform: 'uppercase' }}>
                {activeInteraction.title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeInteraction.options.map((opt, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            opt.action();
                            closeInteractionMenu();
                        }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '6px',
                            padding: '12px',
                            color: 'white',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                            display: 'flex',
                            gap: '15px',
                            fontSize: '1rem',
                            alignItems: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(79, 195, 247, 0.2)';
                            e.currentTarget.style.borderColor = '#4fc3f7';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <span style={{ color: '#4fc3f7', fontWeight: 'bold', minWidth: '20px' }}>[{index + 1}]</span>
                        <span>{opt.label}</span>
                    </button>
                ))}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: '#888' }}>
                [ESC] oder [E] zum Abbrechen
            </div>
        </div>
    );
};

export default InteractionMenu;
