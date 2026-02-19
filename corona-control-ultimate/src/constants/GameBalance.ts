import type { PlayerAnimationId, PlayerAnimationCategory, SfxId, MusicTrackId, VoiceLineId, UiAssetId, AchievementId, CutsceneId, AudioBus } from '@/types/enums';
import type { ObjectiveType } from '@/types/QuestData';
import type { MissionType } from '@/stores/types';

export const GAME_BALANCE = {
  player: {
    maxHealth: 100,
    maxStamina: 100,
    baseArmor: 100,
  },
  world: {
    initialDayTimeMinutes: 360,
  },
  crowd: {
    initialTension: 0,
    initialMoral: 50,
    initialEscalation: 0,
  },
  thresholds: {
    tension: { warning: 40, critical: 70 },
    moral: { low: 30, high: 70 },
    escalation: { medium: 50, high: 80 },
  },
  weapons: {
    waterCannon: {
      force: 20,
      gravity: 4.905,
      hitRadius: 1.5,
      verticalTolerance: 2,
      stressIncrease: 0.1,
      aggressionReduction: 0.2,
    },
    deescalation: {
      activeIntensity: 10,
      passiveRelationRecoveryRate: 2.0,
      passiveAggressionCoolRate: 0.05,
    },
  },
  npc: {
    police: {
      baseRelation: 60,
      baseAggression: 0.2,
      walkSpeed: 3.5,
    },
    rioter: {
      baseAggression: 0.6,
      walkSpeed: 4.0,
    },
    civilian: {
      baseRelation: 0,
      baseAggression: 0.1,
      walkSpeed: 2.0,
    },
  },
} as const;

export const PLAYER_ANIMATIONS: Record<PlayerAnimationCategory, PlayerAnimationId[]> = {
  MOVEMENT: [
    'ANIM_001','ANIM_002','ANIM_003','ANIM_004','ANIM_005',
    'ANIM_006','ANIM_007','ANIM_008','ANIM_009','ANIM_010',
    'ANIM_011','ANIM_012','ANIM_013','ANIM_014','ANIM_015',
    'ANIM_016','ANIM_017','ANIM_018','ANIM_019','ANIM_020',
    'ANIM_021','ANIM_022'
  ],
  COMBAT: [
    'ANIM_023','ANIM_024','ANIM_025','ANIM_026','ANIM_027',
    'ANIM_028','ANIM_029','ANIM_030','ANIM_031','ANIM_032',
    'ANIM_033','ANIM_034','ANIM_035','ANIM_036','ANIM_037',
    'ANIM_038','ANIM_039','ANIM_040'
  ],
  INTERACTION: [
    'ANIM_041','ANIM_042','ANIM_043','ANIM_044','ANIM_045',
    'ANIM_046','ANIM_047','ANIM_048','ANIM_049','ANIM_050',
    'ANIM_051','ANIM_052','ANIM_053','ANIM_054','ANIM_055'
  ],
  VEHICLE: [
    'ANIM_056','ANIM_057','ANIM_058','ANIM_059',
    'ANIM_060','ANIM_061','ANIM_062','ANIM_063'
  ],
  REACTION: [
    'ANIM_064','ANIM_065','ANIM_066','ANIM_067','ANIM_068',
    'ANIM_069','ANIM_070','ANIM_071','ANIM_072','ANIM_073',
    'ANIM_074','ANIM_075'
  ],
  EMOTION: [
    'ANIM_076','ANIM_077','ANIM_078','ANIM_079','ANIM_080',
    'ANIM_081','ANIM_082','ANIM_083','ANIM_084','ANIM_085'
  ]
} as const;

export const ACHIEVEMENTS: {
  tutorial: AchievementId[];
  combat: AchievementId[];
  crowd: AchievementId[];
  exploration: AchievementId[];
  progress: AchievementId[];
} = {
  tutorial: [
    'ACH_001','ACH_002','ACH_003','ACH_004','ACH_005',
    'ACH_006','ACH_007','ACH_008','ACH_009','ACH_010'
  ],
  combat: [
    'ACH_011','ACH_012','ACH_013','ACH_014','ACH_015',
    'ACH_016','ACH_017','ACH_018','ACH_019','ACH_020',
    'ACH_021','ACH_022','ACH_023','ACH_024','ACH_025'
  ],
  crowd: [
    'ACH_026','ACH_027','ACH_028','ACH_029','ACH_030',
    'ACH_031','ACH_032','ACH_033','ACH_034','ACH_035'
  ],
  exploration: [
    'ACH_036','ACH_037','ACH_038','ACH_039','ACH_040',
    'ACH_041','ACH_042','ACH_043','ACH_044','ACH_045'
  ],
  progress: [
    'ACH_046','ACH_047','ACH_048','ACH_049','ACH_050',
    'ACH_051','ACH_052','ACH_053','ACH_054','ACH_055'
  ]
} as const;
export const SFX_CATEGORIES: Record<
  'WEAPONS' | 'NPC' | 'CROWD' | 'ENVIRONMENT' | 'UI' | 'OBJECTIVE',
  SfxId[]
