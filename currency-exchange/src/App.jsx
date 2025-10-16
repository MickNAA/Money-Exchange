import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Loading from './components/common/Loading';
import ErrorMessage from './components/common/ErrorMessage';
import CurrencyConverter from './components/converter/CurrencyConverter';
import RateChart from './components/charts/RateChart';
import FavoritePairs from './components/dashboard/FavoritePairs';
import { useExchangeRates } from './hooks/useExchangeRates';
import './styles/App.css';

function App() {
  const [selectedPair, setSelectedPair] = useState({ 
    from: 'USD', 
    to: 'EUR' 
  });
  
  const { rates, loading, error, fetchRates } = useExchangeRates();

  useEffect(() => {
    fetchRates(selectedPair.from);
  }, [selectedPair.from, fetchRates]);

  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        {error && <ErrorMessage message={error} />}
        
        <section className="converter-section">
          <CurrencyConverter 
            rates={rates}
            loading={loading}
            selectedPair={selectedPair}
            onPairChange={setSelectedPair}
          />
        </section>

        {!loading && rates && (
          <>
            <section className="chart-section">
              <RateChart 
                fromCurrency={selectedPair.from}
                toCurrency={selectedPair.to}
                rates={rates}
              />
            </section>

            <section className="favorites-section">
              <FavoritePairs 
                rates={rates}
                onPairSelect={setSelectedPair}
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;