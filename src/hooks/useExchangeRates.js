import { useState, useCallback } from 'react';
import { fetchExchangeRates } from '../services/currencyAPI';

export const useExchangeRates = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRates = useCallback(async (baseCurrency = 'USD') => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchExchangeRates(baseCurrency);
      setRates(data.rates);
    } catch (err) {
      setError('Failed to fetch exchange rates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { rates, loading, error, fetchRates };
};