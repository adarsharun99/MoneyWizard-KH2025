
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { stockMarketLessons } from '@/lib/data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LearnPage() {
  const lessonImage = PlaceHolderImages.find(p => p.id === 'lesson-card');

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl tracking-tight">Learn to Invest</CardTitle>
          <CardDescription>
            Follow this path to build your investment knowledge from the ground up.
            Looking for something specific?{' '}
            <Link href="/learn/personalized" className="text-primary underline">
              Generate a personalized lesson.
            </Link>
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="relative pl-6">
        {/* The vertical line */}
        <div className="absolute left-[35px] top-0 h-full w-1.5 rounded bg-muted -translate-x-1/2"></div>
        
        <div className="space-y-12">
          {stockMarketLessons.map((lesson, index) => (
            <div key={lesson.id} className="relative flex items-center">
              <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground">
                {lesson.status === 'completed' && <CheckCircle className="h-8 w-8" />}
                {lesson.status === 'unlocked' && <PlayCircle className="h-8 w-8" />}
                {lesson.status === 'locked' && <Lock className="h-8 w-8" />}
              </div>
              <Card className={cn("ml-8 w-full transition-all", lesson.status === 'locked' && 'bg-muted/60')}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className={cn(lesson.status === 'locked' && 'text-muted-foreground')}>
                        {lesson.title}
                      </CardTitle>
                      <CardDescription className={cn(lesson.status === 'locked' && 'text-muted-foreground/80')}>
                        {lesson.description}
                      </CardDescription>
                    </div>
                    {lessonImage && (
                        <Image
                          src={lessonImage.imageUrl}
                          alt="Lesson icon"
                          data-ai-hint={lessonImage.imageHint}
                          width={64}
                          height={64}
                          className="hidden sm:block rounded-lg"
                        />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Button disabled={lesson.status === 'locked'}>
                    {lesson.status === 'completed' ? 'Review' : 'Start Lesson'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
