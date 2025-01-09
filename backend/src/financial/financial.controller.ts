import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FinancialInputs } from '../types/common';

@Controller('api/financial')
export class FinancialController {
    constructor(private readonly financialService: FinancialService) {}

    @Post('calculate')
    calculateMetrics(@Body() inputs: FinancialInputs) {
        return this.financialService.calculateMetrics(inputs);
    }
}
