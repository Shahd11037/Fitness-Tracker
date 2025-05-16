import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaChartBar, FaDumbbell, FaAppleAlt, FaCalendarAlt, FaCog } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <NavLink to="/dashboard" className="sidebar-logo">
          <FaDumbbell />
          <span>Fitness Tracker</span>
        </NavLink>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => 
          `sidebar-nav-item ${isActive ? 'active' : ''}`
        }>
          <FaChartBar className="sidebar-icon" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/workouts" className={({ isActive }) => 
          `sidebar-nav-item ${isActive ? 'active' : ''}`
        }>
          <FaDumbbell className="sidebar-icon" />
          <span>Workouts</span>
        </NavLink>
        
        <NavLink to="/nutrition" className={({ isActive }) => 
          `sidebar-nav-item ${isActive ? 'active' : ''}`
        }>
          <FaAppleAlt className="sidebar-icon" />
          <span>Nutrition</span>
        </NavLink>
        
        <NavLink to="/schedule" className={({ isActive }) => 
          `sidebar-nav-item ${isActive ? 'active' : ''}`
        }>
          <FaCalendarAlt className="sidebar-icon" />
          <span>Schedule</span>
        </NavLink>
        
        <NavLink to="/settings" className={({ isActive }) => 
          `sidebar-nav-item ${isActive ? 'active' : ''}`
        }>
          <FaCog className="sidebar-icon" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
}
