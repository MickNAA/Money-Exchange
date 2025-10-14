// API Configuration
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/';
let exchangeRates = {};

// DOM Elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const resultInput = document.getElementById('result');
const swapBtn = document.getElementById('swapBtn');
const exchangeRateDisplay = document.getElementById('exchangeRate');
const timestampDisplay = document.getElementById('timestamp');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadExchangeRates();
    setupEventListeners();
    updateTimestamp();
});

// Event Listeners
function setupEventListeners() {
    amountInput.addEventListener('input', convertCurrency);
    fromCurrency.addEventListener('change', convertCurrency);
    toCurrency.addEventListener('change', convertCurrency);
    swapBtn.addEventListener('click', swapCurrencies);
}

// Fetch Exchange Rates
async function loadExchangeRates(baseCurrency = 'USD') {
    try {
        showLoading();
        const response = await fetch(`${API_BASE_URL}${baseCurrency}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }
        
        const data = await response.json();
        exchangeRates = data.rates;
        
        hideLoading();
        convertCurrency();
        
    } catch (error) {
        console.error('Error fetching rates:', error);
        showError('Failed to load exchange rates');
    }
}

// Convert Currency
function convertCurrency() {
    const amount = parseFloat(amountInput.value) || 0;
    const from = fromCurrency.value;
    const to = toCurrency.value;
    
    if (exchangeRates[to] && exchangeRates[from]) {
        // Convert via USD (base currency)
        const usdAmount = amount / exchangeRates[from];
        const convertedAmount = usdAmount * exchangeRates[to];
        
        resultInput.value = convertedAmount.toFixed(2);
        
        // Update rate display
        const rate = (exchangeRates[to] / exchangeRates[from]).toFixed(4);
        exchangeRateDisplay.textContent = `1 ${from} = ${rate} ${to}`;
        
    } else {
        resultInput.value = 'Error';
    }
}

// Swap Currencies
function swapCurrencies() {
    const tempValue = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempValue;
    
    // Also swap the amounts
    const tempAmount = amountInput.value;
    amountInput.value = resultInput.value;
    resultInput.value = tempAmount;
    
    convertCurrency();
}

// Utility Functions
function updateTimestamp() {
    const now = new Date();
    timestampDisplay.textContent = now.toLocaleString();
}

function showLoading() {
    resultInput.value = 'Loading...';
}

function hideLoading() {
    // Loading complete
}

function showError(message) {
    resultInput.value = 'Error';
    alert(message); // Replace with better error handling
}

// Auto-refresh rates every 60 seconds
setInterval(() => {
    loadExchangeRates(fromCurrency.value);
    updateTimestamp();
}, 60000);