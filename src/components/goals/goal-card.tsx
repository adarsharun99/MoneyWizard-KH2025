import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Goal } from '@/lib/data';
import { format, differenceInDays } from 'date-fns';

type GoalCardProps = {
  goal: Goal;
};

export function GoalCard({ goal }: GoalCardProps) {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const daysLeft = differenceInDays(new Date(goal.deadline), new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle>{goal.name}</CardTitle>
        <CardDescription>
          Deadline: {format(new Date(goal.deadline), 'MMMM d, yyyy')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Progress value={progress} />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Current</span>
          <span className="font-medium">
            ${goal.currentAmount.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Target</span>
          <span className="font-medium">
            ${goal.targetAmount.toLocaleString()}
          </span>
        </div>
        {daysLeft > 0 && (
            <p className="text-xs text-center text-muted-foreground">{daysLeft} days remaining</p>
        )}
         {daysLeft <= 0 && progress < 100 && (
            <p className="text-xs text-center text-red-500">This goal is overdue.</p>
        )}
        {progress >= 100 && (
            <p className="text-xs text-center text-green-500">Goal achieved! 🎉</p>
        )}
      </CardContent>
    </Card>
  );
}
