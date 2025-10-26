'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { getStockData, discoverNewStocks } from '@/app/actions';
import type { StockDataOutput } from '@/ai/flows/stock-price-simulator';
import type { StockDiscoveryOutput } from '@/ai/flows/stock-discovery';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ResearchPage() {
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<StockDiscoveryOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDiscover = () => {
    startTransition(async () => {
      setError(null);
      const currentHoldingsResult = await getStockData();
      if ('error' in currentHoldingsResult) {
        setError(currentHoldingsResult.error);
        return;
      }

      const discoveryResult = await discoverNewStocks({ currentHoldings: currentHoldingsResult });
      if ('error' in discoveryResult) {
        setError(discoveryResult.error);
      } else {
        setSuggestions(discoveryResult);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Investment Discovery</CardTitle>
          <CardDescription>
            Discover new investment opportunities based on your current portfolio to help you diversify and reach your goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleDiscover} disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Discover New Stocks
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestions && (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Investment Suggestions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {suggestions.suggestions.map((suggestion, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{suggestion.companyName} ({suggestion.symbol})</CardTitle>
                            <CardDescription>Sector: {suggestion.sector}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                           <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
