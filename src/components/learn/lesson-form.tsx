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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createFinancialLesson } from '@/app/actions';
import type { PersonalizedFinancialLessonOutput } from '@/ai/flows/personalized-financial-lessons';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const lessonSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters.'),
  userFinancialSituation: z.string().min(10, 'Please describe your situation in at least 10 characters.'),
  learningStyle: z.string().min(1, 'Please select a learning style.'),
});

type LessonFormValues = z.infer<typeof lessonSchema>;

export function LessonForm() {
  const [result, setResult] = useState<PersonalizedFinancialLessonOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
        topic: '',
        userFinancialSituation: '',
        learningStyle: ''
    }
  });

  async function onSubmit(data: LessonFormValues) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const response = await createFinancialLesson(data);
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
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Understanding stocks" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="userFinancialSituation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Financial Situation</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., I'm a student with some savings..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="learningStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Learning Style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a learning style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Visual (with examples)">Visual (with examples)</SelectItem>
                    <SelectItem value="Auditory (like a conversation)">Auditory (like a conversation)</SelectItem>
                    <SelectItem value="Kinesthetic (step-by-step actions)">Kinesthetic (step-by-step actions)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Lesson
          </Button>
        </form>
      </Form>

      {result && (
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>{result.lessonTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 whitespace-pre-wrap font-sans">
            <p className="text-sm text-card-foreground leading-relaxed">{result.lessonContent}</p>
          </CardContent>
        </Card>
      )}

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
    </>
  );
}
