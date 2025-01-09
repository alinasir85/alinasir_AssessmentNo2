import { useState, useEffect } from 'react';
import { calculateMetrics } from '../api/financial';
import { FinancialInputs, FinancialMetrics } from '../types/common';
import { Card, CardContent } from '@app/components/Card';
import { Slider } from '@app/components/Slider';
import { Button } from '@app/components/Button';
import { Tabs, TabsList, TabsTrigger } from '@app/components/Tab';

const defaultInputs: FinancialInputs = {
    purchasePrice: 464400,
    rent: 2460,
    rehabCost: 3000,
    loanToValue: 0.7,
    mortgageRate: 0.04,
    mortgagePeriod: 30,
    operatingExpenses: 0.4,
    appreciationRate: 0.03,
    exitCap: 0.06,
    holdingPeriod: 10
};

const FinancialCalculator = () => {
    const [inputs, setInputs] = useState<FinancialInputs>(defaultInputs);
    const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState("10");

    const handleSliderChange = (field: keyof FinancialInputs) => (value: number[]) => {
        setInputs(prev => ({ ...prev, [field]: value[0] }));
    };

    useEffect(() => {
        const calculateUpdatedMetrics = async () => {
            try {
                const result = await calculateMetrics(inputs);
                setMetrics(result);
            } catch (err) {
                console.error('Calculation error:', err);
            }
        };

        const timeoutId = setTimeout(calculateUpdatedMetrics, 500);
        return () => clearTimeout(timeoutId);
    }, [inputs]);

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const formatPercentage = (value: number): string => {
        return `${(value * 100).toFixed(2)}%`;
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6 border border-gray-500 mt-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">List Price</h2>
                    <div className="text-3xl font-bold">{formatCurrency(inputs.purchasePrice)}</div>
                    <div className="text-gray-500">Initial Investment {formatCurrency(472044)}</div>
                </div>
                <Tabs defaultValue={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <TabsList>
                        <TabsTrigger value="1">1 Yr</TabsTrigger>
                        <TabsTrigger value="5">5 Yrs</TabsTrigger>
                        <TabsTrigger value="10">10 Yrs</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="w-32">Purchase Price</span>
                            <div className="flex-1 mx-4">
                                <Slider
                                    value={[inputs.purchasePrice]}
                                    onValueChange={handleSliderChange('purchasePrice')}
                                    min={100000}
                                    max={1000000}
                                    step={1000}
                                />
                            </div>
                            <span className="w-24 text-right">{formatCurrency(inputs.purchasePrice)}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="w-32">Rehab Cost</span>
                            <div className="flex-1 mx-4">
                                <Slider
                                    value={[inputs.rehabCost]}
                                    onValueChange={handleSliderChange('rehabCost')}
                                    min={0}
                                    max={50000}
                                    step={100}
                                />
                            </div>
                            <span className="w-24 text-right">{formatCurrency(inputs.rehabCost)}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="w-32">Rent</span>
                            <div className="flex-1 mx-4">
                                <Slider
                                    value={[inputs.rent]}
                                    onValueChange={handleSliderChange('rent')}
                                    min={500}
                                    max={5000}
                                    step={10}
                                />
                            </div>
                            <span className="w-24 text-right">{formatCurrency(inputs.rent)}</span>
                        </div>
                    </div>

                    <div className="flex justify-between mt-8">
                        <Button variant="outline">Reset to Default</Button>
                        <Button variant="outline">Edit Assumptions</Button>
                    </div>
                </CardContent>
            </Card>

            {metrics && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <div className="text-gray-500">Cap Rate</div>
                                <div className="text-xl font-semibold">{formatPercentage(metrics.capRate)}</div>
                            </div>
                            <div>
                                <div className="text-gray-500">Cash on Cash</div>
                                <div className="text-xl font-semibold">{formatPercentage(metrics.cashOnCash)}</div>
                            </div>
                            <div>
                                <div className="text-gray-500">IRR</div>
                                <div className="text-xl font-semibold">{formatPercentage(metrics.irr)}</div>
                            </div>
                            <div>
                                <div className="text-gray-500">Monthly Mortgage</div>
                                <div className="text-xl font-semibold">{metrics.monthlyMortgage?.toFixed(2)}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default FinancialCalculator;
