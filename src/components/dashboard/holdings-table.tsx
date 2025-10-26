import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { holdingsData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function HoldingsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Holdings</CardTitle>
        <CardDescription>
          A list of your current investments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Shares</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">24h Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdingsData.map((holding) => (
              <TableRow key={holding.id}>
                <TableCell>
                  <div className="font-medium">{holding.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {holding.symbol}
                  </div>
                </TableCell>
                <TableCell className="text-right">{holding.shares.toFixed(2)}</TableCell>
                <TableCell className="text-right">${holding.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                <TableCell
                  className={cn(
                    'text-right',
                    holding.change.startsWith('+')
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  {holding.change}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
