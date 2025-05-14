import { Line } from 'react-chartjs-2';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

export default function ProgressChart() {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Workouts Completed',
        data: [3, 4, 5, 4, 6, 7],
        fill: true,
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: '#22c55e',
        tension: 0.4,
      },
      {
        label: 'Weight (kg)',
        data: [80, 79, 78.5, 78, 77, 76.5],
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.4,
        borderDash: [5, 5],
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Progress Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Workouts'
        }
      },
      y1: {
        beginAtZero: false,
        position: 'right',
        title: {
          display: true,
          text: 'Weight (kg)'
        },
        grid: {
          drawOnChartArea: false,
        },
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Progress Tracker</h2>
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
} 