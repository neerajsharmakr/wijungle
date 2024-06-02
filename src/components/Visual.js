
import React from 'react';
import 'chart.js/auto';
import './visual.css'; // Import the CSS file
import BarChartEventType from '../components/charts/BarChartEventType'
import BarChartSourceIP from '../components/charts/BarChartSourceIP'
import LineChartAlert from '../components/charts/LineChart'
import PieChart from '../components/charts/PieChart'

const NetworkChartVisual = ({ data }) => {
  return (
    <div className="dashboard-container">
      <BarChartEventType data={data} />
      <LineChartAlert data={data} />
      <BarChartSourceIP data={data} />
      <PieChart data={data} />
    </div>
  );
}

export default NetworkChartVisual;
