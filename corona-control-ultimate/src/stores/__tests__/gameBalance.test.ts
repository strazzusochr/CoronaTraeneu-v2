import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useGameStore } from '@/stores/gameStore';
import { GAME_BALANCE } from '@/constants/GameBalance';

describe('Game Balance Constants Integration', () => {
    beforeEach(async () => {
        // Reset to initial state
        useGameStore.setState({
            gameState: {
                ...useGameStore.getState().gameState,
                health: GAME_BALANCE.player.maxHealth,
                dayTime: GAME_BALANCE.world.initialDayTimeMinutes
            },
            player: {
                ...useGameStore.getState().player,
                health: GAME_BALANCE.player.maxHealth,
                stamina: GAME_BALANCE.player.maxStamina,
                armor: GAME_BALANCE.player.baseArmor,
            },
            tensionLevel: GAME_BALANCE.crowd.initialTension,
            moralLevel: GAME_BALANCE.crowd.initialMoral,
            escalationLevel: GAME_BALANCE.crowd.initialEscalation
        });
        vi.useFakeTimers();
        await import('@/managers/AntiCheatManager'); // initialize manager under fake timers
    });

    it('initial state aligns with GAME_BALANCE constants', () => {
        const state = useGameStore.getState();
        expect(state.gameState.health).toBe(GAME_BALANCE.player.maxHealth);
        expect(state.gameState.dayTime).toBe(GAME_BALANCE.world.initialDayTimeMinutes);
        expect(state.player.health).toBe(GAME_BALANCE.player.maxHealth);
        expect(state.player.stamina).toBe(GAME_BALANCE.player.maxStamina);
        expect(state.player.armor).toBe(GAME_BALANCE.player.baseArmor);
        expect(state.tensionLevel).toBe(GAME_BALANCE.crowd.initialTension);
        expect(state.moralLevel).toBe(GAME_BALANCE.crowd.initialMoral);
        expect(state.escalationLevel).toBe(GAME_BALANCE.crowd.initialEscalation);
    });

    it('anti-cheat clamps health above max', async () => {
        const { antiCheatManager } = await import('@/managers/AntiCheatManager');
        useGameStore.getState().setPlayerHealth(GAME_BALANCE.player.maxHealth + 50);
        antiCheatManager.runIntegrityChecksForTests();
        expect(useGameStore.getState().player.health).toBe(GAME_BALANCE.player.maxHealth);
    });
});
