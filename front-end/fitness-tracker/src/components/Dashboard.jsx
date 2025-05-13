import Navbar from './Navbar';
import Sidebar from './Sidebar';
import StatsCard from './StatsCard';
import ProgressChart from './ProgressChart';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar />
      <main className="flex-1 p-4 overflow-auto">
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <StatsCard title="Tasks Completed" value="24" />
          <StatsCard title="Hours Studied" value="12h" />
          <StatsCard title="Streak" value="6 days" />
        </div>
        <ProgressChart />
      </main>
    </div>
  );
} 