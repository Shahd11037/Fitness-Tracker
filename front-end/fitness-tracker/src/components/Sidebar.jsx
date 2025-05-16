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
        
       
      </nav>
    </aside>
  );
}
