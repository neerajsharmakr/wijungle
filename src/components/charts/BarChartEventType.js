
import { Bar } from 'react-chartjs-2';
import './chart.css';
const BarChartEventType = ({ data }) => {
    const eventTypeCounts = data.reduce((acc, curr) => {
        acc[curr.event_type] = (acc[curr.event_type] || 0) + 1;
        return acc;
    }, {});

    const eventTypebarData = {
        labels: Object.keys(eventTypeCounts),
        datasets: [{
            label: 'Event Counts by Type',
            data: Object.values(eventTypeCounts),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };

    // Set X and Y axis for event type
    const eventTypebarOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Event Type'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Count'
                },
                min: 0,
                beginAtZero: false,
                ticks: {
                    stepSize: 5
                }
            }
        }
    };
    return (

        <div className="dashboard-item">
            <h3>Event Type Alert (Bar Chart)</h3>
            <Bar data={eventTypebarData} options={eventTypebarOptions} />
        </div>
    )
}

export default BarChartEventType;