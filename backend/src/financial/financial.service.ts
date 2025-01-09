import { Injectable } from '@nestjs/common';
import { FinancialInputs, FinancialMetrics } from '../types/common';

interface CashFlowParams {
    inputs: FinancialInputs;
    downPayment: number;
    monthlyMortgage: number;
    loanAmount: number;
}

@Injectable()
export class FinancialService {
    calculateMetrics(inputs: FinancialInputs): FinancialMetrics {
        const {
            purchasePrice,
            rent,
            rehabCost,
            loanToValue,
            mortgageRate,
            mortgagePeriod,
            operatingExpenses,
            appreciationRate,
            exitCap,
            holdingPeriod,
        } = inputs;

        const downPayment = purchasePrice * (1 - loanToValue);
        const loanAmount = purchasePrice * loanToValue;
        const monthlyMortgage = this.calculateMonthlyMortgage(loanAmount, mortgageRate, mortgagePeriod);

        const cashFlows = this.calculateCashFlows({
            inputs,
            downPayment,
            monthlyMortgage,
            loanAmount,
        });

        return {
            irr: this.calculateIRR(cashFlows, 0.1),
            capRate: (rent * 12 * (1 - operatingExpenses)) / purchasePrice,
            cashOnCash: ((rent * 12 * (1 - operatingExpenses)) - (monthlyMortgage * 12)) / (downPayment + rehabCost),
            monthlyMortgage,
            cashFlows,
        };
    }

    private calculateMonthlyMortgage(loanAmount: number, rate: number, period: number): number {
        const monthlyRate = rate / 12;
        const numPayments = period * 12;
        return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
            (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    private calculateIRR(cashFlows: number[], guess: number): number {
        const maxIterations = 1000;
        const tolerance = 0.00001;
        let rate = guess;

        // Newton-Raphson method for finding IRR
        for (let i = 0; i < maxIterations; i++) {
            let npv = 0;
            let derivativeNpv = 0;

            // Calculate NPV and its derivative
            for (let j = 0; j < cashFlows.length; j++) {
                const factor = Math.pow(1 + rate, j);
                npv += cashFlows[j] / factor;
                if (j > 0) {
                    derivativeNpv -= (j * cashFlows[j]) / Math.pow(1 + rate, j + 1);
                }
            }

            // Apply Newton-Raphson formula
            const newRate = rate - npv / derivativeNpv;

            // Check for convergence
            if (Math.abs(newRate - rate) < tolerance) {
                return newRate;
            }

            // Prepare for next iteration
            rate = newRate;
        }

        // If no convergence, return best guess
        return rate;
    }

    private calculateCashFlows(params: CashFlowParams): number[] {
        const {
            inputs: {
                purchasePrice,
                rent,
                rehabCost,
                mortgagePeriod,
                holdingPeriod,
                operatingExpenses,
                appreciationRate,
            },
            downPayment,
            monthlyMortgage,
            loanAmount,
        } = params;

        const cashFlows: number[] = [];
        let propertyValue = purchasePrice;
        let annualRent = rent * 12;

        // Initial investment (negative cash flow)
        cashFlows.push(-(downPayment + rehabCost));

        // Calculate cash flows for each year
        for (let year = 1; year <= holdingPeriod; year++) {
            // Calculate operating income
            const grossIncome = annualRent;
            const operatingCosts = annualRent * operatingExpenses;
            const netOperatingIncome = grossIncome - operatingCosts;

            // Calculate debt service
            const annualDebtService = monthlyMortgage * 12;

            // Calculate base cash flow
            let yearCashFlow = netOperatingIncome - annualDebtService;

            // For the final year, add property sale proceeds
            if (year === holdingPeriod) {
                // Calculate property value appreciation
                propertyValue *= Math.pow(1 + appreciationRate, year);

                // Calculate selling costs (typically 6%)
                const sellingCosts = propertyValue * 0.06;

                // Calculate remaining loan balance
                const remainingBalance = this.calculateRemainingLoanBalance(
                    loanAmount,
                    mortgagePeriod * 12,
                    monthlyMortgage,
                    year * 12
                );

                // Add net sale proceeds to final year cash flow
                yearCashFlow += propertyValue - sellingCosts - remainingBalance;
            }

            cashFlows.push(yearCashFlow);

            // Increase rent for next year
            annualRent *= (1 + appreciationRate);
        }

        return cashFlows;
    }

    private calculateRemainingLoanBalance(
        principal: number,
        totalPayments: number,
        monthlyPayment: number,
        paymentsMade: number
    ): number {
        const monthlyRate = this.calculateMonthlyInterestRate(totalPayments, principal, monthlyPayment);
        return principal * Math.pow(1 + monthlyRate, paymentsMade) -
            (monthlyPayment * (Math.pow(1 + monthlyRate, paymentsMade) - 1)) / monthlyRate;
    }

    private calculateMonthlyInterestRate(
        totalPayments: number,
        principal: number,
        monthlyPayment: number
    ): number {
        return Math.pow(monthlyPayment * totalPayments / principal, 1 / totalPayments) - 1;
    }
}