> = {
  WEAPONS: [
    'SFX_WEAPON_SHOT_01',
    'SFX_WEAPON_SHOT_02',
    'SFX_WEAPON_RELOAD',
    'SFX_WEAPON_IMPACT'
  ],
  NPC: [
    'SFX_NPC_PAIN_LIGHT',
    'SFX_NPC_PAIN_HEAVY',
    'SFX_NPC_DEATH'
  ],
  CROWD: [
    'SFX_CROWD_CHEER',
    'SFX_CROWD_CHANT',
    'SFX_CROWD_PANIC'
  ],
  ENVIRONMENT: [
    'SFX_ENV_SIREN_POLICE',
    'SFX_ENV_SIREN_AMBULANCE',
    'SFX_ENV_CAR_PASSBY',
    'SFX_ENV_GLASS_BREAK',
    'SFX_ENV_FIRE_LOOP'
  ],
  UI: [
    'SFX_UI_SELECT',
    'SFX_UI_BACK',
    'SFX_UI_NOTIFICATION'
  ],
  OBJECTIVE: [
    'SFX_OBJECTIVE_COMPLETE',
    'SFX_OBJECTIVE_FAIL'
  ]
} as const;

export const CUTSCENES: {
  intro: CutsceneId[];
  outros: Record<'S' | 'A' | 'B' | 'C' | 'D' | 'F', CutsceneId>;
  briefings: CutsceneId[];
} = {
  intro: ['CS_INTRO_MAIN'],
  outros: {
    S: 'CS_OUTRO_S',
    A: 'CS_OUTRO_A',
    B: 'CS_OUTRO_B',
    C: 'CS_OUTRO_C',
    D: 'CS_OUTRO_D',
    F: 'CS_OUTRO_F'
  },
  briefings: ['CS_STAATSFEIND_01_BRIEFING']
} as const;

export const OBJECTIVE_TEMPLATES: Record<ObjectiveType, string> = {
  KILL: 'Neutralisiere {count} Ziele',
  COLLECT: 'Sammle {count}× {item}',
  TALK: 'Sprich mit {npc}',
  GOTO: 'Gehe zu {location}',
  PROTECT: 'Beschütze {target} für {time}s',
  WAIT: 'Warte {time}s'
} as const;

export const AUDIO_LAYERS: {
  defaults: Record<'AMBIENT' | 'ENVIRONMENTAL' | 'CROWD' | 'EVENT' | 'MUSIC', number>;
  caps: Record<'AMBIENT' | 'ENVIRONMENTAL' | 'CROWD' | 'EVENT' | 'MUSIC', number>;
} = {
  defaults: {
    AMBIENT: 0.1,
    ENVIRONMENTAL: 0.3,
    CROWD: 0.5,
    EVENT: 0.8,
    MUSIC: 0.4
  },
  caps: {
    AMBIENT: 0.3,
    ENVIRONMENTAL: 0.6,
    CROWD: 0.8,
    EVENT: 1.0,
    MUSIC: 0.7
  }
} as const;

export const AUDIO_LAYER_TO_BUS: Record<'AMBIENT' | 'ENVIRONMENTAL' | 'CROWD' | 'EVENT' | 'MUSIC', AudioBus> = {
  AMBIENT: 'AMBIENT',
  ENVIRONMENTAL: 'SFX',
  CROWD: 'SFX',
  EVENT: 'VOICE',
  MUSIC: 'MUSIC'
} as const;
export const MISSION_TEMPLATES: Record<MissionType, {
  description: string;
  defaultTarget?: number;
  progressUnit: 'COUNT' | 'SECONDS';
}> = {
  REACH_TARGET: {
    description: 'Erreiche den Zielbereich',
    defaultTarget: 1,
    progressUnit: 'COUNT'
  },
  DISPERSE_RIOTERS: {
    description: 'Zerstreue {count} Randalierer',
    defaultTarget: 5,
    progressUnit: 'COUNT'
  },
  SURVIVE: {
    description: 'Überlebe {time}s',
    defaultTarget: 60,
    progressUnit: 'SECONDS'
  }
} as const;

