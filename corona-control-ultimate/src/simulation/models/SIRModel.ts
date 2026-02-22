export interface SIRState {
    susceptible: number;
    infectious: number;
    recovered: number;
    population: number;
}

export class SIRModel {
    private beta: number; // Transmission rate
    private gamma: number; // Recovery rate

    constructor(beta: number, gamma: number) {
        this.beta = beta;
        this.gamma = gamma;
    }

    /**
     * Calculates the Basic Reproduction Number (R0)
     */
    public getR0(): number {
        return this.beta / this.gamma;
    }

    /**
     * Steps the simulation forward by 1 time unit (e.g., 1 day)
     */
    public step(state: SIRState): SIRState {
        const { susceptible, infectious, recovered, population } = state;

        // New infections: beta * I * S / N
        const newInfections = (this.beta * infectious * susceptible) / population;
        
        // Recoveries: gamma * I
        const newRecoveries = this.gamma * infectious;

        return {
            susceptible: Math.max(0, susceptible - newInfections),
            infectious: Math.max(0, infectious + newInfections - newRecoveries),
            recovered: Math.min(population, recovered + newRecoveries),
            population
        };
    }
}
