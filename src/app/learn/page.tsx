import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LessonForm } from '@/components/learn/lesson-form';

export default function LearnPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Financial Lessons</CardTitle>
          <CardDescription>
            Tell us what you want to learn, and we'll generate a lesson just for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LessonForm />
        </CardContent>
      </Card>
    </div>
  );
}
