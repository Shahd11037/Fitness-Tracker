import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 rounded-xl shadow px-6 py-4 flex justify-between items-center mb-6">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <span className="ml-4 text-sm bg-green-100 text-green-800 py-1 px-3 rounded-full">Beta</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="rounded-lg bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
          <span className="text-sm font-bold">JD</span>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
