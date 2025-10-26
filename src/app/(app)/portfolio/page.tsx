
import { HoldingsTable } from '@/components/dashboard/holdings-table';
import { HoldingsChart } from '@/components/portfolio/holdings-chart';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function PortfolioPage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-5">
      <Card className="xl:col-span-3">
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <HoldingsChart />
      </Card>
      <div className="xl:col-span-2">
        <HoldingsTable />
      </div>
    </div>
  );
}
