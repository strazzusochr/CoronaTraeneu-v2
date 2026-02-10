import React, { useState } from 'react';
import './MainMenu.css';

export const MainMenu = ({ onStart }: { onStart: () => void }) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    const handleStart = () => {
        setIsVisible(false);
        onStart();
    };

    return (
        <div className="main-menu">
            <div className="menu-overlay"></div>
            <div className="menu-content">
                <h1 className="menu-title">CORONA CONTROL <span className="title-alt">ULTIMATE</span></h1>
                <p className="menu-subtitle">WIEN / STEPHANSPLATZ / 2022</p>

                <div className="menu-actions">
                    <button className="menu-btn primary" onClick={handleStart}>EINSATZ BEGINNEN</button>
                    <button className="menu-btn">EINSTELLUNGEN</button>
                    <button className="menu-btn">ARCHIV</button>
                    <button className="menu-btn exit">BEENDEN</button>
                </div>

                <div className="menu-footer">
                    V6.0 MASTER BUILD // GEMINI STRICT CONTROL PROTOCOL ACTIVE
                </div>
            </div>
        </div>
    );
};
