import React, { useState, useEffect } from 'react';
import CurrencySelector from './CurrencySelector';
import AmountInput from './AmountInput';
import SwapButton from './SwapButton';
import '../../styles/components/CurrencyConverter.css';

const CurrencyConverter = ({ rates, loading, selectedPair, onPairChange }) => {
  // LOCAL state: Only this component cares about amount
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  // EFFECT: Calculate conversion when inputs change
  useEffect(() => {
    if (rates && rates[selectedPair.to] && rates[selectedPair.from]) {
      const rate = rates[selectedPair.to] / rates[selectedPair.from];
      setConvertedAmount((amount * rate).toFixed(2));
    }
  }, [amount, rates, selectedPair]);

  // EVENT HANDLER: Swap currencies
  const handleSwap = () => {
    onPairChange({
      from: selectedPair.to,
      to: selectedPair.from
    });
    setAmount(parseFloat(convertedAmount) || 0);
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      
      <div className="converter-form">
        {/* FROM Currency */}
        <div className="input-group">
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

        {/* SWAP Button */}
        <SwapButton onClick={handleSwap} />

        {/* TO Currency */}
        <div className="input-group">
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

      {/* Display Exchange Rate */}
      <div className="rate-display">
        <p>1 {selectedPair.from} = {getRate()} {selectedPair.to}</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;