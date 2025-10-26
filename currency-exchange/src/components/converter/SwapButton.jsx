import React from 'react';

const SwapButton = ({ onClick }) => {
  return (
    <button 
      className="swap-button"
      onClick={onClick}
      title="Swap currencies"
    >
      ⇄
    </button>
  );
};

export default SwapButton;