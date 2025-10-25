'use server';

/**
 * @fileOverview This file defines a Genkit flow for assessing investment risk tolerance.
 *
 * It includes:
 * - investmentRiskAssessment: The main function to trigger the risk assessment flow.
 * - InvestmentRiskAssessmentInput: The input type for the risk assessment, representing the questionnaire responses.
 * - InvestmentRiskAssessmentOutput: The output type, providing a risk score and a risk level.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvestmentRiskAssessmentInputSchema = z.object({
  investmentTimeline: z
    .string()
    .describe(
      'How long do you plan to invest the money? (e.g., Less than 5 years, 5-10 years, More than 10 years)'
    ),
  riskComfortLevel: z
    .string()
    .describe(
      'How comfortable are you with the possibility of losing money in exchange for potentially higher returns? (e.g., Not at all comfortable, Somewhat comfortable, Very comfortable)'
    ),
  investmentKnowledge: z
    .string()
    .describe(
      'How knowledgeable are you about investments? (e.g., Beginner, Intermediate, Expert)'
    ),
  financialSituation: z
    .string()
    .describe(
      'Describe your current financial situation. (e.g., Stable income, Some debt, High debt)'
    ),
  investmentGoals: z
    .string()
    .describe(
      'What are your primary investment goals? (e.g., Retirement, Saving for a down payment, Generating income)'
    ),
});
export type InvestmentRiskAssessmentInput = z.infer<
  typeof InvestmentRiskAssessmentInputSchema
>;

const InvestmentRiskAssessmentOutputSchema = z.object({
  riskScore: z
    .number()
    .describe(
      'A numerical score representing the user s risk tolerance (e.g., 1-10, where 1 is very conservative and 10 is very aggressive)'
    ),
  riskLevel: z
    .string()
    .describe(
      'A risk level category based on the risk score (e.g., Conservative, Moderate, Aggressive)'
    ),
});
export type InvestmentRiskAssessmentOutput = z.infer<
  typeof InvestmentRiskAssessmentOutputSchema
>;

export async function investmentRiskAssessment(
  input: InvestmentRiskAssessmentInput
): Promise<InvestmentRiskAssessmentOutput> {
  return investmentRiskAssessmentFlow(input);
}

const investmentRiskAssessmentPrompt = ai.definePrompt({
  name: 'investmentRiskAssessmentPrompt',
  input: {schema: InvestmentRiskAssessmentInputSchema},
  output: {schema: InvestmentRiskAssessmentOutputSchema},
  prompt: `You are an AI investment advisor that evaluates risk tolerance based on a questionnaire.
  Evaluate the user's risk score and risk level based on the questionnaire responses. Use the following information:

  Investment Timeline: {{{investmentTimeline}}}
  Risk Comfort Level: {{{riskComfortLevel}}}
  Investment Knowledge: {{{investmentKnowledge}}}
  Financial Situation: {{{financialSituation}}}
  Investment Goals: {{{investmentGoals}}}

  Based on the information above, provide a riskScore from 1-10 (1 is very conservative, 10 is very aggressive) and a riskLevel (Conservative, Moderate, or Aggressive).`,
});

const investmentRiskAssessmentFlow = ai.defineFlow(
  {
    name: 'investmentRiskAssessmentFlow',
    inputSchema: InvestmentRiskAssessmentInputSchema,
    outputSchema: InvestmentRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await investmentRiskAssessmentPrompt(input);
    return output!;
  }
);
