
'use client';
import { HoldingsTable } from '@/components/dashboard/holdings-table';
import { HoldingsChart } from '@/components/portfolio/holdings-chart';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import type { Holding } from '@/lib/data';
import { getStockData } from '@/app/actions';

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState<Holding[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getStockData();
      if ('error' in data) {
        console.error(data.error);
        setHoldings([]);
      } else {
        setHoldings(data);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-5">
      <Card className="xl:col-span-3">
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <HoldingsChart holdings={holdings} />
      </Card>
      <div className="xl:col-span-2">
        <HoldingsTable holdings={holdings} />
      </div>
    </div>
  );
}
