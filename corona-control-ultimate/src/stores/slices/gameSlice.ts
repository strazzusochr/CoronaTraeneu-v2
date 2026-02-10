import { EmotionalState, Faction, NPCState, NPCType } from '@/types/enums';
import { poiSystem } from '@/systems/POISystem';
import { arrestSystem } from '@/systems/ArrestSystem';
import { NPCData } from '@/types/interfaces';
import type { StateCreator } from 'zustand';
import type { GameStore } from '../types';

export const createGameSlice: StateCreator<GameStore, [], [], Pick<GameStore,
    'gameState' | 'missions' | 'npcs' | 'markedNpcIds' | 'projectiles' | 'worldItems' | 'player' | 'tensionLevel' |
    'startGame' | 'resetGame' | 'setPoints' | 'addPoints' | 'takeDamage' |
    'updateMissionProgress' | 'nextMission' | 'setGameOver' | 'setVictory' |
    'setPrompt' | 'spawnWave' | 'addProjectile' |
    'removeProjectile' | 'spawnItem' | 'removeWorldItem' | 'saveGame' | 'loadGame' | 'markNpc' | 'updateNpc' |
    'setPlayerPosition' | 'setPlayerHealth' | 'setTension' | 'toggleBinoculars' |
    'arrestNpc' | 'adjustKarma'
