import { FaArrowUp } from 'react-icons/fa';
export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 w-full hover:shadow-md transition-shadow">
      <h2 className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</h2>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      <div className="mt-2 flex items-center text-green-500 text-xs">
        {/* <svg className="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2.5L9 6.5H7.5V9.5H4.5V6.5H3L6 2.5Z" fill="currentColor" />
        </svg> */}
        <FaArrowUp className="w-3 h-3 mr-1" />
        <span>12% increase</span>
      </div>
    </div>
  );
}