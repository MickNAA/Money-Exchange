import React from 'react';
import { POPULAR_CURRENCIES } from '../../utils/constants';

const CurrencySelector = ({ value, onChange }) => {
  return (
    <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="currency-select"
    >
      {POPULAR_CURRENCIES.map(currency => (
        <option key={currency.code} value={currency.code}>
          {currency.symbol} {currency.code} - {currency.name}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;