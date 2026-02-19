import { describe, it, expect } from 'vitest';
import { resolvePresetForHour } from '../PostProcessing';
import { POST_PROCESSING_PRESETS } from '@/rendering/RenderPipeline';

describe('PostProcessing preset selection', () => {
    it('selects MORNING between 06 and 11', () => {
        const p6 = resolvePresetForHour(6);
        const p9 = resolvePresetForHour(9);
        const p11 = resolvePresetForHour(11);
        expect(p6.bloomIntensity).toBe(POST_PROCESSING_PRESETS.MORNING.bloomIntensity);
        expect(p9.bloomIntensity).toBe(POST_PROCESSING_PRESETS.MORNING.bloomIntensity);
        expect(p11.bloomIntensity).toBe(POST_PROCESSING_PRESETS.MORNING.bloomIntensity);
    });

    it('selects MIDDAY between 12 and 17', () => {
        const p12 = resolvePresetForHour(12);
        const p15 = resolvePresetForHour(15);
        const p17 = resolvePresetForHour(17);
        expect(p12.bloomIntensity).toBe(POST_PROCESSING_PRESETS.MIDDAY.bloomIntensity);
        expect(p15.bloomIntensity).toBe(POST_PROCESSING_PRESETS.MIDDAY.bloomIntensity);
        expect(p17.bloomIntensity).toBe(POST_PROCESSING_PRESETS.MIDDAY.bloomIntensity);
    });

    it('selects EVENING between 18 and 21', () => {
        const p18 = resolvePresetForHour(18);
        const p19 = resolvePresetForHour(19);
        const p21 = resolvePresetForHour(21);
        expect(p18.bloomIntensity).toBe(POST_PROCESSING_PRESETS.EVENING.bloomIntensity);
        expect(p19.bloomIntensity).toBe(POST_PROCESSING_PRESETS.EVENING.bloomIntensity);
        expect(p21.bloomIntensity).toBe(POST_PROCESSING_PRESETS.EVENING.bloomIntensity);
    });

    it('selects NIGHT otherwise', () => {
        const p0 = resolvePresetForHour(0);
        const p23 = resolvePresetForHour(23);
        const p3 = resolvePresetForHour(3);
        expect(p0.bloomIntensity).toBe(POST_PROCESSING_PRESETS.NIGHT.bloomIntensity);
        expect(p23.bloomIntensity).toBe(POST_PROCESSING_PRESETS.NIGHT.bloomIntensity);
        expect(p3.bloomIntensity).toBe(POST_PROCESSING_PRESETS.NIGHT.bloomIntensity);
    });
});
