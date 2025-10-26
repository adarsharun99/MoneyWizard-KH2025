'use client';

import { getStockData } from "@/app/actions";
import type { Holding } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function StockTicker() {
    const [holdings, setHoldings] = useState<Holding[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getStockData();
            if ('error' in data) {
                console.error(data.error);
                setHoldings([]);
            } else {
                setHoldings(data);
            }
        };

        fetchData();
        // Fetch data every 30 seconds to simulate live updates
        const interval = setInterval(fetchData, 30000); 

        return () => clearInterval(interval);
    }, []);

    if (holdings.length === 0) {
        return null; // Don't render anything if there's no data
    }

    // Duplicate the array for a seamless loop
    const tickerItems = [...holdings, ...holdings];

    return (
        <div className="relative flex overflow-x-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
                {tickerItems.map((stock, index) => (
                    <div key={index} className="mx-4 flex items-center gap-2 text-sm">
                        <span className="font-semibold text-muted-foreground">{stock.symbol}</span>
                        <span className={cn(
                            "font-medium",
                            stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        )}>
                            {stock.change}
                        </span>
                    </div>
                ))}
            </div>
             <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap">
                {tickerItems.map((stock, index) => (
                    <div key={index} className="mx-4 flex items-center gap-2 text-sm">
                        <span className="font-semibold text-muted-foreground">{stock.symbol}</span>
                        <span className={cn(
                            "font-medium",
                            stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        )}>
                            {stock.change}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
