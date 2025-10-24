import React, { useState, useEffect } from 'react';
import CurrencySelector from './CurrencySelector';
import AmountInput from './AmountInput';
import SwapButton from './SwapButton';
import Loading from '../common/Loading';
import '../../styles/components/CurrencyConverter.css';

const CurrencyConverter = ({ rates, loading, selectedPair, onPairChange }) => {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    if (rates && rates[selectedPair.to] && rates[selectedPair.from]) {
      const rate = rates[selectedPair.to] / rates[selectedPair.from];
      setConvertedAmount((amount * rate).toFixed(2));
    }
  }, [amount, rates, selectedPair]);

  const handleSwap = () => {
    onPairChange({
      from: selectedPair.to,
      to: selectedPair.from
    });
    setAmount(parseFloat(convertedAmount) || 0);
  };

  const getExchangeRate = () => {
    if (!rates || !rates[selectedPair.to] || !rates[selectedPair.from]) return 0;
    return (rates[selectedPair.to] / rates[selectedPair.from]).toFixed(4);
  };

  if (loading) return <Loading message="Loading exchange rates..." />;

  return (
    <div className="currency-converter">
      <h2 className="converter-title">Currency Converter</h2>
      
      <div className="converter-card">
        <div className="converter-grid">
          <div className="currency-input-group">
            <label>From</label>
            <AmountInput 
              value={amount}
              onChange={setAmount}
            />
            <CurrencySelector
              value={selectedPair.from}
              onChange={(value) => onPairChange({ ...selectedPair, from: value })}
            />
          </div>

          <SwapButton onClick={handleSwap} />

          <div className="currency-input-group">
            <label>To</label>
            <AmountInput 
              value={convertedAmount}
              readOnly={true}
            />
            <CurrencySelector
              value={selectedPair.to}
              onChange={(value) => onPairChange({ ...selectedPair, to: value })}
            />
          </div>
        </div>

        <div className="exchange-rate-display">
          <p className="rate-text">
            1 {selectedPair.from} = {getExchangeRate()} {selectedPair.to}
          </p>
          <p className="update-time">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;