>> = (set, get) => ({
    gameState: {
        points: 0,
        health: 100,
        isGameOver: false,
        isVictory: false,
        currentMissionIndex: 0,
        menuState: 'MAIN',
        isPlaying: false,
        activeCutscene: null,
        activePrompt: null,
        cutsceneTime: 0
    },
    npcs: [],
    markedNpcIds: [],
    missions: [
        { id: 1, type: 'REACH_TARGET', description: 'Beobachtungsposten Nordseite erreichen', targetAmount: 1, currentAmount: 0 },
        { id: 2, type: 'REACH_TARGET', description: 'Martin Krause identifizieren die Menge filmen', targetAmount: 1, currentAmount: 0 },
        { id: 3, type: 'DISPERSE_RIOTERS', description: 'Situation deeskalieren oder Randalierer zerstreuen', targetAmount: 5, currentAmount: 0 }
    ],

    projectiles: [],
    worldItems: [],

    player: {
        id: 'player_01',
        position: [0, 1, 0],
        rotation: 0,
        health: 100,
        stamina: 100,
        karma: 0,
        inventory: []
    },
    tensionLevel: 0,

    startGame: () => set((state) => {
        const krause: NPCData = {
            id: 9999,
            type: NPCType.KRAUSE,
            position: [45.0, 0.5, -30.0],
            velocity: [0, 0, 0],
            rotation: 0,
            state: NPCState.IDLE,
            faction: Faction.KRAUSE_FOLLOWERS,
            emotions: { current: EmotionalState.NEUTRAL, stress: 0, aggression: 0, fear: 0 },
            lodLevel: 0,
            hairColor: '#ffffff',
            outfitId: 'suit_01'
        };

        const crowd: NPCData[] = Array.from({ length: 200 }, (_, i) => ({
            id: 2000 + i,
            type: Math.random() > 0.8 ? NPCType.RIOTER : NPCType.CIVILIAN,
            position: [
                (Math.random() - 0.5) * 150,
                1,
                (Math.random() - 0.5) * 150
            ] as [number, number, number],
            velocity: [0, 0, 0] as [number, number, number],
            rotation: Math.random() * Math.PI * 2,
            state: NPCState.IDLE,
            faction: Faction.CIVILIAN,
            emotions: { current: EmotionalState.NEUTRAL, stress: 0, aggression: 0, fear: 0 },
            lodLevel: 2,
            hairColor: '#442211',
            outfitId: 'casual_01'
        }));

        return {
            gameState: {
                ...state.gameState,
                menuState: 'PLAYING',
                isPlaying: true,
                isGameOver: false,
                isVictory: false,
                health: 100,
                points: 0,
                currentMissionIndex: 0
            },
            missions: state.missions.map(m => ({ ...m, currentAmount: 0 })),
            tensionLevel: 0,
            worldItems: [
                { id: 'item1', itemId: 'medkit', position: [2, 0.5, 5] },
                { id: 'item2', itemId: 'stone', position: [-2, 0.5, 5] },
            ],
            projectiles: [],
            npcs: [krause, ...crowd]
        };

        // V7.0 Nach dem Start: Alle NPCs im POI System registrieren
        [krause, ...crowd].forEach(npc => {
            poiSystem.registerPOI({
                id: `npc_${npc.id}`,
                type: 'PERSON',
                position: npc.position as [number, number, number],
                interactionRadius: 2,
                label: npc.type === NPCType.KRAUSE ? "Martin Krause" : "Bürger verhaften",
                action: () => arrestSystem.startArrest(npc.id)
            });
        });
    }),

    resetGame: () => set((state) => ({
        gameState: {
            ...state.gameState,
            menuState: 'MAIN',
            previousMenuState: undefined,
            isPlaying: false,
            isGameOver: false,
            isVictory: false
        }
    })),

    setPoints: (points) => set((state) => ({
        gameState: { ...state.gameState, points }
    })),

    addPoints: (amount) => set((state) => ({
        gameState: { ...state.gameState, points: state.gameState.points + amount }
    })),

    takeDamage: (amount) => set((state) => {
        const newHealth = Math.max(0, state.gameState.health - amount);
        return {
            gameState: {
                ...state.gameState,
                health: newHealth,
                isGameOver: newHealth <= 0
            }
        };
    }),

    updateMissionProgress: (amount) => set((state) => {
        const currentMission = state.missions[state.gameState.currentMissionIndex];
        if (!currentMission) return {};

        const newMissions = state.missions.map((m, i) => {
            if (i === state.gameState.currentMissionIndex) {
                return { ...m, currentAmount: m.currentAmount + amount };
            }
            return m;
        });

        return { missions: newMissions };
    }),

    nextMission: () => set((state) => ({
        gameState: {
            ...state.gameState,
            currentMissionIndex: Math.min(state.gameState.currentMissionIndex + 1, state.missions.length)
        }
    })),

    setGameOver: (isOver) => set((state) => ({
        gameState: { ...state.gameState, isGameOver: isOver }
    })),

    setVictory: (isVictory) => set((state) => ({
        gameState: { ...state.gameState, isVictory: isVictory }
    })),

    setPrompt: (text: string | null) => set((state) => ({
        gameState: { ...state.gameState, activePrompt: text }
    })),

    spawnWave: (count: number, type: NPCType = NPCType.TOURIST) => set((state) => {
        const newNpcs: NPCData[] = Array.from({ length: count }, (_, i) => ({
            id: state.npcs.length + i + 5000,
            type: type,
            position: [
                (Math.random() - 0.5) * 40,
                0.5,
                (Math.random() - 0.5) * 40
            ] as [number, number, number],
            velocity: [0, 0, 0],
            rotation: 0,
            state: NPCState.IDLE,
            faction: Faction.CIVILIAN,
            emotions: { current: EmotionalState.NEUTRAL, stress: 0, aggression: 0, fear: 0 },
            lodLevel: 2,
            hairColor: '#000000',
            outfitId: 'generic'
        }));
        return { npcs: [...state.npcs, ...newNpcs] };
    }),

    addNPC: (npc) => set((state) => {
        if (state.npcs.some(n => n.id === npc.id)) {
            return {};
        }
        const fullNpc: NPCData = {
            velocity: [0, 0, 0],
            rotation: 0,
            state: NPCState.IDLE,
            faction: Faction.CIVILIAN,
            emotions: { current: EmotionalState.NEUTRAL, stress: 0, aggression: 0, fear: 0 },
            lodLevel: 0,
            hairColor: '#442211',
            outfitId: 'default',
            ...npc
        };
        return {
            npcs: [...state.npcs, fullNpc]
        };
    }),

    markNpc: (id: number) => set((state) => ({
        markedNpcIds: [...state.markedNpcIds, id]
    })),

    updateNpc: (id: number, data: Partial<NPCData>) => set((state) => ({
        npcs: state.npcs.map(npc => npc.id === id ? { ...npc, ...data } : npc)
    })),

    addProjectile: (position, velocity, type = 'STONE') => set((state) => ({
        projectiles: [
            ...state.projectiles,
            { id: Date.now() + Math.random(), position, velocity, type }
        ]
    })),

    removeProjectile: (id) => set((state) => ({
        projectiles: state.projectiles.filter(p => p.id !== id)
    })),

    spawnItem: (itemId, position) => set((state) => ({
        worldItems: [
            ...state.worldItems,
            { id: Math.random().toString(36).substr(2, 9), itemId, position }
        ]
    })),

    removeWorldItem: (id) => set((state) => ({
        worldItems: state.worldItems.filter(item => item.id !== id)
    })),

    saveGame: () => {
        const state = get();
        const dataToSave = {
            gameState: state.gameState,
            missions: state.missions,
            npcs: state.npcs,
            player: state.player,
            worldItems: state.worldItems
        };
        localStorage.setItem('corona_control_save_v7', JSON.stringify(dataToSave));
        console.log("Game Saved (V7)!");
    },

    loadGame: () => {
        const saved = localStorage.getItem('corona_control_save_v7');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                set((state) => ({
                    ...state,
                    gameState: data.gameState,
                    missions: data.missions,
                    npcs: data.npcs || [],
                    player: { ...state.player, ...data.player },
                    worldItems: data.worldItems || []
                }));
                return true;
            } catch (_) {
                return false;
            }
        }
        return false;
    },

    setPlayerPosition: (pos) => set((state) => ({
        player: { ...state.player, position: pos }
    })),

    setPlayerHealth: (hp) => set((state) => ({
        player: { ...state.player, health: hp }
    })),

    setTension: (tension) => set({ tensionLevel: tension }),

    toggleBinoculars: () => {
        console.log("Toggle Fernglas");
    },

    arrestNpc: (npcId) => {
        set((state) => ({
            npcs: state.npcs.map(npc =>
                npc.id === npcId ? { ...npc, state: NPCState.ARRESTED } : npc
            )
        }));
        get().adjustKarma(10); // Verhaftung gibt positives Karma
    },

    adjustKarma: (amount) => {
        set((state) => ({
            player: {
                ...state.player,
                karma: Math.max(-100, Math.min(100, state.player.karma + amount))
            }
        }));
    }
});
