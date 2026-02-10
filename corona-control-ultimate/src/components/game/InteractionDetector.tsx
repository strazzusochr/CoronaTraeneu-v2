import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/stores/gameStore';
import { poiSystem } from '@/systems/POISystem';

/**
 * InteractionDetector (V7.0)
 * Prüft jeden Frame die Nähe zu POIs und zeigt Interaktions-Prompts an.
 */
export const InteractionDetector: React.FC = () => {
    const playerPos = useGameStore(state => state.player.position);
    const setPrompt = useGameStore(state => state.setPrompt);
    const [activeInteraction, setActiveInteraction] = useState<string | null>(null);

    useFrame(() => {
        // Suche nach POIs im Umkreis von 3 Metern um den Spieler
        const nearby = poiSystem.getNearbyPOIs(playerPos, 3);

        if (nearby.length > 0) {
            const closest = nearby[0];
            if (activeInteraction !== closest.id) {
                setActiveInteraction(closest.id);
                setPrompt(`[E] ${closest.label}`);
            }
        } else if (activeInteraction !== null) {
            setActiveInteraction(null);
            setPrompt(null);
        }
    });

    // Tastatur-Abfrage für Interaktion (E-Taste)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'e' && activeInteraction) {
                poiSystem.executeInteraction(activeInteraction);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeInteraction]);

    return null; // Reine Logik-Komponente
};
