import React from 'react';

const AmountInput = ({ value, onChange, readOnly = false }) => {
  const handleChange = (e) => {
    if (!readOnly) {
      const newValue = parseFloat(e.target.value) || 0;
      onChange(newValue);
    }
  };

  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      className="amount-input"
      placeholder="Enter amount"
      min="0"
      step="0.01"
      readOnly={readOnly}
    />
  );
};

export default AmountInput;