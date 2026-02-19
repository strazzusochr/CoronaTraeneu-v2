import { describe, it, expect } from 'vitest';
import { LEVEL_DEFINITIONS, LEVEL5_CONFIG, LEVEL6_CONFIG, LEVEL7_CONFIG, type LevelId } from '@/stores/types';

describe('Level definitions', () => {
    it('defines metadata for LEVEL_1_STEPHANSPLATZ', () => {
        const id: LevelId = 'LEVEL_1_STEPHANSPLATZ';
        const meta = LEVEL_DEFINITIONS[id];
        expect(meta).toBeDefined();
        expect(meta.id).toBe(id);
        expect(meta.name).toBe('Stephansplatz – Demo 17. März');
        expect(meta.description).toBe('Innenstadt Wien, Stephansdom, große Demo gegen Corona-Maßnahmen.');
    });

    it('defines metadata for LEVEL_5_BALLHAUSPLATZ', () => {
        const id: LevelId = 'LEVEL_5_BALLHAUSPLATZ';
        const meta = LEVEL_DEFINITIONS[id];
        expect(meta).toBeDefined();
        expect(meta.id).toBe(id);
        expect(meta.name).toBe('Level 5 – Ballhausplatz');
        expect(meta.description).toBe('Regierungsviertel mit hoher politischer Brisanz und starkem Medieninteresse.');
    });

    it('provides runtime config for LEVEL_5_BALLHAUSPLATZ aligned with spec', () => {
        expect(LEVEL5_CONFIG.id).toBe('LEVEL_5_BALLHAUSPLATZ');
        expect(LEVEL5_CONFIG.maxDemoNpcs).toBe(400);
        expect(LEVEL5_CONFIG.maxPoliceNpcs).toBe(70);
        expect(LEVEL5_CONFIG.maxTotalNpcs).toBe(500);
        expect(LEVEL5_CONFIG.maxEscalationStage).toBe(4);
        expect(LEVEL5_CONFIG.timeOfDay).toBe('EVENING');
        expect(LEVEL5_CONFIG.weather).toBe('SNOW');
    });

    it('provides runtime config for LEVEL_6_GUERTEL aligned with spec', () => {
        expect(LEVEL6_CONFIG.id).toBe('LEVEL_6_GUERTEL');
        expect(LEVEL6_CONFIG.maxDemoNpcs).toBe(500);
        expect(LEVEL6_CONFIG.maxPoliceNpcs).toBe(80);
        expect(LEVEL6_CONFIG.maxTotalNpcs).toBe(600);
        expect(LEVEL6_CONFIG.maxEscalationStage).toBe(5);
        expect(LEVEL6_CONFIG.timeOfDay).toBe('EVENING');
        expect(LEVEL6_CONFIG.weather).toBe('FOG');
    });

    it('provides runtime config for LEVEL_7_ORF_ZENTRUM aligned with spec', () => {
        expect(LEVEL7_CONFIG.id).toBe('LEVEL_7_ORF_ZENTRUM');
        expect(LEVEL7_CONFIG.maxDemoNpcs).toBe(550);
        expect(LEVEL7_CONFIG.maxPoliceNpcs).toBe(90);
        expect(LEVEL7_CONFIG.maxTotalNpcs).toBe(700);
        expect(LEVEL7_CONFIG.maxEscalationStage).toBe(5);
        expect(LEVEL7_CONFIG.timeOfDay).toBe('DAY');
        expect(LEVEL7_CONFIG.weather).toBe('CLEAR');
    });
});
