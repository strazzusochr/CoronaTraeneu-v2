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
