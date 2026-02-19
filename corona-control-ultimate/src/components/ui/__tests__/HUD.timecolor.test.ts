import { describe, it, expect } from 'vitest';
import { resolveTimeColor } from '../HUD';
import { UI_TIME_COLORS } from '@/shaders/ShaderConstants';

describe('HUD time color mapping', () => {
    it('maps MORNING for 06–11h', () => {
        expect(resolveTimeColor(6)).toBe(UI_TIME_COLORS.MORNING);
        expect(resolveTimeColor(9)).toBe(UI_TIME_COLORS.MORNING);
        expect(resolveTimeColor(11)).toBe(UI_TIME_COLORS.MORNING);
    });

    it('maps MIDDAY for 12–17h', () => {
        expect(resolveTimeColor(12)).toBe(UI_TIME_COLORS.MIDDAY);
        expect(resolveTimeColor(15)).toBe(UI_TIME_COLORS.MIDDAY);
        expect(resolveTimeColor(17)).toBe(UI_TIME_COLORS.MIDDAY);
    });

    it('maps EVENING for 18–21h', () => {
        expect(resolveTimeColor(18)).toBe(UI_TIME_COLORS.EVENING);
        expect(resolveTimeColor(19)).toBe(UI_TIME_COLORS.EVENING);
        expect(resolveTimeColor(21)).toBe(UI_TIME_COLORS.EVENING);
    });

    it('maps NIGHT for other hours', () => {
        expect(resolveTimeColor(0)).toBe(UI_TIME_COLORS.NIGHT);
        expect(resolveTimeColor(3)).toBe(UI_TIME_COLORS.NIGHT);
        expect(resolveTimeColor(23)).toBe(UI_TIME_COLORS.NIGHT);
    });
});
