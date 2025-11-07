export const generateHistoricalData = (days, baseRate) => {
  const labels = [];
  const rates = [];

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    labels.push(date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }));

    // Generate realistic variation
    const trend = Math.sin(i / 10) * 0.02;
    const noise = (Math.random() - 0.5) * 0.01;
    const rate = baseRate + (baseRate * (trend + noise));
    
    rates.push(parseFloat(rate.toFixed(4)));
  }

  return { labels, rates };
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};