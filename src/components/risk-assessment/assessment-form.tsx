'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { assessInvestmentRisk } from '@/app/actions';
import type { InvestmentRiskAssessmentOutput } from '@/ai/flows/investment-risk-assessment';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const assessmentSchema = z.object({
  investmentTimeline: z.string().min(1, 'Please select an investment timeline.'),
  riskComfortLevel: z.string().min(1, 'Please select your comfort level with risk.'),
  investmentKnowledge: z.string().min(1, 'Please select your investment knowledge level.'),
  financialSituation: z.string().min(1, 'Please select your financial situation.'),
  investmentGoals: z.string().min(1, 'Please select your primary investment goal.'),
});

type AssessmentFormValues = z.infer<typeof assessmentSchema>;

const formFields = [
    { name: 'investmentTimeline', label: 'How long do you plan to invest your money?', options: ['Less than 5 years', '5-10 years', 'More than 10 years'] },
    { name: 'riskComfortLevel', label: 'How comfortable are you with losing money for potentially higher returns?', options: ['Not at all comfortable', 'Somewhat comfortable', 'Very comfortable'] },
    { name: 'investmentKnowledge', label: 'How knowledgeable are you about investments?', options: ['Beginner', 'Intermediate', 'Expert'] },
    { name: 'financialSituation', label: 'Describe your current financial situation.', options: ['Stable income, low debt', 'Variable income, some debt', 'Unstable income, high debt'] },
    { name: 'investmentGoals', label: 'What are your primary investment goals?', options: ['Capital Preservation', 'Growth', 'Income Generation'] },
] as const;


export function AssessmentForm() {
  const [result, setResult] = useState<InvestmentRiskAssessmentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AssessmentFormValues>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      investmentTimeline: '',
      riskComfortLevel: '',
      investmentKnowledge: '',
      financialSituation: '',
      investmentGoals: '',
    },
  });

  async function onSubmit(data: AssessmentFormValues) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const response = await assessInvestmentRisk(data);
    if ('error' in response) {
      setError(response.error);
    } else {
      setResult(response);
    }
    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {formFields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: renderField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <Select onValueChange={renderField.onChange} defaultValue={renderField.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assess My Risk
          </Button>
        </form>
      </Form>

      {result && (
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Your Risk Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Risk Level: {result.riskLevel}</h3>
            </div>
            <div>
              <h3 className="font-semibold">Risk Score: {result.riskScore}/10</h3>
              <p className="text-sm text-muted-foreground">
                Based on your answers, you have a {result.riskLevel.toLowerCase()} risk tolerance. This score helps in tailoring investment advice to your comfort level.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
    </>
  );
}