export const VOICE_SUBTITLES: Record<VoiceLineId, { text: string; speaker?: string; durationMs: number }> = {
  VOX_POLICE_WARN_01: { text: 'Achtung! Abstand halten!', speaker: 'POLIZEI', durationMs: 2500 },
  VOX_POLICE_WARN_02: { text: 'Dies ist eine offizielle Warnung!', speaker: 'POLIZEI', durationMs: 2500 },
  VOX_POLICE_ARREST_01: { text: 'Sie sind festgenommen. Hände sichtbar!', speaker: 'POLIZEI', durationMs: 3000 },
  VOX_POLICE_DEESCALATE_01: { text: 'Bitte beruhigen Sie sich und gehen Sie weiter.', speaker: 'POLIZEI', durationMs: 3000 },
  VOX_RIOTER_CHANT_01: { text: 'Keine Pflicht! Freiheit für alle!', speaker: 'MENGE', durationMs: 2500 },
  VOX_RIOTER_CHANT_02: { text: 'Wir sind das Volk!', speaker: 'MENGE', durationMs: 2500 },
  VOX_RIOTER_TAUNT_01: { text: 'Traust du dich, Polizist?', speaker: 'RANDALIERER', durationMs: 2500 },
  VOX_CIVILIAN_PANIC_01: { text: 'Hilfe! Ich brauche Hilfe!', speaker: 'ZIVIL', durationMs: 2500 },
  VOX_CIVILIAN_THANKS_01: { text: 'Danke für die Unterstützung.', speaker: 'ZIVIL', durationMs: 2000 },
  VOX_CIVILIAN_INJURED_01: { text: 'Ich bin verletzt…', speaker: 'ZIVIL', durationMs: 2500 },
  VOX_KRAUSE_SPEECH_01: { text: 'Meine Damen und Herren, heute setzen wir ein Zeichen.', speaker: 'KRAUSE', durationMs: 4000 },
  VOX_JOURNALIST_LIVE_01: { text: 'Live vor Ort: Die Lage spitzt sich zu.', speaker: 'JOURNALIST', durationMs: 3000 },
  VOX_COMMAND_CENTER_UPDATE_01: { text: 'Leitstelle: Lagebericht aktualisiert.', speaker: 'LEITSTELLE', durationMs: 3000 },
  VOX_TUTORIAL_HINT_01: { text: 'Tipp: Nutze WASD zum Bewegen.', speaker: 'SYSTEM', durationMs: 2500 },
  VOX_TUTORIAL_HINT_02: { text: 'Tipp: Linksklick wirft einen Molotow.', speaker: 'SYSTEM', durationMs: 2500 }
} as const;

export const DIALOGS: string[] = [
  'krause_confrontation'
] as const;

export type DynamicEventId =
  | 'EVT_DAWN'
  | 'EVT_DEMO_START'
  | 'EVT_ESCALATION'
  | 'EVT_RIOT'
  | 'EVT_KRAUSE_ARRIVAL'
  | 'EVT_SPEECH_START'
  | 'EVT_TRIED_PEACEFUL'
  | 'EVT_CROWD_EVACUATED'
  | 'EVT_KRAUSE_ARRESTED'
  | 'EVT_RIOT_STARTED';

