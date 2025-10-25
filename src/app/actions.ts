
'use server';

import {
  investmentRiskAssessment,
  type InvestmentRiskAssessmentInput,
  type InvestmentRiskAssessmentOutput,
} from '@/ai/flows/investment-risk-assessment';
import {
  portfolioRecommendation,
  type PortfolioRecommendationInput,
  type PortfolioRecommendationOutput,
} from '@/ai/flows/portfolio-recommendation';
import {
  generatePersonalizedFinancialLesson,
  type PersonalizedFinancialLessonInput,
  type PersonalizedFinancialLessonOutput,
} from '@/ai/flows/personalized-financial-lessons';
import {
  getFinancialAdvice,
  type FinancialAdviceInput,
  type FinancialAdviceOutput,
} from '@/ai/flows/financial-advice-chatbot';
import { z } from 'zod';

const handleAIError = (error: unknown) => {
  console.error(error);
  // In a real app, you'd want to log this to a service like Sentry or Firebase Crashlytics
  return { error: 'An unexpected error occurred. Please try again.' };
};

export async function assessInvestmentRisk(
  input: InvestmentRiskAssessmentInput
): Promise<InvestmentRiskAssessmentOutput | { error: string }> {
  try {
    const result = await investmentRiskAssessment(input);
    return result;
  } catch (error) {
    return handleAIError(error);
  }
}

export async function recommendPortfolio(
  input: PortfolioRecommendationInput
): Promise<PortfolioRecommendationOutput | { error: string }> {
  try {
    const result = await portfolioRecommendation(input);
    return result;
  } catch (error) {
    return handleAIError(error);
  }
}

export async function createFinancialLesson(
  input: PersonalizedFinancialLessonInput
): Promise<PersonalizedFinancialLessonOutput | { error: string }> {
  try {
    const result = await generatePersonalizedFinancialLesson(input);
    return result;
  } catch (error) {
    return handleAIError(error);
  }
}

export async function fetchFinancialAdvice(
  input: FinancialAdviceInput
): Promise<FinancialAdviceOutput | { error: string }> {
  try {
    const result = await getFinancialAdvice(input);
    return result;
  } catch (error) {
    return handleAIError(error);
  }
}
