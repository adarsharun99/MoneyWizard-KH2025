'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { goalsData, type Goal } from '@/lib/data';
import { GoalCard } from '@/components/goals/goal-card';
import { AddGoalDialog } from '@/components/goals/add-goal-dialog';

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(goalsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddGoal = (newGoal: Omit<Goal, 'id'>) => {
    setGoals((prev) => [
      ...prev,
      { ...newGoal, id: String(Date.now()) },
    ]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Financial Goals</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
      <AddGoalDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddGoal={handleAddGoal}
      />
    </div>
  );
}
