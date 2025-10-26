
export const investmentData = [
  { name: 'Jan', value: 10000 },
  { name: 'Feb', value: 10500 },
  { name: 'Mar', value: 10200 },
  { name: 'Apr', value: 11000 },
  { name: 'May', value: 11500 },
  { name: 'Jun', value: 11300 },
  { name: 'Jul', value: 12000 },
];

export type Holding = {
  id: string;
  name: string;
  symbol: string;
  value: number;
  change: string;
  shares: number;
};

export const holdingsData: Holding[] = [
  { id: '1', name: 'Apple Inc.', symbol: 'AAPL', value: 8650.40, change: '+1.25%', shares: 40.00 },
  { id: '2', name: 'Microsoft Corp.', symbol: 'MSFT', value: 12400.80, change: '+0.75%', shares: 30.00 },
  { id: '3', name: 'Amazon.com, Inc.', symbol: 'AMZN', value: 9200.00, change: '-0.50%', shares: 50.00 },
  { id: '4', name: 'NVIDIA Corp.', symbol: 'NVDA', value: 15300.25, change: '+2.80%', shares: 125.00 },
  { id: '5', name: 'Tesla, Inc.', symbol: 'TSLA', value: 7300.60, change: '-2.10%', shares: 42.00 },
  { id: '6', name: 'Alphabet Inc. Class A', symbol: 'GOOGL', value: 10500.00, change: '+1.15%', shares: 60.00 },
  { id: '7', name: 'Berkshire Hathaway B', symbol: 'BRK.B', value: 6150.90, change: '+0.20%', shares: 15.00 },
  { id: '8', name: 'UnitedHealth Group', symbol: 'UNH', value: 4900.75, change: '-0.85%', shares: 10.00 },
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
