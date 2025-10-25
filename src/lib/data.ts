export const investmentData = [
  { name: 'Jan', value: 10000 },
  { name: 'Feb', value: 10500 },
  { name: 'Mar', value: 10200 },
  { name: 'Apr', value: 11000 },
  { name: 'May', value: 11500 },
  { name: 'Jun', value: 11300 },
  { name: 'Jul', value: 12000 },
];

export const holdingsData = [
  { id: '1', name: 'Tech Giant Inc.', symbol: 'TGI', value: 4500, change: '+2.5%' },
  { id: '2', name: 'Green Energy Co.', symbol: 'GEC', value: 3000, change: '-1.2%' },
  { id: '3', name: 'HealthCare Solutions', symbol: 'HCS', value: 2500, change: '+5.0%' },
  { id: '4', name: 'Global REIT', symbol: 'GRT', value: 2000, change: '+0.5%' },
];

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
};

export const goalsData: Goal[] = [
  {
    id: '1',
    name: 'Buy a New Car',
    targetAmount: 25000,
    currentAmount: 18000,
    deadline: '2025-12-31',
  },
  {
    id: '2',
    name: 'Vacation to Japan',
    targetAmount: 8000,
    currentAmount: 3500,
    deadline: '2026-06-30',
  },
  {
    id: '3',
    name: 'Emergency Fund',
    targetAmount: 15000,
    currentAmount: 15000,
    deadline: '2024-12-31',
  },
];
