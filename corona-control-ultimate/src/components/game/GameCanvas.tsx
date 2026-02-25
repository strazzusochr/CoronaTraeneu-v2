import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Stats } from '@react-three/drei';
import { Leva, useControls, button } from 'leva';
import { useTimeEngine } from '@/core/TimeEngine';
import { useEngineLoop } from '@/core/EngineLoopManager';
import DynamicLighting from '@/rendering/DynamicLighting';
import { CityEnvironment } from '@/components/3d/environment/CityEnvironment';
import { InteractionDetector } from './InteractionDetector';
import CrowdRenderer from '@/components/CrowdRenderer';
import { PlayerCharacter } from './entities/PlayerCharacter';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';
import { npcAiManager } from '@/managers/NPCAIManager';
import { useGameStore } from '@/stores/gameStore';
import * as THREE from 'three';
import { PostProcessing } from '@/components/Effects/PostProcessing';
import { Physics } from '@react-three/rapier';
import { NPCType, Faction } from '@/types/enums';

import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { useDialogStore } from '@/managers/DialogManager';

/**
 * V7.0 HYPER AAA MASTER GAME CANVAS
 */

const CameraController = () => {
    const { camera } = useThree();
    const controlsRef = useRef<any>(null);
    const playerPos = useGameStore(state => state.player.position);
    const isPlaying = useGameStore(state => state.gameState.isPlaying);
    const isDialogOpen = useDialogStore(state => state.isOpen);
    const shiftDown = React.useRef(false);

    useFrame(() => {
        if (controlsRef.current && isPlaying) {
            const target = new THREE.Vector3(...playerPos);
            
            // 1. Ziel weich interpolieren
            controlsRef.current.target.lerp(target, 0.1);
            
            // 2. Kamera-Position nachführen basierend auf aktuellem spherical offset von OrbitControls
            if (controlsRef.current.enabled !== false) {
                 // OrbitControls berechnet intern die Kameraposition basierend auf dem target.
                 // Wir müssen nur sicherstellen, dass das Target nachgezogen wird und Controls geupdated werden.
                 controlsRef.current.update();
                 
                 // Berechne den Offset der Kamera zum alten Target und wende ihn auf das neue an
                 const offset = camera.position.clone().sub(controlsRef.current.target);
                 // Limitiere die Distanz
                 if (offset.length() > 500) offset.setLength(500);
                 
                 // Sanftes Nachziehen der Kamera-Position
                 const idealCameraPos = target.clone().add(offset);
                 camera.position.lerp(idealCameraPos, 0.1);
            }

            // Kamera-Input deaktivieren, wenn ein Dialog offen ist, um die Maus frei zu geben
            controlsRef.current.enabled = !isDialogOpen;
        }
    });

    React.useEffect(() => {
        const onDown = (e: KeyboardEvent) => {
            if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && !shiftDown.current) {
                shiftDown.current = true;
                if (controlsRef.current) {
                    controlsRef.current.mouseButtons.LEFT = THREE.MOUSE.PAN;
                }
            }
        };
        const onUp = (e: KeyboardEvent) => {
            if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && shiftDown.current) {
                shiftDown.current = false;
                if (controlsRef.current) {
                    controlsRef.current.mouseButtons.LEFT = THREE.MOUSE.ROTATE;
                }
            }
        };
        window.addEventListener('keydown', onDown);
        window.addEventListener('keyup', onUp);
        return () => {
            window.removeEventListener('keydown', onDown);
            window.removeEventListener('keyup', onUp);
        };
    }, []);

    return (
        <OrbitControls 
            ref={controlsRef}
            makeDefault 
            enablePan={true}
            panSpeed={1.8}
            screenSpacePanning={true}
            enableRotate={true}
            rotateSpeed={0.9}
            enableZoom={true}
            minDistance={5}
            maxDistance={500}
            zoomSpeed={1.1}
            enableDamping={true}
            dampingFactor={0.08}
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI * 0.47}
            mouseButtons={{
                LEFT: THREE.MOUSE.ROTATE,
                MIDDLE: THREE.MOUSE.DOLLY,
                RIGHT: THREE.MOUSE.PAN
            }}
        />
    );
};

