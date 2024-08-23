"use client";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Chart = ({ data }) => {
  const chartData = {
    labels: data.labels, // e.g., ['Food', 'Rent', 'Entertainment', 'Other']
    datasets: [
      {
        label: 'Income',
        data: data.incomeValues, // e.g., [1500, 500, 300, 200]
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Spending',
        data: data.spendingValues, // e.g., [500, 1000, 200, 300]
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      
    ],
  };

  return (
    <div className="mt-4 mx-auto">
      <h2 className="text-xl font-semibold">Income and Spending Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Chart;
