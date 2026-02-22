import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '@/stores/gameStore';
import { GamePhase } from '@/types/enums';

describe('GameStore State Management', () => {
    // Reset store before each test
    beforeEach(() => {
        useGameStore.setState(useGameStore.getInitialState());
    });

    it('initializes with correct default values', () => {
        const state = useGameStore.getState();
        expect(state.gameState.menuState).toBe('MAIN');
        expect(state.gameState.isPlaying).toBe(false);
        expect(state.player.health).toBe(100);
    });

    it('toggles inventory correctly', () => {
        const { toggleInventory } = useGameStore.getState();
        
        expect(useGameStore.getState().isInventoryOpen).toBe(false);
        toggleInventory();
        expect(useGameStore.getState().isInventoryOpen).toBe(true);
        toggleInventory();
        expect(useGameStore.getState().isInventoryOpen).toBe(false);
    });

    it('adds item to inventory and increases quantity', () => {
        const { addItem } = useGameStore.getState();
        
        // Add single item
        const result1 = addItem({ id: 'ITEM_TEST', type: 'MEDICAL', name: 'Test Item', quantity: 1, maxStack: 10 });
        expect(result1).toBe(true);
        
        const state1 = useGameStore.getState();
        const slot1 = state1.inventory.find(s => s.item?.id === 'ITEM_TEST');
        expect(slot1).toBeDefined();
        expect(slot1?.item?.quantity).toBe(1);

        // Add second item, should stack
        const result2 = addItem({ id: 'ITEM_TEST', type: 'MEDICAL', name: 'Test Item', quantity: 1, maxStack: 10 });
        expect(result2).toBe(true);
        
        const state2 = useGameStore.getState();
        const slot2 = state2.inventory.find(s => s.item?.id === 'ITEM_TEST');
        expect(slot2?.item?.quantity).toBe(2);
    });
});
