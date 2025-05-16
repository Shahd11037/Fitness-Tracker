import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import StatsCard from './StatsCard';
import ProgressChart from './ProgressChart';
import { FaRunning, FaDumbbell, FaAppleAlt, FaHeartbeat } from 'react-icons/fa';

export default function Dashboard() {
  // State for mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Toggle sidebar function for mobile devices
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Demo data for the dashboard
  const stats = [
    {
      title: "Active Minutes",
      value: "354",
      trend: 8,
      trendType: "up",
      icon: <FaRunning className="text-primary text-2xl" />
    },
    {
      title: "Workouts",
      value: "12",
      trend: 5,
      trendType: "up",
      icon: <FaDumbbell className="text-secondary text-2xl" />
    },
    {
      title: "Calories",
      value: "1,845",
      trend: 3,
      trendType: "down",
      icon: <FaAppleAlt className="text-warning text-2xl" />
    },
    {
      title: "Heart Rate",
      value: "72",
      trend: 2,
      trendType: "down",
      icon: <FaHeartbeat className="text-danger text-2xl" />
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar />
      </aside>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="overlay" onClick={toggleSidebar}></div>
      )}
      
      {/* Main content */}
      <main className="main-content">
        <Navbar toggleSidebar={toggleSidebar} />
        
        {/* Stats Cards Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              trendType={stat.trendType}
              icon={stat.icon}
            />
          ))}
        </div>
        
        {/* Activity Progress Chart */}
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Weekly Activity</h3>
            <div className="flex items-center gap-4">
              <select className="form-input text-sm p-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>
          <div className="chart-wrapper">
            <ProgressChart />
          </div>
        </div>
        
        {/* Recent Activity Section */}
        <div className="chart-container mt-6">
          <div className="chart-header">
            <h3 className="chart-title">Recent Activities</h3>
           
          </div>
          
          <div className="mt-4 space-y-3">
            {/* Activity Items */}
            <div className="flex items-center p-3 bg-gray-light dark:bg-dark-light rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary-light dark:bg-primary bg-opacity-20 flex items-center justify-center mr-4">
                <FaRunning className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-dark dark:text-light">Morning Run</h4>
                <p className="text-xs text-gray-dark">5.2 km • 28 min • 320 calories</p>
              </div>
              <span className="text-sm text-gray-dark">Today</span>
            </div>
            
            <div className="flex items-center p-3 bg-gray-light dark:bg-dark-light rounded-lg">
              <div className="w-10 h-10 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center mr-4">
                <FaDumbbell className="text-secondary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-dark dark:text-light">Strength Training</h4>
                <p className="text-xs text-gray-dark">Upper body • 45 min • 280 calories</p>
              </div>
              <span className="text-sm text-gray-dark">Yesterday</span>
            </div>
            
            <div className="flex items-center p-3 bg-gray-light dark:bg-dark-light rounded-lg">
              <div className="w-10 h-10 rounded-full bg-warning bg-opacity-20 flex items-center justify-center mr-4">
                <FaAppleAlt className="text-warning" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-dark dark:text-light">Nutrition Update</h4>
                <p className="text-xs text-gray-dark">1,845 cal • 120g protein • 180g carbs</p>
              </div>
              <span className="text-sm text-gray-dark">Yesterday</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}