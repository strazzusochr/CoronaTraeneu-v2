/**
 * V7.0 HYPER AAA ENUMS
 */

export enum GamePhase {
    MORNING = 'MORNING',
    MIDDAY = 'MIDDAY',
    EVENING = 'EVENING',
    NIGHT = 'NIGHT'
}

export enum NPCState {
    IDLE = 'IDLE',
    WALK = 'WALK',
    RUN = 'RUN',
    PANIC = 'PANIC',
    ATTACK = 'ATTACK',
    DEFEND = 'DEFEND',
    RIOT = 'RIOT',
    ARRESTED = 'ARRESTED',
    FLEE = 'FLEE',
    SITTING = 'SITTING',
    WORKING = 'WORKING',
    DEESCALATING = 'DEESCALATING',
    INJURED = 'INJURED',
    DEAD = 'DEAD'
}

export enum NPCType {
    CIVILIAN = 'CIVILIAN',
    RIOTER = 'RIOTER',
    POLICE = 'POLICE',
    TOURIST = 'TOURIST',
    DEMONSTRATOR = 'DEMONSTRATOR',
    KRAUSE = 'KRAUSE',
    JOURNALIST = 'JOURNALIST',
    WEGA = 'WEGA',
    STEFAN = 'STEFAN',
    MARIA = 'MARIA',
    HEINRICH = 'HEINRICH',
    PLAYER = 'PLAYER'
}

export enum Faction {
    CIVILIAN = 'CIVILIAN',
    POLICE = 'POLICE',
    RIOTER = 'RIOTER',
    JOURNALIST = 'JOURNALIST',
    KRAUSE_FOLLOWERS = 'KRAUSE_FOLLOWERS'
}

export enum EmotionalState {
    NEUTRAL = 'NEUTRAL',
    CALM = 'CALM',
    STRESSED = 'STRESSED',
    ANGRY = 'ANGRY',
    TERRIFIED = 'TERRIFIED',
    AGGRESSIVE = 'AGGRESSIVE',
    COOPERATIVE = 'COOPERATIVE'
}

export enum RenderTier {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    ULTRA = 'ULTRA'
}

export enum AIPriority {
    SURVIVAL = 0,
    MISSION = 1,
    SOCIAL = 2,
    IDLE = 3
}

export enum AudioBus {
    MASTER = 'MASTER',
    MUSIC = 'MUSIC',
    SFX = 'SFX',
    VOICE = 'VOICE',
    AMBIENT = 'AMBIENT'
}

