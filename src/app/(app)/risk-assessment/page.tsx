
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AssessmentForm } from '@/components/risk-assessment/assessment-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecommendationForm } from '@/components/portfolio/recommendation-form';

export default function RiskAssessmentPage() {
  return (
    <Tabs defaultValue="assessment" className="space-y-4">
      <TabsList>
        <TabsTrigger value="assessment">Preferences</TabsTrigger>
        <TabsTrigger value="recommendation">Get Recommendation</TabsTrigger>
      </TabsList>
      <TabsContent value="assessment">
        <Card>
          <CardHeader>
            <CardTitle>Investment Preferences</CardTitle>
            <CardDescription>
              Answer a few questions to help us understand your risk tolerance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AssessmentForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="recommendation">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Recommendation</CardTitle>
            <CardDescription>
              Get a personalized investment portfolio recommendation based on your profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecommendationForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
