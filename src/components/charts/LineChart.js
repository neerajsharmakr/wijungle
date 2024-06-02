
import { Line } from 'react-chartjs-2';
import './chart.css';

const LineChartAlert = ({ data }) => {
    // Preparing data for Line Chart (Alert Timestamps)
    const timestamps = data.map(d => new Date(d.timestamp).toLocaleString());

    const timestampsLineData = {
        labels: timestamps,
        datasets: [{
            label: 'Alerts Over Time',
            data: timestamps.map((_, index) => index + 1),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)'
        }]
    };

    // Set X and Y axis for alert timestamp
    const timestampsLineOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Alert Count'
                },
            }
        }
    };
    return (
        <div className="dashboard-item">
            <h3>Alerts Over Time (Line Chart)</h3>
            <Line data={timestampsLineData} options={timestampsLineOptions} />
        </div>
    )
}

export default LineChartAlert;