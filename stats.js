document.addEventListener("DOMContentLoaded", function () {
    // Function to generate realistic-looking data with some trends
    function generateRealisticData(start, increment, variability, length) {
        let data = [start];
        for (let i = 1; i < length; i++) {
            let change = increment + (Math.random() - 0.5) * variability;
            let newValue = Math.max(0, data[i - 1] + change); // Ensure non-negative
            data.push(newValue);
        }
        return data;
    }

    const chartColors = [
        { background: "rgba(54, 162, 235, 0.4)", border: "rgba(54, 162, 235, 1)" }, // Blue
        { background: "rgba(255, 99, 132, 0.4)", border: "rgba(255, 99, 132, 1)" },   // Red
        { background: "rgba(255, 206, 86, 0.4)", border: "rgba(255, 206, 86, 1)" },   // Yellow
        { background: "rgba(75, 192, 192, 0.4)", border: "rgba(75, 192, 192, 1)" },   // Green
        { background: "rgba(153, 102, 255, 0.4)", border: "rgba(153, 102, 255, 1)" }, // Purple
        { background: "rgba(255, 159, 64, 0.4)", border: "rgba(255, 159, 64, 1)" },   // Orange
        { background: "rgba(100, 50, 200, 0.4)", border: "rgba(100, 50, 200, 1)" },   // Indigo
        { background: "rgba(200, 50, 50, 0.4)", border: "rgba(200, 50, 50, 1)" }     // Crimson
    ];

    const statsData = [
        {
            id: "chart1",
            label: "Total XP Earned",
            data: generateRealisticData(100, 300, 200, 12),
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        {
            id: "chart2",
            label: "Courses Completed",
            data: generateRealisticData(0, 1, 0.5, 12), // Start at 0, increment by 1, variability 0.5
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        {
            id: "chart3",
            label: "Current Streak (Days)",
            data: generateRealisticData(0, 2, 1, 12),
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        {
            id: "chart4",
            label: "Quiz Scores",
            data: generateRealisticData(60, 5, 10, 12),
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        {
            id: "chart5",
            label: "Leaderboard Rank",
            data: generateRealisticData(60, -3, 7, 12).map(x => Math.max(1, x)).sort((a, b) => a - b).reverse(), // Ensure rank is at least 1, sort and reverse
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        {
            id: "chart6",
            label: "Followers & Following",
            data: generateRealisticData(5, 5, 3, 12),
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        {
            id: "chart7",
            label: "Friend Streaks",
            data: generateRealisticData(0, 0.5, 0.3, 12),
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        {
            id: "chart8",
            label: "Top 3 Finishes",
            data: generateRealisticData(0, 0.3, 0.2, 12),
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
    ];

    statsData.forEach((stat, index) => {
        const color = chartColors[index % chartColors.length];

        new Chart(document.getElementById(stat.id), {
            type: "line",
            data: {
                labels: stat.labels,
                datasets: [{
                    label: stat.label,
                    data: stat.data,
                    backgroundColor: color.background,
                    borderColor: color.border,
                    borderWidth: 2,
                    pointRadius: 3,         // Smaller points
                    pointHoverRadius: 5,    // Slightly larger on hover
                    tension: 0.3,          // Slightly smoother curves
                    fill: true            // Fill the area under the line
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            font: { size: 12 },    // Smaller legend font
                            boxWidth: 15,       // Smaller legend boxes
                            padding: 10          // Adjust legend padding
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false, // Don't always start at zero
                        grid: { color: "rgba(200, 200, 200, 0.1)" }, // Fainter grid
                        ticks: { font: { size: 10 } }                // Smaller tick font
                    },
                    x: {
                        grid: { color: "rgba(200, 200, 200, 0.1)" }, // Fainter grid
                        ticks: { font: { size: 10 } }                // Smaller tick font
                    }
                }
            }
        });
    });
});
 