export enum QuestStatus {
    NOT_STARTED = 'NOT_STARTED',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

export type AchievementId =
    | 'ACH_001'
    | 'ACH_002'
    | 'ACH_003'
    | 'ACH_004'
    | 'ACH_005'
    | 'ACH_006'
    | 'ACH_007'
    | 'ACH_008'
    | 'ACH_009'
    | 'ACH_010'
    | 'ACH_011'
    | 'ACH_012'
    | 'ACH_013'
    | 'ACH_014'
    | 'ACH_015'
    | 'ACH_016'
    | 'ACH_017'
    | 'ACH_018'
    | 'ACH_019'
    | 'ACH_020'
    | 'ACH_021'
    | 'ACH_022'
    | 'ACH_023'
    | 'ACH_024'
    | 'ACH_025'
    | 'ACH_026'
    | 'ACH_027'
    | 'ACH_028'
    | 'ACH_029'
    | 'ACH_030'
    | 'ACH_031'
    | 'ACH_032'
    | 'ACH_033'
    | 'ACH_034'
    | 'ACH_035'
    | 'ACH_036'
    | 'ACH_037'
    | 'ACH_038'
    | 'ACH_039'
    | 'ACH_040'
    | 'ACH_041'
    | 'ACH_042'
    | 'ACH_043'
    | 'ACH_044'
    | 'ACH_045'
    | 'ACH_046'
    | 'ACH_047'
    | 'ACH_048'
    | 'ACH_049'
    | 'ACH_050'
    | 'ACH_051'
    | 'ACH_052'
    | 'ACH_053'
    | 'ACH_054'
    | 'ACH_055';

export type SfxId =
    | 'SFX_WEAPON_SHOT_01'
    | 'SFX_WEAPON_SHOT_02'
    | 'SFX_WEAPON_RELOAD'
    | 'SFX_WEAPON_IMPACT'
    | 'SFX_NPC_PAIN_LIGHT'
    | 'SFX_NPC_PAIN_HEAVY'
    | 'SFX_NPC_DEATH'
    | 'SFX_CROWD_CHEER'
    | 'SFX_CROWD_CHANT'
    | 'SFX_CROWD_PANIC'
    | 'SFX_ENV_SIREN_POLICE'
    | 'SFX_ENV_SIREN_AMBULANCE'
    | 'SFX_ENV_CAR_PASSBY'
    | 'SFX_ENV_GLASS_BREAK'
    | 'SFX_ENV_FIRE_LOOP'
    | 'SFX_UI_SELECT'
    | 'SFX_UI_BACK'
    | 'SFX_UI_NOTIFICATION'
    | 'SFX_OBJECTIVE_COMPLETE'
    | 'SFX_OBJECTIVE_FAIL';

export type PlayerAnimationId =
    | 'ANIM_001' | 'ANIM_002' | 'ANIM_003' | 'ANIM_004' | 'ANIM_005'
    | 'ANIM_006' | 'ANIM_007' | 'ANIM_008' | 'ANIM_009' | 'ANIM_010'
    | 'ANIM_011' | 'ANIM_012' | 'ANIM_013' | 'ANIM_014' | 'ANIM_015'
    | 'ANIM_016' | 'ANIM_017' | 'ANIM_018' | 'ANIM_019' | 'ANIM_020'
    | 'ANIM_021' | 'ANIM_022' | 'ANIM_023' | 'ANIM_024' | 'ANIM_025'
    | 'ANIM_026' | 'ANIM_027' | 'ANIM_028' | 'ANIM_029' | 'ANIM_030'
    | 'ANIM_031' | 'ANIM_032' | 'ANIM_033' | 'ANIM_034' | 'ANIM_035'
    | 'ANIM_036' | 'ANIM_037' | 'ANIM_038' | 'ANIM_039' | 'ANIM_040'
    | 'ANIM_041' | 'ANIM_042' | 'ANIM_043' | 'ANIM_044' | 'ANIM_045'
    | 'ANIM_046' | 'ANIM_047' | 'ANIM_048' | 'ANIM_049' | 'ANIM_050'
    | 'ANIM_051' | 'ANIM_052' | 'ANIM_053' | 'ANIM_054' | 'ANIM_055'
    | 'ANIM_056' | 'ANIM_057' | 'ANIM_058' | 'ANIM_059' | 'ANIM_060'
    | 'ANIM_061' | 'ANIM_062' | 'ANIM_063' | 'ANIM_064' | 'ANIM_065'
    | 'ANIM_066' | 'ANIM_067' | 'ANIM_068' | 'ANIM_069' | 'ANIM_070'
    | 'ANIM_071' | 'ANIM_072' | 'ANIM_073' | 'ANIM_074' | 'ANIM_075'
    | 'ANIM_076' | 'ANIM_077' | 'ANIM_078' | 'ANIM_079' | 'ANIM_080'
    | 'ANIM_081' | 'ANIM_082' | 'ANIM_083' | 'ANIM_084' | 'ANIM_085';

export type PlayerAnimationCategory =
    | 'MOVEMENT'
    | 'COMBAT'
    | 'INTERACTION'
    | 'VEHICLE'
    | 'REACTION'
    | 'EMOTION';

export type MusicTrackId =
    | 'MUS_MENU_MAIN'
    | 'MUS_MENU_SETTINGS'
    | 'MUS_LEVEL_AMBIENT_DAY'
    | 'MUS_LEVEL_AMBIENT_NIGHT'
    | 'MUS_LEVEL_TENSION_LOW'
    | 'MUS_LEVEL_TENSION_HIGH'
    | 'MUS_LEVEL_COMBAT'
    | 'MUS_ENDING_S'
    | 'MUS_ENDING_A'
    | 'MUS_ENDING_B'
    | 'MUS_ENDING_C'
    | 'MUS_ENDING_D'
    | 'MUS_ENDING_F'
    | 'MUS_CUTSCENE_INTRO'
    | 'MUS_CUTSCENE_OUTRO'
    | 'MUS_CUTSCENE_KRAUSE';

export type VoiceLineId =
    | 'VOX_POLICE_WARN_01'
    | 'VOX_POLICE_WARN_02'
    | 'VOX_POLICE_ARREST_01'
    | 'VOX_POLICE_DEESCALATE_01'
    | 'VOX_RIOTER_CHANT_01'
    | 'VOX_RIOTER_CHANT_02'
    | 'VOX_RIOTER_TAUNT_01'
    | 'VOX_CIVILIAN_PANIC_01'
    | 'VOX_CIVILIAN_THANKS_01'
    | 'VOX_CIVILIAN_INJURED_01'
    | 'VOX_KRAUSE_SPEECH_01'
    | 'VOX_JOURNALIST_LIVE_01'
    | 'VOX_COMMAND_CENTER_UPDATE_01'
    | 'VOX_TUTORIAL_HINT_01'
    | 'VOX_TUTORIAL_HINT_02';

export type UiAssetId =
    | 'UIAS_BADGE_PHASE'
    | 'UIAS_BADGE_OBJECTIVE'
    | 'UIAS_BADGE_WARNING'
    | 'UIAS_ICON_HEALTH'
    | 'UIAS_ICON_ARMOR'
    | 'UIAS_ICON_STAMINA'
    | 'UIAS_ICON_KARMA'
    | 'UIAS_ICON_TENSION'
    | 'UIAS_ICON_MORAL'
    | 'UIAS_ICON_ESCALATION'
    | 'UIAS_ICON_SETTINGS'
    | 'UIAS_ICON_ARCHIVE'
    | 'UIAS_ICON_EXIT'
    | 'UIAS_FRAME_STARTSCREEN'
    | 'UIAS_FRAME_MENU'
    | 'UIAS_FRAME_HUD'
    | 'UIAS_FRAME_PROMPT'
    | 'UIAS_ICON_TUTORIAL'
    | 'UIAS_ICON_PERFORMANCE';

export type CutsceneId =
    | 'CS_INTRO_MAIN'
    | 'CS_OUTRO_S'
    | 'CS_OUTRO_A'
    | 'CS_OUTRO_B'
    | 'CS_OUTRO_C'
    | 'CS_OUTRO_D'
    | 'CS_OUTRO_F'
    | 'CS_STAATSFEIND_01_BRIEFING';
