export interface FinancialInputs {
    purchasePrice: number;
    rent: number;
    rehabCost: number;
    loanToValue: number;
    mortgageRate: number;
    mortgagePeriod: number;
    operatingExpenses: number;
    appreciationRate: number;
    exitCap: number;
    holdingPeriod: number;
}

export interface FinancialMetrics {
    irr: number;
    capRate: number;
    cashOnCash: number;
    monthlyMortgage: number;
    cashFlows: number[];
}
