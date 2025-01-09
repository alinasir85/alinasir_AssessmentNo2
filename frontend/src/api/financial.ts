import axios from 'axios';
import {FinancialInputs, FinancialMetrics} from "../types/common.ts";

const API_BASE_URL = 'http://localhost:3000/api';

export const calculateMetrics = async (inputs: FinancialInputs): Promise<FinancialMetrics> => {
    const response = await axios.post(`${API_BASE_URL}/financial/calculate`, inputs);
    return response.data;
};
