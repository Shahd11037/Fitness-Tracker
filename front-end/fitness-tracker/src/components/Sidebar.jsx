export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h1 className="text-xl font-bold text-green-500">Fitness Tracker</h1>
      </div>
      <nav className="px-4 py-2">
        <ul className="space-y-2">
          <li className="p-2 flex items-center rounded-lg bg-green-50 dark:bg-gray-700 text-green-600 dark:text-green-400 font-medium">
            <span className="mr-3">📊</span>
            <span>Dashboard</span>
          </li>
          <li className="p-2 flex items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
            <span className="mr-3">💪</span>
            <span>Workouts</span>
          </li>
          <li className="p-2 flex items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
            <span className="mr-3">🍎</span>
            <span>Nutrition</span>
          </li>
          <li className="p-2 flex items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
            <span className="mr-3">📅</span>
            <span>Schedule</span>
          </li>
          <li className="p-2 flex items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
            <span className="mr-3">⚙️</span>
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
