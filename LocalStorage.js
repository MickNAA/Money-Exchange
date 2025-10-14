// Save user preferences
function saveUserPreferences() {
    const preferences = {
        favoritePairs: getFavoritePairs(),
        defaultFrom: fromCurrency.value,
        defaultTo: toCurrency.value,
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('currencyPreferences', JSON.stringify(preferences));
}

// Load user preferences
function loadUserPreferences() {
    const saved = localStorage.getItem('currencyPreferences');
    if (saved) {
        const preferences = JSON.parse(saved);
        fromCurrency.value = preferences.defaultFrom || 'USD';
        toCurrency.value = preferences.defaultTo || 'EUR';
    }
}

// Favorite currency pairs
function addToFavorites(from, to) {
    let favorites = JSON.parse(localStorage.getItem('favoritePairs')) || [];
    const pair = `${from}/${to}`;
    
    if (!favorites.includes(pair)) {
        favorites.push(pair);
        localStorage.setItem('favoritePairs', JSON.stringify(favorites));
        displayFavorites();
    }
}