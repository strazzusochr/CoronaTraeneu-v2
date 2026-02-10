import {
  NPCData,
  PlayerState,
  Quest,
  AudioSettings,
  WorldObject
} from '@/types/interfaces';
import {
  GamePhase,
  NPCState,
  NPCType,
  QuestStatus,
  RenderTier,
  AudioBus
} from '@/types/enums';

export type MissionType = 'SURVIVE' | 'DISPERSE_RIOTERS' | 'REACH_TARGET';

export interface Mission {
  id: number;
  type: MissionType;
  description: string;
  targetAmount?: number;
  currentAmount: number;
  timeLimit?: number; // Sekunden
}

export interface GameState {
  points: number;
  health: number;
  isGameOver: boolean;
  isVictory: boolean;
  currentMissionIndex: number;
  menuState: 'MAIN' | 'PLAYING' | 'PAUSED' | 'SETTINGS';
  previousMenuState?: 'MAIN' | 'PLAYING' | 'PAUSED';
  isPlaying: boolean;
  activeCutscene: string | null;
  activePrompt: string | null;
  cutsceneTime: number;
}

export interface GameStore {
  gameState: GameState;
  missions: Mission[];
  npcs: NPCData[];
  markedNpcIds: number[];
  player: PlayerState;
  tensionLevel: number;

  // Actions
  startGame: () => void;
  resetGame: () => void;
  setPoints: (points: number) => void;
  addPoints: (amount: number) => void;
  takeDamage: (amount: number) => void;

  // Player & Tension
  setPlayerPosition: (pos: [number, number, number]) => void;
  setPlayerHealth: (hp: number) => void;
  setTension: (tension: number) => void;
  toggleBinoculars: () => void;

  // Mission Actions
  updateMissionProgress: (amount: number) => void;
  nextMission: () => void;
  setGameOver: (isOver: boolean) => void;
  setVictory: (isVictory: boolean) => void;

  // Projectiles
  projectiles: Array<{
    id: number;
    type: 'STONE' | 'MOLOTOV';
    position: [number, number, number];
    velocity: [number, number, number];
  }>;
  addProjectile: (position: [number, number, number], velocity: [number, number, number], type?: 'STONE' | 'MOLOTOV') => void;
  removeProjectile: (id: number) => void;

  // World Items
  worldItems: Array<{
    id: string;
    itemId: string;
    position: [number, number, number];
  }>;
  spawnItem: (itemId: string, position: [number, number, number]) => void;
  removeWorldItem: (id: string) => void;

  // Settings (V7.0 aligned)
  settings: AudioSettings & {
    graphicsQuality: RenderTier;
    colorblindMode: 'NONE' | 'DEUTERANOPIA' | 'PROTANOPIA' | 'TRITANOPIA';
    ttsEnabled: boolean;
    largeTextEnabled: boolean;
  };
  setVolume: (bus: AudioBus, value: number) => void;
  setGraphicsQuality: (quality: RenderTier) => void;

  // UI & Prompts
  setPrompt: (text: string | null) => void;

  // NPC Management
  addNPC: (npc: Partial<NPCData> & { id: number, type: NPCType, position: [number, number, number] }) => void;
  spawnWave: (count: number, type?: NPCType) => void;
  updateNpc: (id: number, data: Partial<NPCData>) => void;
  markNpc: (id: number) => void;

  // Settings Visibility
  openSettings: () => void;
  closeSettings: () => void;

  // Survival / Save (V7.0)
  saveGame: () => void;
  loadGame: () => boolean;

  // Gameplay Actions (Phase 09)
  arrestNpc: (npcId: number) => void;
  adjustKarma: (amount: number) => void;
}
