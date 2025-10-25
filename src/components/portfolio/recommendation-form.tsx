'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { recommendPortfolio } from '@/app/actions';
import type { PortfolioRecommendationOutput } from '@/ai/flows/portfolio-recommendation';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const recommendationSchema = z.object({
  riskProfile: z.string().min(1, 'Please select your risk profile.'),
  financialGoals: z.string().min(1, 'Please enter your financial goals.'),
  investmentAmount: z.coerce.number().min(100, 'Investment amount must be at least $100.'),
  investmentTimeHorizon: z.string().min(1, 'Please select your investment time horizon.'),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

export function RecommendationForm() {
  const [result, setResult] = useState<PortfolioRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
        riskProfile: '',
        financialGoals: '',
        investmentAmount: 1000,
        investmentTimeHorizon: ''
    }
  });

  async function onSubmit(data: RecommendationFormValues) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const response = await recommendPortfolio(data);
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
          <FormField
            control={form.control}
            name="riskProfile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Profile</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your risk profile" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Conservative">Conservative</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can determine this using our Risk Assessment tool.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="financialGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Financial Goals</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Retirement, buying a house" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="investmentAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investment Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="investmentTimeHorizon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investment Time Horizon</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your time horizon" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Short-term (1-3 years)">Short-term (1-3 years)</SelectItem>
                    <SelectItem value="Medium-term (3-7 years)">Medium-term (3-7 years)</SelectItem>
                    <SelectItem value="Long-term (7+ years)">Long-term (7+ years)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Recommendation
          </Button>
        </form>
      </Form>

      {result && (
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Your Personalized Portfolio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 whitespace-pre-wrap font-sans">
              <div>
                <h3 className="font-semibold text-lg mb-2">Recommendation</h3>
                <p className="text-sm text-card-foreground">{result.portfolioRecommendation}</p>
              </div>
               <div>
                <h3 className="font-semibold text-lg mb-2">Reasoning</h3>
                <p className="text-sm text-muted-foreground">{result.reasoning}</p>
              </div>
          </CardContent>
        </Card>
      )}

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
    </>
  );
}
