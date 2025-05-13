export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <ThemeToggle />
    </nav>
  );
}
