
'use client';

import * as React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { holdingsData } from '@/lib/data';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  value: {
    label: 'Holdings',
  },
  ...Object.fromEntries(
    holdingsData.map((holding, i) => [
      holding.symbol,
      { label: holding.name, color: `hsl(var(--chart-${i + 1}))` },
    ])
  ),
} satisfies ChartConfig;

const COLORS = chartConfig
  ? Object.values(chartConfig)
      .map((entry) => (entry.color ? entry.color : null))
      .filter((color): color is string => color !== null)
      .slice(1) // remove first "Holdings" color
  : [];

export function HoldingsChart() {
  const totalValue = React.useMemo(() => {
    return holdingsData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="name" />}
          />
          <Pie
            data={holdingsData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            strokeWidth={5}
          >
            {holdingsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
