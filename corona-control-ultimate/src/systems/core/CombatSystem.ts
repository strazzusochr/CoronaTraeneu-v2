/**
 * V6.0 COMBAT SYSTEM
 * 
 * Features:
 * - Hitbox-based damage (Head, Torso, Limbs)
 * - Health management
 * - Impact physics triggers
 */

export enum HitboxType {
    HEAD = 'HEAD',
    TORSO = 'TORSO',
    LIMB = 'LIMB'
}

export class CombatSystem {
    private static damageMultipliers: Record<HitboxType, number> = {
        [HitboxType.HEAD]: 2.5,
        [HitboxType.TORSO]: 1.0,
        [HitboxType.LIMB]: 0.5
    };

    public static processHit(npcId: string, part: HitboxType, baseDamage: number) {
        const multiplier = this.damageMultipliers[part];
        const totalDamage = baseDamage * multiplier;

        console.log(`[CombatSystem] NPC ${npcId} getroffen! Part: ${part}, Damage: ${totalDamage}`);

        // Logic to update NPC health and trigger animations
        return totalDamage;
    }
}
