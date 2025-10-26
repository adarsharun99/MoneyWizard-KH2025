
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LessonForm } from '@/components/learn/lesson-form';
import Link from 'next/link';

export default function PersonalizedLearnPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Financial Lessons</CardTitle>
          <CardDescription>
            Tell us what you want to learn, and we'll generate a lesson just for you. 
            Want a more structured path?{' '}
            <Link href="/learn" className="text-primary underline">
              Check out our lesson plan.
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LessonForm />
        </CardContent>
      </Card>
    </div>
  );
}
