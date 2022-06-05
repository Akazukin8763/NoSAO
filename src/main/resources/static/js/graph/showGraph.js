// https://www.chartjs.org/docs/latest/
export function showAbilityGraph(target, attack = 0, health = 0, defense = 0, reaction = 0, agile = 0) {
    var __max = Math.max(attack, health, defense, reaction, agile);
    __max = Math.max(__max, 100); // 最低 100
    __max = Math.min(__max, 10000); // 最高 10000

    new Chart(target, {
        type: 'radar',
        data: {
            labels: [
                'Attack',
                'Health',
                'Defense',
                'Reaction',
                'Agile',
            ],
            datasets: [{
                label: 'Ability',
                data: [attack, health, defense, reaction, agile],
                fill: true,
                backgroundColor: 'rgba(135, 220, 233, 0.2)',
                borderColor: 'rgba(135, 220, 233, 0.8)',
                pointBackgroundColor: 'rgba(135, 220, 233, 0.8)',
                pointBorderColor: '#FFFFFF',
                pointHoverBackgroundColor: '#FFFFFF',
                pointHoverBorderColor: 'rgb(30, 132, 255)',
                pointLabelFontColor: '#FFFFFF',
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
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scale: {
                min: 0,
                max: __max,
            },
            scales: {
                r: {
                    pointLabels: {
                        color: '#FFFFFF'
                    },
                    ticks: {
                        backdropColor: 'rgba(0, 0, 0, 0)',
                        color: 'rgba(255, 255, 255, 0.5)',
                    }
                }
            },
        },
    });
}