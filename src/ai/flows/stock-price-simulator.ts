
'use server';

/**
 * @fileOverview A flow to simulate fetching real-time stock data.
 *
 * This flow takes the static holdings data, applies a random fluctuation
 * to the values, and returns the updated data. This simulates calling an
 * external stock market API.
 */

import { ai } from '@/ai/genkit';
import { holdingsData } from '@/lib/data';
import type { StockDataOutput } from '@/ai/flows/stock-discovery';

export async function getSimulatedStockData(): Promise<StockDataOutput> {
    return stockPriceSimulatorFlow();
}

const stockPriceSimulatorFlow = ai.defineFlow(
  {
    name: 'stockPriceSimulatorFlow',
  },
  async (): Promise<StockDataOutput> => {
    // Simulate API call latency
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate price fluctuations
    return holdingsData.map(holding => {
        const fluctuation = (Math.random() - 0.5) * 0.05; // Fluctuate by up to 5%
        const originalValue = holding.value / (1 + (parseFloat(holding.change) / 100));
        const newValue = holding.value * (1 + fluctuation);
        const newChange = ((newValue / originalValue) - 1) * 100;
        
        return {
            ...holding,
            value: newValue,
            change: `${newChange >= 0 ? '+' : ''}${newChange.toFixed(2)}%`,
        };
    });
  }
);
