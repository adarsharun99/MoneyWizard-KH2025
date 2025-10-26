
'use client';

import * as React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import type { Holding } from '@/lib/data';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  ChartLegend,
} from '@/components/ui/chart';
import { Skeleton } from '../ui/skeleton';

interface HoldingsChartProps {
  holdings: Holding[] | null;
}

const generateChartConfig = (holdings: Holding[] | null): ChartConfig => {
    if (!holdings) return { value: { label: 'Holdings' } };
    
    const config: ChartConfig = {
      value: {
        label: 'Holdings',
      },
      ...Object.fromEntries(
        holdings.map((holding, i) => [
          holding.name,
          { label: holding.name, color: `hsl(var(--chart-${i + 1}))` },
        ])
      ),
    };
    return config;
};

export function HoldingsChart({ holdings }: HoldingsChartProps) {
  
  const chartConfig = React.useMemo(() => generateChartConfig(holdings), [holdings]);

  const totalValue = React.useMemo(() => {
    if (!holdings) return 0;
    return holdings.reduce((acc, curr) => acc + curr.value, 0);
  }, [holdings]);

  if (!holdings) {
    return (
        <div className="flex justify-center items-center h-[300px] w-full">
            <Skeleton className="h-[250px] w-[250px] rounded-full" />
        </div>
    )
  }

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
            data={holdings}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            strokeWidth={5}
          >
            {holdings.map((entry) => (
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