export const DYNAMIC_EVENTS: Record<DynamicEventId, { description: string; source: 'TIMELINE' | 'EVENT_MANAGER' }> = {
  EVT_DAWN: { description: 'Morgendämmerung – Stadt erwacht', source: 'TIMELINE' },
  EVT_DEMO_START: { description: 'Demo beginnt am Stephansplatz', source: 'TIMELINE' },
  EVT_ESCALATION: { description: 'Eskalation am Abend', source: 'TIMELINE' },
  EVT_RIOT: { description: 'Straßenschlacht in vollem Gange', source: 'TIMELINE' },
  EVT_KRAUSE_ARRIVAL: { description: 'Krause trifft am Platz ein', source: 'EVENT_MANAGER' },
  EVT_SPEECH_START: { description: 'Krause beginnt seine Rede', source: 'EVENT_MANAGER' },
  EVT_TRIED_PEACEFUL: { description: 'Spieler hat friedlichen Ansatz versucht', source: 'EVENT_MANAGER' },
  EVT_CROWD_EVACUATED: { description: 'Menge wird evakuiert', source: 'EVENT_MANAGER' },
  EVT_KRAUSE_ARRESTED: { description: 'Krause wurde verhaftet', source: 'EVENT_MANAGER' },
  EVT_RIOT_STARTED: { description: 'Riot hat offiziell begonnen', source: 'EVENT_MANAGER' }
} as const;
export const MUSIC_TRACKS: {
  tensionMap: Record<'AMBIENT' | 'TENSION' | 'COMBAT', MusicTrackId>;
  menu: {
    main: MusicTrackId;
    settings: MusicTrackId;
  };
  endings: Record<'S' | 'A' | 'B' | 'C' | 'D' | 'F', MusicTrackId>;
  cutscenes: {
    intro: MusicTrackId;
    outro: MusicTrackId;
    krause: MusicTrackId;
  };
  variants: {
    ambientNight: MusicTrackId;
    tensionLow: MusicTrackId;
  };
} = {
  tensionMap: {
    AMBIENT: 'MUS_LEVEL_AMBIENT_DAY',
    TENSION: 'MUS_LEVEL_TENSION_HIGH',
    COMBAT: 'MUS_LEVEL_COMBAT'
  },
  menu: {
    main: 'MUS_MENU_MAIN',
    settings: 'MUS_MENU_SETTINGS'
  },
  endings: {
    S: 'MUS_ENDING_S',
    A: 'MUS_ENDING_A',
    B: 'MUS_ENDING_B',
    C: 'MUS_ENDING_C',
    D: 'MUS_ENDING_D',
    F: 'MUS_ENDING_F'
  },
  cutscenes: {
    intro: 'MUS_CUTSCENE_INTRO',
    outro: 'MUS_CUTSCENE_OUTRO',
    krause: 'MUS_CUTSCENE_KRAUSE'
  },
  variants: {
    ambientNight: 'MUS_LEVEL_AMBIENT_NIGHT',
    tensionLow: 'MUS_LEVEL_TENSION_LOW'
  }
};

export const VOICE_LINES: {
  police: VoiceLineId[];
  rioters: VoiceLineId[];
  civilians: VoiceLineId[];
  system: VoiceLineId[];
} = {
  police: [
    'VOX_POLICE_WARN_01',
    'VOX_POLICE_WARN_02',
    'VOX_POLICE_ARREST_01',
    'VOX_POLICE_DEESCALATE_01'
  ],
  rioters: [
    'VOX_RIOTER_CHANT_01',
    'VOX_RIOTER_CHANT_02',
    'VOX_RIOTER_TAUNT_01'
  ],
  civilians: [
    'VOX_CIVILIAN_PANIC_01',
    'VOX_CIVILIAN_THANKS_01',
    'VOX_CIVILIAN_INJURED_01'
  ],
  system: [
    'VOX_KRAUSE_SPEECH_01',
    'VOX_JOURNALIST_LIVE_01',
    'VOX_COMMAND_CENTER_UPDATE_01',
    'VOX_TUTORIAL_HINT_01',
    'VOX_TUTORIAL_HINT_02'
  ]
} as const;

export const UI_ASSETS: {
  badges: UiAssetId[];
  iconsHUD: UiAssetId[];
  iconsMenu: UiAssetId[];
  frames: UiAssetId[];
} = {
  badges: [
    'UIAS_BADGE_PHASE',
    'UIAS_BADGE_OBJECTIVE',
    'UIAS_BADGE_WARNING'
  ],
  iconsHUD: [
    'UIAS_ICON_HEALTH',
    'UIAS_ICON_ARMOR',
    'UIAS_ICON_STAMINA',
    'UIAS_ICON_KARMA',
    'UIAS_ICON_TENSION',
    'UIAS_ICON_MORAL',
    'UIAS_ICON_ESCALATION'
  ],
  iconsMenu: [
    'UIAS_ICON_SETTINGS',
    'UIAS_ICON_ARCHIVE',
    'UIAS_ICON_EXIT',
    'UIAS_ICON_TUTORIAL',
    'UIAS_ICON_PERFORMANCE'
  ],
  frames: [
    'UIAS_FRAME_STARTSCREEN',
    'UIAS_FRAME_MENU',
    'UIAS_FRAME_HUD',
    'UIAS_FRAME_PROMPT'
  ]
} as const;
