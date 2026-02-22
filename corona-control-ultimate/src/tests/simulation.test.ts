import { describe, it, expect } from 'vitest';
import { SIRModel, SIRState } from '../simulation/models/SIRModel';

describe('SIR Epidemiological Model', () => {
    it('calculates R0 correctly based on beta and gamma', () => {
        // Transmission rate = 0.5, Recovery rate = 0.1
        // R0 should be 0.5 / 0.1 = 5.0
        const model = new SIRModel(0.5, 0.1);
        expect(model.getR0()).toBe(5.0);
    });

    it('preserves total population count across steps', () => {
        const model = new SIRModel(0.3, 0.1);
        let state: SIRState = {
            susceptible: 990,
            infectious: 10,
            recovered: 0,
            population: 1000
        };

        const totalInitial = state.susceptible + state.infectious + state.recovered;

        state = model.step(state);
        const totalAfter1 = state.susceptible + state.infectious + state.recovered;

        expect(Math.round(totalInitial)).toBe(1000);
        expect(Math.round(totalAfter1)).toBe(1000);
    });

    it('reduces infections when R0 < 1', () => {
        // Beta 0.1, Gamma 0.2 -> R0 = 0.5
        const model = new SIRModel(0.1, 0.2);
        let state: SIRState = {
            susceptible: 900,
            infectious: 100,
            recovered: 0,
            population: 1000
        };

        const initialInfectious = state.infectious;
        state = model.step(state);
        
        // Since recovery rate > transmission rate, number of infectious must go down over time
        expect(state.infectious).toBeLessThan(initialInfectious);
    });
});
