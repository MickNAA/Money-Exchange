import React from 'react';

const ChartControls = ({ timeframe, onTimeframeChange }) => {
  const timeframes = [
    { value: '7', label: '7D' },
    { value: '30', label: '30D' },
    { value: '90', label: '90D' },
    { value: '365', label: '1Y' }
  ];

  return (
    <div className="chart-controls">
      <h3>Rate History</h3>
      <div className="timeframe-buttons">
        {timeframes.map(tf => (
          <button
            key={tf.value}
            className={`timeframe-btn ${timeframe === tf.value ? 'active' : ''}`}
            onClick={() => onTimeframeChange(tf.value)}
          >
            {tf.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChartControls;