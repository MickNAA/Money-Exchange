import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import CurrencyConverter from './components/converter/CurrencyConverter';
import RateChart from './components/charts/RateChart';
import FavoritePairs from './components/dashboard/FavoritePairs';
import { useExchangeRates } from './hooks/useExchangeRates';
import './styles/App.css';

function App() {
  // State: What currency pair user is viewing
  const [selectedPair, setSelectedPair] = useState({ 
    from: 'USD', 
    to: 'EUR' 
  });
  
  // Custom hook: Fetch exchange rates
  const { rates, loading, error } = useExchangeRates(selectedPair.from);

  return (
    <div className="App">
      {/* Navigation */}
      <Header />
      
      {/* Main Feature: Currency Converter */}
      <main>
        <section>
          <CurrencyConverter 
            rates={rates}
            loading={loading}
            selectedPair={selectedPair}
            onPairChange={setSelectedPair}
          />
        </section>

        {/* Secondary Feature: Rate History */}
        <section>
          <RateChart 
            fromCurrency={selectedPair.from}
            toCurrency={selectedPair.to}
            rates={rates}
          />
        </section>

        {/* User Feature: Favorites */}
        <section>
          <FavoritePairs 
            rates={rates}
            onPairSelect={setSelectedPair}
          />
        </section>
      </main>
    </div>
  );
}

export default App;