// Cache rates for 5 minutes to reduce API calls
const CACHE_DURATION = 5 * 60 * 1000;

function getCachedRates() {
    const cached = localStorage.getItem('cachedRates');
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return data;
        }
    }
    return null;
}

function setCachedRates(data) {
    const cacheData = {
        data: data,
        timestamp: Date.now()
    };
    localStorage.setItem('cachedRates', JSON.stringify(cacheData));
}