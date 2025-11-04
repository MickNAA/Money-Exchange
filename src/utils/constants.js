export const POPULAR_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' }
];

export const POPULAR_PAIRS = [
  'USD/EUR',
  'USD/GBP',
  'USD/JPY',
  'EUR/GBP',
  'EUR/JPY',
  'GBP/USD'
];

export const API_CONFIG = {
  BASE_URL: 'https://api.exchangerate-api.com/v4/latest/',
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  REQUEST_TIMEOUT: 10000 // 10 seconds
};

export const CHART_COLORS = {
  primary: '#4299e1',
  secondary: '#48bb78',
  danger: '#f56565'
};