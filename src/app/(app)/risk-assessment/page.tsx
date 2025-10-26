import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AssessmentForm } from '@/components/risk-assessment/assessment-form';

export default function RiskAssessmentPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Investment Risk Assessment</CardTitle>
          <CardDescription>
            Answer a few questions to help us understand your risk tolerance and suggest suitable investment strategies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AssessmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
