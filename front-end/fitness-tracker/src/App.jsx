import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import ProgressChart from './components/ProgressChart';




function App() {
  return (
    <BrowserRouter>
      <div className='w-full h-full flex justify-center items-center'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
  (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar />
      <main className="flex-1 p-4">
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

export default App


