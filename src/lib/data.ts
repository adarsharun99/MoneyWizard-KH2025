
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
  { id: '1', name: 'Alphabet Inc Class C', symbol: 'GOOG', value: 5250.75, change: '+1.82%' },
  { id: '2', name: 'NextEra Energy Inc', symbol: 'NEE', value: 3100.20, change: '+0.31%' },
  { id: '3', name: 'Eli Lilly And Co', symbol: 'LLY', value: 2800.50, change: '-0.45%' },
  { id: '4', name: 'Prologis Inc', symbol: 'PLD', value: 1850.90, change: '-1.10%' },
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
