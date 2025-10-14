// Option 1: ExchangeRate-API (Free tier: 1,500 requests/month)
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

// Option 2: Fixer.io (Free tier: 100 requests/month)
const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=YOUR_KEY';

// Option 3: CurrencyLayer (Free tier: 1,000 requests/month)
const CURRENCY_LAYER = 'http://api.currencylayer.com/live?access_key=YOUR_KEY';

// API call with error handling
async function fetchRates() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('API Error');
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch rates:', error);
        return null;
    }
}