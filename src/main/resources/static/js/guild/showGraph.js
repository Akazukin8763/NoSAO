// https://www.chartjs.org/docs/latest/
export function showGraph(target, levels, nums) {
    new Chart(target, {
        type: 'bar',
        data: {
            labels: levels,
            datasets: [{
                label: 'Guild',
                data: nums,
                fill: true,

                backgroundColor: function(context) { return context.dataIndex % 2 ? 'rgba(135, 220, 233, 0.4)' : 'rgba(135, 220, 233, 0.2)'; },
                borderColor: 'rgba(135, 220, 233, 0.8)',

                borderWidth: 3,
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: '#FFFFFF',
                    }
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: 'rgba(255, 255, 255, 1)',
                    }
                },
                y: {
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                    }
                },
            },
        },
    });
}