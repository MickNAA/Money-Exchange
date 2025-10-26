import React, { useState, useEffect } from 'react';
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
import { Line } from 'react-chartjs-2';
import ChartControls from './ChartControls';
import { generateHistoricalData } from '../../utils/helpers';
import '../../styles/components/RateChart.css';

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
  const [timeframe, setTimeframe] = useState('30');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    if (!rates || !rates[toCurrency] || !rates[fromCurrency]) return;

    const currentRate = rates[toCurrency] / rates[fromCurrency];
    const historicalData = generateHistoricalData(parseInt(timeframe), currentRate);

    setChartData({
      labels: historicalData.labels,
      datasets: [
        {
          label: `${fromCurrency}/${toCurrency}`,
          data: historicalData.rates,
          borderColor: '#4299e1',
          backgroundColor: 'rgba(66, 153, 225, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: '#4299e1',
          pointBorderColor: 'white',
          pointBorderWidth: 2,
        }
      ]
    });
  }, [fromCurrency, toCurrency, rates, timeframe]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${fromCurrency}/${toCurrency} Exchange Rate History`,
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `Rate: ${context.parsed.y.toFixed(4)}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date'
        },
        grid: {
          display: false
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Exchange Rate'
        },
        ticks: {
          callback: function(value) {
            return value.toFixed(4);
          }
        }
      }
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