import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const TopExpensesComponent = ({ transactions }) => {
  // Group amounts by category
  const groupedData = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  // Extract labels and data for the chart
  const labels = Object.keys(groupedData);
  const amounts = Object.values(groupedData);

  // Chart configuration
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Expenses by Category",
        data: amounts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (₹)",
          color: "#666",
        },
      },
      y: {
        title: {
          display: true,
          text: "Category",
          color: "#666",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div style={{ 
      
       width: "100%", 
         backgroundColor: "white", 
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default TopExpensesComponent;
