import { Line } from 'react-chartjs-2';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

export default function ProgressChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Progress',
        data: [30, 50, 70, 90],
        fill: false,
        borderColor: '#3b82f6',
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl shadow p-4">
      <Line data={data} />
    </div>
  );
}
