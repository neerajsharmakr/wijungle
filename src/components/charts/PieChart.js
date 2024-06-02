import { Pie } from 'react-chartjs-2';
import './chart.css';

const PieChart = ({ data }) => {
    // Preparing data for Pie Chart (Alert Severities)
    const severityCounts = data.reduce((acc, curr) => {
        const severity = curr.alert?.severity;
        console.log(severity)
        if (severity !== undefined) {
            acc[severity] = (acc[severity] || 0) + 1;
        }
        return acc;
    }, {});

    const severityPieData = {
        labels: Object.keys(severityCounts),
        datasets: [{
            data: Object.values(severityCounts),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    const severityPieOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    };

    return (
        <div className="dashboard-item">
            <h3>Alert Severities (Pie Chart)</h3>
            <div className="pie-chart-container">
                <Pie data={severityPieData} options={severityPieOptions} />
            </div>
        </div>
    )
}

export default PieChart;