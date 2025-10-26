import { z } from 'zod';

export const StockDataOutputSchema = z.array(z.object({
    id: z.string(),
    name: z.string(),
    symbol: z.string(),
    value: z.number(),
    change: z.string(),
    shares: z.number(),
}));
export type StockDataOutput = z.infer<typeof StockDataOutputSchema>;
