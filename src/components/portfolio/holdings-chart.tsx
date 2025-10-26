
'use client';

import * as React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { holdingsData } from '@/lib/data';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  ChartLegend,
} from '@/components/ui/chart';

const chartConfig = {
  value: {
    label: 'Holdings',
  },
  ...Object.fromEntries(
    holdingsData.map((holding, i) => [
      holding.name, // Use name as the key for consistency
      { label: holding.name, color: `hsl(var(--chart-${i + 1}))` },
    ])
  ),
} satisfies ChartConfig;

export function HoldingsChart() {
  const totalValue = React.useMemo(() => {
    return holdingsData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[400px]"
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Tooltip
            cursor={false}
            content={
                <ChartTooltipContent 
                    hideLabel 
                    nameKey="name"
                    formatter={(value, name, item) => {
                        const percentage = ((value / totalValue) * 100).toFixed(2);
                        return (
                            <div className="flex flex-col">
                                <span>{item.payload.name}</span>
                                <span className="text-muted-foreground">{`$${value.toLocaleString()} (${percentage}%)`}</span>
                            </div>
                        )
                    }}
                />
            }
          />
          <Pie
            data={holdingsData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            strokeWidth={5}
          >
            {holdingsData.map((entry) => (
              <Cell 
                key={`cell-${entry.name}`} 
                fill={chartConfig[entry.name]?.color} 
              />
            ))}
          </Pie>
          <ChartLegend
            content={<ChartLegendContent nameKey="name" />}
            verticalAlign="bottom"
            height={40}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
