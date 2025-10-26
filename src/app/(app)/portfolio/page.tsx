import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RecommendationForm } from '@/components/portfolio/recommendation-form';

export default function PortfolioPage() {
  return (
    <div className="max-w-2xl mx-auto">
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
    </div>
  );
}