const SceneContent: React.FC<{ debugMode: boolean }> = ({ debugMode }) => {
    const isPlaying = useGameStore(state => state.gameState.isPlaying);

    // Tastatur-Listener wurde in GameCanvas verschoben

    const setPlayerPosition = useGameStore(state => state.setPlayerPosition);
    const setPlayerHealth = useGameStore(state => state.setPlayerHealth);
    const playerHealth = useGameStore(state => state.player.health);
    const playerPos = useGameStore(state => state.player.position);
    const setGameTime = useTimeEngine(state => state.setGameTime);
    const gameTime = useTimeEngine(state => state.gameTimeSeconds);

    const addItem = useGameStore(state => (state as any).addItem);
    const spawnWave = useGameStore(state => state.spawnWave);
    const triggerScenario = useGameStore(state => state.triggerScenario);

    // Beispielhafte Leva-Steuerung
    const engineControls = useControls('Engine Debug', {
        bloomIntensity: { value: 1.5, min: 0, max: 5, label: 'Bloom Stärke' },
        ambientIntensity: { value: 0.5, min: 0, max: 2, label: 'Umgebungslicht' },
    }, { collapsed: true });

    const worldControls = useControls('Welt', {
        hour: { 
            value: Math.floor(gameTime / 3600), 
            min: 0, 
            max: 23, 
            step: 1, 
            label: 'Stunde (0-23)',
            onChange: (v) => setGameTime(v * 3600 + (gameTime % 3600))
        },
        fogDensity: { value: 0.012, min: 0, max: 0.1, label: 'Nebel-Dichte' },
        'Clear Sky': button(() => setGameTime(12 * 3600)),
        'Night Ambient': button(() => setGameTime(0)),
    }, { collapsed: true });

    const playerControls = useControls('Spieler', {
        health: { 
            value: playerHealth, 
            min: 0, 
            max: 100, 
            label: 'Gesundheit',
            onChange: (v) => setPlayerHealth(v)
        },
        speedBoost: { value: 1.0, min: 0.5, max: 5.0, label: 'Tempo-Multi' },
        'Teleport Petersdom': button(() => setPlayerPosition([0, 0.5, 0])),
        'Teleport Park Nord': button(() => setPlayerPosition([30, 0.5, 15])),
        'Teleport Tiber-Brücke': button(() => setPlayerPosition([120, 0.5, 0])),
        'Heal Player': button(() => setPlayerHealth(100)),
    }, { collapsed: true });

    useControls('KI & Szenarios', {
        'Spawn Polizei (5)': button(() => spawnWave(5, NPCType.POLICE, Faction.POLICE, playerPos)),
        'Spawn Rioteers (5)': button(() => spawnWave(5, NPCType.RIOTER, Faction.RIOTER, playerPos)),
        'Szenario: Konfrontation': button(() => triggerScenario('CLASH')),
        'Szenario: Demo': button(() => triggerScenario('DEMONSTRATION')),
    }, { collapsed: true });

    useControls('Inventar-Hacker', {
        'Gib Medkit': button(() => addItem({ id: 'ITEM_MEDKIT', name: 'Erste-Hilfe-Set', type: 'CONSUMABLE', quantity: 1, maxStack: 5, description: 'Heilt 50 HP.' })),
        'Gib Maske': button(() => addItem({ id: 'ITEM_MASK', name: 'FFP2-Maske', type: 'CONSUMABLE', quantity: 5, maxStack: 10, description: 'FFP2 Schutz.' })),
        'Gib Spritze': button(() => addItem({ id: 'ITEM_SYRINGE', name: 'Adrenalin-Spritze', type: 'CONSUMABLE', quantity: 1, maxStack: 5, description: 'Heilung.' })),
    }, { collapsed: true });

    // V7.0 Engine-Loop Hook
    useEngineLoop({
        onPhysics: () => {
            // Physik-System Update hier
        },
        onAI: () => {
            // NPC-KI Herzschlag (10Hz)
            try {
                if (isPlaying) npcAiManager.update();
            } catch (_err) {
                console.error('[EngineLoop] KI-Fehler:', _err);
            }
        },
        onEvent: () => {
            if (isPlaying) console.log('[EngineLoop] Event-Herzschlag (0.2Hz)');
        }
    });

    return (
        <>
            <DynamicLighting 
                quality="HIGH" 
                castShadows={true} 
                intensity={engineControls.ambientIntensity} 
                fogDensity={worldControls.fogDensity} 
            />

            <Physics timeStep="vary" debug={debugMode}>
                <CityEnvironment />
                <Suspense fallback={<Html center><LoadingOverlay message="Lade Chunks..." /></Html>}>
                    <InteractionDetector />
                    <PlayerCharacter speedMultiplier={playerControls.speedBoost} />
                    <CrowdRenderer />
                </Suspense>
            </Physics>

            {debugMode ? (
                <>
                    <Stats />
                    <PerformanceMonitor position="top-right" />
                </>
            ) : (
                <PerformanceMonitor show={false} />
            )}

            <PostProcessing intensity={engineControls.bloomIntensity} />

            <CameraController />
        </>
    );
};

