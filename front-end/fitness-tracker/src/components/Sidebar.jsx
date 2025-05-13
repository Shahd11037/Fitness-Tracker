export default function Sidebar() {
  return (
    <aside className="w-60 h-full bg-gray-100 dark:bg-gray-900 p-4 hidden md:block">
      <ul className="space-y-4">
        <li>📊 Dashboard</li>
        <li>📁 Projects</li>
        <li>⚙️ Settings</li>
      </ul>
    </aside>
  );
}
