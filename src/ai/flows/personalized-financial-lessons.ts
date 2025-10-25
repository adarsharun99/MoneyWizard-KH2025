'use server';

/**
 * @fileOverview A flow for generating personalized financial lessons and explanations using AI.
 *
 * - generatePersonalizedFinancialLesson - A function that generates a personalized financial lesson.
 * - PersonalizedFinancialLessonInput - The input type for the generatePersonalizedFinancialLesson function.
 * - PersonalizedFinancialLessonOutput - The return type for the generatePersonalizedFinancialLesson function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFinancialLessonInputSchema = z.object({
  topic: z.string().describe('The specific financial topic to learn about.'),
  userFinancialSituation: z.string().describe('Description of the user\'s current financial situation.'),
  learningStyle: z.string().describe('The user\'s preferred learning style (e.g., visual, auditory, kinesthetic).'),
});

export type PersonalizedFinancialLessonInput = z.infer<typeof PersonalizedFinancialLessonInputSchema>;

const PersonalizedFinancialLessonOutputSchema = z.object({
  lessonTitle: z.string().describe('The title of the personalized financial lesson.'),
  lessonContent: z.string().describe('The detailed content of the personalized financial lesson.'),
});

export type PersonalizedFinancialLessonOutput = z.infer<typeof PersonalizedFinancialLessonOutputSchema>;

export async function generatePersonalizedFinancialLesson(
  input: PersonalizedFinancialLessonInput
): Promise<PersonalizedFinancialLessonOutput> {
  return personalizedFinancialLessonFlow(input);
}

const personalizedFinancialLessonPrompt = ai.definePrompt({
  name: 'personalizedFinancialLessonPrompt',
  input: {
    schema: PersonalizedFinancialLessonInputSchema,
  },
  output: {
    schema: PersonalizedFinancialLessonOutputSchema,
  },
  prompt: `You are an AI financial tutor that specializes in creating personalized lessons.

  Create a personalized financial lesson on the topic of {{topic}} tailored to the user's financial situation and learning style.
  The user\'s financial situation is: {{userFinancialSituation}}
  The user\'s learning style is: {{learningStyle}}

  The lesson should be easy to understand and provide actionable advice.
  The lesson title should be engaging.
`,
});

const personalizedFinancialLessonFlow = ai.defineFlow(
  {
    name: 'personalizedFinancialLessonFlow',
    inputSchema: PersonalizedFinancialLessonInputSchema,
    outputSchema: PersonalizedFinancialLessonOutputSchema,
  },
  async input => {
    const {output} = await personalizedFinancialLessonPrompt(input);
    return output!;
  }
);
