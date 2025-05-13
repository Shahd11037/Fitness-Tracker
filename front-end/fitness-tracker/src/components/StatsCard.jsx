export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl shadow p-4 w-full">
      <h2 className="text-sm">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}