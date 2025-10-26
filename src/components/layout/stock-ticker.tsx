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
        const interval = setInterval(fetchData, 30000); 

        return () => clearInterval(interval);
    }, []);

    if (holdings.length === 0) {
        return null;
    }

    const TickerItem = ({ stock }: { stock: Holding }) => (
        <div className="mx-4 flex items-center gap-2 text-sm">
            <span className="font-semibold text-muted-foreground">{stock.symbol}</span>
            <span className={cn(
                "font-medium",
                stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            )}>
                {stock.change}
            </span>
        </div>
    );

    return (
        <div className="relative flex w-full overflow-x-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
                {holdings.map((stock, index) => (
                    <TickerItem key={index} stock={stock} />
                ))}
            </div>
             <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap">
                 {holdings.map((stock, index) => (
                    <TickerItem key={index + holdings.length} stock={stock} />
                ))}
            </div>
        </div>
    );
}
