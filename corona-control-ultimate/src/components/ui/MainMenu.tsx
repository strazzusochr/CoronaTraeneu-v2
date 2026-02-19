import React from 'react';
import './MainMenu.css';
import { useGameStore } from '@/stores/gameStore';
import type { UiAssetId } from '@/types/enums';

export const MainMenu = ({ onStart }: { onStart: () => void }) => {
    const openSettings = useGameStore(state => state.openSettings);

    const handleStart = () => {
        onStart();
    };

    const MENU_ASSETS: Record<string, UiAssetId> = {
        frame: 'UIAS_FRAME_MENU',
        btnStart: 'UIAS_ICON_HEALTH',
        btnSettings: 'UIAS_ICON_SETTINGS',
        btnArchive: 'UIAS_ICON_ARCHIVE',
        btnExit: 'UIAS_ICON_EXIT'
    };

    return (
        <div className="main-menu">
            <div className="menu-overlay"></div>
            <div className="menu-content" data-ui-asset={MENU_ASSETS.frame}>
                <h1 className="menu-title">CORONA CONTROL <span className="title-alt">ULTIMATE</span></h1>
                <p className="menu-subtitle">WIEN / STEPHANSPLATZ / 2022</p>

                <div className="menu-actions">
                    <button className="menu-btn primary" data-ui-asset={MENU_ASSETS.btnStart} onClick={handleStart}>EINSATZ BEGINNEN</button>
                    <button className="menu-btn" data-ui-asset={MENU_ASSETS.btnSettings} onClick={openSettings}>EINSTELLUNGEN</button>
                    <button className="menu-btn" data-ui-asset={MENU_ASSETS.btnArchive}>ARCHIV</button>
                    <button className="menu-btn exit" data-ui-asset={MENU_ASSETS.btnExit}>BEENDEN</button>
                </div>

                <div className="menu-footer">
                    V6.0 MASTER BUILD // GEMINI STRICT CONTROL PROTOCOL ACTIVE
                </div>
            </div>
        </div>
    );
};
