import { useState, useCallback } from 'react';

export const useCache = (duration = 5 * 60 * 1000) => { 
  const [cache, setCache] = useState(new Map());

  const getCachedData = useCallback((key) => {
    const cached = cache.get(key);
    if (!cached) return null;
    //expire
    const now = Date.now();
    if (now - cached.timestamp > duration) {
      cache.delete(key);
      return null; 
    }

    return cached.data;
  }, [cache, duration]);

  const setCachedData = useCallback((key, data) => {
    setCache(prevCache => {
      const newCache = new Map(prevCache);
      newCache.set(key, {
        data,
        timestamp: Date.now()
      });
      return newCache;
    });
  }, []);

  return { getCachedData, setCachedData };
};