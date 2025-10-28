import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import ChartControls from './ChartControls';
import { generateHistoricalData } from '../../utils/helpers';
import '../../styles/components/RateChart.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RateChart = ({ fromCurrency, toCurrency, rates }) => {
  const [timeframe, setTimeframe] = useState('30'); // Days to show
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // Generate chart data when inputs change
  useEffect(() => {
    if (!rates) return;

    const currentRate = rates[toCurrency] / rates[fromCurrency];
    const historicalData = generateHistoricalData(
      parseInt(timeframe), 
      currentRate
    );

    setChartData({
      labels: historicalData.labels,
      datasets: [{
        label: `${fromCurrency}/${toCurrency}`,
        data: historicalData.rates,
        borderColor: '#4299e1',
        backgroundColor: 'rgba(66, 153, 225, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    });
  }, [fromCurrency, toCurrency, rates, timeframe]);

  // Chart configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `${fromCurrency}/${toCurrency} Rate History`
      }
    },
    scales: {
      x: { display: true, title: { display: true, text: 'Date' } },
      y: { display: true, title: { display: true, text: 'Rate' } }
    }
  };

  return (
    <div className="rate-chart-container">
      <ChartControls 
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />
      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RateChart;