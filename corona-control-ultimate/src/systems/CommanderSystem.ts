
import { useGameStore } from '@/stores/gameStore';
import TacticsManager from '@/managers/TacticsManager';
import AISystem from '@/systems/AISystem';
import * as THREE from 'three';
import { EngineLoop } from '@/core/EngineLoopManager';

class CommanderSystem {
    private static instance: CommanderSystem;
    private lastDecisionTime: number = 0;
    private readonly DECISION_INTERVAL = 2000;
    private currentMode: 'HOLD' | 'WALL' | 'CHARGE' = 'HOLD';
    private readonly CHARGE_ON = 80;
    private readonly CHARGE_OFF = 65;

    // Simulation Log für Verifizierung
    public decisionLog: string[] = [];

    private constructor() { }

    public static getInstance(): CommanderSystem {
        if (!CommanderSystem.instance) {
            CommanderSystem.instance = new CommanderSystem();
        }
        return CommanderSystem.instance;
    }

    public update(delta: number) {
        const now = Date.now();
        if (now - this.lastDecisionTime < this.DECISION_INTERVAL) return;
        this.lastDecisionTime = now;

        const store = useGameStore.getState();
        const tension = store.tensionLevel;

        // 1. Analyse Situation
        // (Vereinfacht: Wir schauen nur auf Tension und Anzahl Rioter)
        // In einer vollen Implementierung würden wir Spatial Queries machen.

        // Wir holen uns die NPCs aus dem Store (oder AISystem, wenn wir Zugriff hätten)
        // Da wir im Store nur einfache Daten haben, nutzen wir diese.
        const rioters = store.npcs.filter(n => n.type === 'RIOTER');
        const police = store.npcs.filter(n => n.type === 'POLICE');

        if (police.length === 0) return; // Keine Polizei, kein Befehl

        if (rioters.length === 0) {
            this.currentMode = 'HOLD';
            return;
        }

        if (this.currentMode !== 'CHARGE' && tension >= this.CHARGE_ON) {
            this.currentMode = 'CHARGE';
            this.log(`[COMMANDER] Tension ${tension.toFixed(1)} ≥ ${this.CHARGE_ON}. ORDER: CHARGE!`);
        } else if (this.currentMode === 'CHARGE' && tension <= this.CHARGE_OFF) {
            this.currentMode = 'WALL';
            this.log(`[COMMANDER] Tension ${tension.toFixed(1)} ≤ ${this.CHARGE_OFF}. ORDER: FORM WALL.`);
        } else if (this.currentMode === 'HOLD' && tension > 30) {
            this.currentMode = 'WALL';
            this.log(`[COMMANDER] Medium Tension (${tension.toFixed(1)}). ORDER: FORM WALL.`);
        }

        if (this.currentMode === 'CHARGE') {
            TacticsManager.getInstance().commandCharge(1);
            return;
        }

        if (this.currentMode === 'WALL') {
            const px = police.reduce((a, n) => a + n.position[0], 0) / police.length;
            const pz = police.reduce((a, n) => a + n.position[2], 0) / police.length;
            const rx = rioters.reduce((a, n) => a + n.position[0], 0) / rioters.length;
            const rz = rioters.reduce((a, n) => a + n.position[2], 0) / rioters.length;
            const dirX = rx - px;
            const dirZ = rz - pz;
            const len = Math.max(0.001, Math.hypot(dirX, dirZ));
            const nx = -dirZ / len;
            const nz = dirX / len;
            const width = 12;
            const cx = px + (dirX / len) * 2;
            const cz = pz + (dirZ / len) * 2;
            const start: [number, number, number] = [cx - nx * (width / 2), 0, cz - nz * (width / 2)];
            const end: [number, number, number] = [cx + nx * (width / 2), 0, cz + nz * (width / 2)];

            let frontWidth = 0;
            if (rioters.length > 1) {
                const projections = rioters.map(r => (r.position[0] * nx + r.position[2] * nz));
                const minP = Math.min(...projections);
                const maxP = Math.max(...projections);
                frontWidth = Math.abs(maxP - minP);
            }
            const curvature = frontWidth > 15 ? Math.min(0.25, (frontWidth - 15) / 100) : 0;
            TacticsManager.getInstance().formWall(start, end, 1, curvature);
        }
    }

    private log(message: string) {
        const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
        const entry = `[${timestamp}] ${message}`;
        console.log(entry);
        this.decisionLog.push(entry);

        // Feedback an UI
        useGameStore.getState().setPrompt(message);
    }

    public getLog(): string {
        return this.decisionLog.join('\n');
    }
}

const commanderSystem = CommanderSystem.getInstance();
EngineLoop.onAIUpdate((dt) => commanderSystem.update(dt));

export default CommanderSystem;
