// Include Chart.js in your HTML
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

let rateChart;

function initializeChart() {
    const ctx = document.getElementById('rateChart').getContext('2d');
    
    rateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Will be populated with dates
            datasets: [{
                label: 'Exchange Rate',
                data: [], // Will be populated with rates
                borderColor: '#4299e1',
                backgroundColor: 'rgba(66, 153, 225, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Rate'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Exchange Rate History'
                }
            }
        }
    });
}

// Update chart with historical data
function updateChart(historicalData) {
    const labels = historicalData.map(item => item.date);
    const rates = historicalData.map(item => item.rate);
    
    rateChart.data.labels = labels;
    rateChart.data.datasets[0].data = rates;
    rateChart.update();
}

// Initialize chart on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeChart();
    // Load sample data or fetch from API
    loadHistoricalData();
});