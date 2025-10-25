'use server';

/**
 * @fileOverview An AI-powered chatbot for providing personalized financial advice.
 *
 * - getFinancialAdvice - A function that provides financial advice based on user input.
 * - FinancialAdviceInput - The input type for the getFinancialAdvice function.
 * - FinancialAdviceOutput - The return type for the getFinancialAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialAdviceInputSchema = z.object({
  question: z.string().describe('The user question about financial advice.'),
  riskProfile: z.string().describe('The risk profile of the user (e.g., low, medium, high).'),
  financialGoals: z.string().describe('The financial goals of the user.'),
  currentInvestments: z.string().optional().describe('Optional: Information about the user\'s current investments.'),
});
export type FinancialAdviceInput = z.infer<typeof FinancialAdviceInputSchema>;

const FinancialAdviceOutputSchema = z.object({
  advice: z.string().describe('The financial advice provided by the chatbot.'),
});
export type FinancialAdviceOutput = z.infer<typeof FinancialAdviceOutputSchema>;

export async function getFinancialAdvice(input: FinancialAdviceInput): Promise<FinancialAdviceOutput> {
  return financialAdviceChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialAdviceChatbotPrompt',
  input: {schema: FinancialAdviceInputSchema},
  output: {schema: FinancialAdviceOutputSchema},
  prompt: `You are a helpful and friendly AI-powered financial advisor. Your goal is to provide personalized and informative advice to users based on their questions, risk profile, financial goals and current investments.

  Always avoid providing advice that breaks the law, such as promising a guaranteed return, or advertising unregistered securities. When you don't know, just say you can't provide the assistance, and make sure to explain why.

  Risk Profile: {{{riskProfile}}}
  Financial Goals: {{{financialGoals}}}
  Current Investments: {{{currentInvestments}}}
  Question: {{{question}}}

  Please provide your advice in a clear and concise manner.`,
});

const financialAdviceChatbotFlow = ai.defineFlow(
  {
    name: 'financialAdviceChatbotFlow',
    inputSchema: FinancialAdviceInputSchema,
    outputSchema: FinancialAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
