import { Bar } from 'react-chartjs-2';
import './chart.css';
const BarChartSourceIP = ({ data }) => {
    // Preparing data for Bar Chart (Alerts per Source IP)
    const srcIpCounts = data.reduce((acc, curr) => {
        if (curr.src_ip) {
            acc[curr.src_ip] = (acc[curr.src_ip] || 0) + 1;
        }
        return acc;
    }, {});

    const srcIpCountsBarChart = {
        labels: Object.keys(srcIpCounts),
        datasets: [{
            label: 'Alerts per Source IP',
            data: Object.values(srcIpCounts),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };

    // Set X and Y axis for source IP
    const srcIpbarOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Source IP'
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
            <h3>Alerts per Source IP (Bar Chart)</h3>
            <Bar data={srcIpCountsBarChart} options={srcIpbarOptions} />
        </div>
    )
}

export default BarChartSourceIP;