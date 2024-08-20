import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ inputData, backgroundColor }) => {
  const data = {
    labels: ["Work", "Personal", "Learning", "Health", "Social"],
    datasets: [
      {
        label: "Task Distribution",
        data: inputData,
        backgroundColor,
        borderColor: [
          "rgba(74, 144, 226, 1)", // Work (blue)
          "rgba(245, 166, 35, 1)", // Personal (orange)
          "rgba(248, 231, 28, 1)", // Learning (yellow)
          "rgba(126, 211, 33, 1)", // Health (green)
          "rgba(189, 16, 224, 1)", // Social (purple)
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#333", // Legend text color
        },
      },
      tooltip: {
        backgroundColor: "#fff", // Tooltip background color
        bodyColor: "#333", // Tooltip text color
        borderColor: "#ccc",
        borderWidth: 1,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
