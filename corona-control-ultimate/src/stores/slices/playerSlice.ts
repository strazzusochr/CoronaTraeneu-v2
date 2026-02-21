import type { StateCreator } from 'zustand';
import type { GameStore } from '../types';
import { GAME_BALANCE } from '@/constants/GameBalance';

export const createPlayerSlice: StateCreator<GameStore, [], [], Pick<GameStore, 'player' | 'setPlayerPosition' | 'setPlayerHealth' | 'tensionLevel' | 'toggleBinoculars'>> = (set) => ({
  player: {
    health: GAME_BALANCE.player.maxHealth,
    maxHealth: GAME_BALANCE.player.maxHealth,
    stamina: GAME_BALANCE.player.maxStamina,
    maxStamina: GAME_BALANCE.player.maxStamina,
    armor: GAME_BALANCE.player.baseArmor,
    maxArmor: GAME_BALANCE.player.baseArmor,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    isGrounded: true,
    isSprinting: false,
    isJumping: false,
    isDead: false,
    currentEquipmentSlot: 1,
    inventory: [],
    isUsingBinoculars: false,
  },
  
  tensionLevel: 0,

  setPlayerPosition: (pos) =>
    set((state) => ({ player: { ...state.player, position: pos } })),
    
  setPlayerHealth: (hp) =>
    set((state) => ({ player: { ...state.player, health: hp } })),
    

  
  toggleBinoculars: () => set((state) => ({
      player: { ...state.player, isUsingBinoculars: !state.player.isUsingBinoculars }
  })),
});
