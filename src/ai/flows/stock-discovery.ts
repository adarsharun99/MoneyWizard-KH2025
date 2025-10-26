
'use server';

/**
 * @fileOverview A flow for discovering new stocks based on an existing portfolio.
 *
 * This flow analyzes a user's current holdings and suggests new stocks to improve diversification.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { StockDataOutputSchema } from '@/ai/types';
import type { StockDataOutput } from '@/ai/types';


const StockDiscoveryInputSchema = z.object({
  currentHoldings: StockDataOutputSchema,
});
export type StockDiscoveryInput = z.infer<typeof StockDiscoveryInputSchema>;

const StockDiscoveryOutputSchema = z.object({
  suggestions: z.array(z.object({
    symbol: z.string().describe('The stock ticker symbol.'),
    companyName: z.string().describe('The full name of the company.'),
    sector: z.string().describe('The industry sector the company belongs to.'),
    reasoning: z.string().describe('A brief explanation of why this stock is a good diversification choice.'),
  })),
});
export type StockDiscoveryOutput = z.infer<typeof StockDiscoveryOutputSchema>;

export async function discoverStocks(input: StockDiscoveryInput): Promise<StockDiscoveryOutput> {
  return stockDiscoveryFlow(input);
}

const stockDiscoveryPrompt = ai.definePrompt({
  name: 'stockDiscoveryPrompt',
  input: { schema: StockDiscoveryInputSchema },
  output: { schema: StockDiscoveryOutputSchema },
  prompt: `You are a financial analyst AI. Your task is to recommend three new stocks to a user to help them diversify their portfolio.

Analyze the user's current holdings and suggest three companies in different sectors to reduce risk and provide exposure to new areas of the market. For each suggestion, provide a brief reasoning.

Current Holdings:
{{#each currentHoldings}}
- {{name}} ({{symbol}}), Value: \${{value}}
{{/each}}

Provide three new, distinct stock suggestions.`,
});

const stockDiscoveryFlow = ai.defineFlow(
  {
    name: 'stockDiscoveryFlow',
    inputSchema: StockDiscoveryInputSchema,
    outputSchema: StockDiscoveryOutputSchema,
  },
  async (input) => {
    const { output } = await stockDiscoveryPrompt(input);
    return output!;
  }
);
