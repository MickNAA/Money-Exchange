import axios from 'axios';
import { API_CONFIG } from '../utils/constants';

// In-memory cache
const cache = new Map();

export const fetchExchangeRates = async (baseCurrency = 'USD') => {
  const cacheKey = baseCurrency;
  const now = Date.now();

  // Check cache first
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (now - timestamp < API_CONFIG.CACHE_DURATION) {
      console.log('Returning cached data');
      return data;
    }
  }

  try {
    console.log(`Fetching rates for ${baseCurrency}`);
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}${baseCurrency}`,
      { timeout: API_CONFIG.REQUEST_TIMEOUT }
    );

    const data = response.data;

    // Cache the response
    cache.set(cacheKey, {
      data,
      timestamp: now
    });

    return data;
  } catch (error) {
    console.error('API Error:', error);

    // Return stale cache if available
    if (cache.has(cacheKey)) {
      console.log('Returning stale cache due to error');
      const { data } = cache.get(cacheKey);
      return data;
    }

    throw new Error('Failed to fetch exchange rates');
  }
};

export const convertCurrency = async (from, to, amount) => {
  const rates = await fetchExchangeRates(from);
  const rate = rates.rates[to];
  return {
    from,
    to,
    amount,
    rate,
    result: amount * rate
  };
};