export const GameCanvas = () => {
    const [error, setError] = React.useState<string | null>(null);
    const [webglSupported, setWebglSupported] = React.useState<boolean | null>(null);

    // Initialer WebGL-Check (aufgelockert für Cloud Gaming / Hyperbeam)
    React.useEffect(() => {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
            if (!gl) {
                console.warn("[GameCanvas] Manueller WebGL-Check fehlgeschlagen, versuche trotzdem zu rendern...");
            }
            // Wir setzen es immer auf true, um R3F den Versuch zu erlauben
            setWebglSupported(true);
        } catch (e) {
            console.warn("[GameCanvas] Fehler beim WebGL-Check:", e);
            setWebglSupported(true);
        }
    }, []);

    // Automatischer Reset bei schwerwiegenden Fehlern
    const handleRetry = () => {
        window.location.reload();
    };

    const [debugMode, setDebugMode] = useState(false);

    // Tastatur-Listener für den Debug-Modus (Umschalt + D)
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.shiftKey && e.key.toLowerCase() === 'd') {
                setDebugMode(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    React.useEffect(() => {
        if (webglSupported) console.log('[GameCanvas] Debug-Modus:', debugMode);
    }, [debugMode, webglSupported]);

    if (error || webglSupported === false) {
        return (
            <div style={{
                width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', color: 'white', background: '#050505',
                fontFamily: 'Outfit, sans-serif', padding: '20px', textAlign: 'center',
                position: 'fixed', top: 0, left: 0, zIndex: 9999
            }}>
                <div style={{ padding: '40px', border: '1px solid #ff3c3c', background: 'rgba(255,0,0,0.05)', borderRadius: '8px' }}>
                    <h2 style={{ color: '#ff3c3c', letterSpacing: '4px' }}>GRAFIK-FEHLER ERKANNT</h2>
                    <p style={{ opacity: 0.7, maxWidth: '400px', margin: '20px 0' }}>{error || 'Unbekannter Grafikfehler'}</p>
                    <button 
                        onClick={handleRetry}
                        style={{
                            marginTop: '20px', padding: '12px 30px', background: '#ff3c3c', 
                            color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
                            fontWeight: 'bold', letterSpacing: '2px'
                        }}
                    >
                        SYSTEM NEU STARTEN
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Canvas
                shadows
                camera={{ position: [0, 25, 40], fov: 55 }}
                style={{ background: '#050505' }}
                gl={{
                    powerPreference: 'high-performance',
                    antialias: true,
                    preserveDrawingBuffer: false,
                    alpha: false,
                    stencil: false,
                    depth: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace
                }}
                onCreated={({ gl, scene }) => {
                    const renderer = gl as any;
                    const canvas = renderer.domElement;

                    // 1. Kontextverlust-Handling
                    canvas.addEventListener('webglcontextlost', (_e: any) => {
                        _e.preventDefault();
                        console.error('[GameCanvas] WebGL-Kontext verloren');
                        setError("Grafik-Kontext verloren (VRAM Überlastung).");
                    }, false);

                    // 2. Szenen-Cleanup
                    return () => {
                        console.log('[Build 55] Bereinige Szene...');
                        scene.traverse((obj) => {
                            if (obj instanceof THREE.Mesh) {
                                obj.geometry.dispose();
                                if (obj.material instanceof THREE.Material) {
                                    obj.material.dispose();
                                }
                            }
                        });
                    };
                }}
            >
                <Suspense fallback={<Html fullscreen><LoadingOverlay message="Initialisiere Wien..." /></Html>}>
                    <SceneContent debugMode={debugMode} />
                </Suspense>
            </Canvas>

            <Leva hidden={!debugMode} theme={{
                colors: {
                    accent1: '#0088ff',
                    accent2: '#00aaff',
                    accent3: '#00ccff',
                }
            }} />
        </div>
    );
};
