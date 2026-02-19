import React from 'react';

/**
 * LoadingOverlay - Minimalist loading indicator
 * High priority UI to show while the engine is warming up.
 */
export const LoadingOverlay: React.FC<{ message?: string }> = ({ message = 'Lade System...' }) => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            fontFamily: 'Outfit, sans-serif'
        }}>
            <div style={{
                width: '60px',
                height: '60px',
                border: '3px solid rgba(255, 255, 255, 0.1)',
                borderTop: '3px solid #ff3c3c',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '20px'
            }} />
            <div style={{
                color: 'white',
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                opacity: 0.8
            }}>
                {message}
            </div>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};
