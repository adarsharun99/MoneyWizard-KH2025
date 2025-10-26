
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

export type Lesson = {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'unlocked' | 'locked';
};

export const stockMarketLessons: Lesson[] = [
    { id: 1, title: 'Intro to Stocks', description: 'Learn the basics of what a stock represents and why companies issue them.', status: 'completed' },
    { id: 2, title: 'The Stock Market', description: 'Understand how the stock market works, including exchanges and indices.', status: 'completed' },
    { id: 3, title: 'Your First Investment', description: 'A step-by-step guide to buying your first stock.', status: 'unlocked' },
    { id: 4, title: 'Reading Stock Charts', description: 'An introduction to technical analysis and chart patterns.', status: 'locked' },
    { id: 5, title: 'Diversification & ETFs', description: 'Learn why you shouldn\'t put all your eggs in one basket.', status: 'locked' },
    { id: 6, title: 'Advanced Strategies', description: 'Explore concepts like options and short-selling.', status: 'locked' },
];
