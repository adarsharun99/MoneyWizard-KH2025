
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Target } from "lucide-react";
import { InvestmentChart } from "@/components/dashboard/investment-chart";
import { HoldingsTable } from "@/components/dashboard/holdings-table";
import { useEffect, useState } from "react";
import type { Holding } from "@/lib/data";
import { getStockData } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [holdings, setHoldings] = useState<Holding[] | null>(null);
  const [totals, setTotals] = useState({
    totalValue: 0,
    totalGainLoss: 0,
    monthlyChange: 0.20, // Static for now
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getStockData();
      if ('error' in data) {
        console.error(data.error);
        setHoldings([]); // Set to empty array on error
      } else {
        setHoldings(data);
        // Calculate totals
        const totalValue = data.reduce((acc, h) => acc + h.value, 0);
        const initialInvestment = 10000; // Example initial investment
        const totalGainLoss = totalValue - initialInvestment;
        setTotals(prev => ({ ...prev, totalValue, totalGainLoss }));
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Investments
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {holdings ? (
              <>
                <div className="text-2xl font-bold">${totals.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <p className="text-xs text-muted-foreground">
                  +{totals.monthlyChange * 100}% from last month
                </p>
              </>
            ) : (
                <>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Portfolio Gain/Loss
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {holdings ? (
              <>
                <div className={`text-2xl font-bold ${totals.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totals.totalGainLoss >= 0 ? '+' : ''}${totals.totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Since initial investment
                </p>
              </>
            ) : (
                <>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Goal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">New Car</div>
            <p className="text-xs text-muted-foreground">
              $7,000.00 away from your goal
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Investment Performance</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <InvestmentChart />
          </CardContent>
        </Card>
        <HoldingsTable holdings={holdings} />
      </div>
    </div>
  );
}
