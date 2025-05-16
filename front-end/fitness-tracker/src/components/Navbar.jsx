import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar">
      {/* Mobile menu button - only visible on mobile */}
      <button 
        className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={toggleSidebar}
        aria-label="Open menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <span className="ml-3 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 py-1 px-2 rounded-full font-medium">Beta</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <FaSearch className="search-icon" />
          <input
            type="search"
            placeholder="Search..."
            className="search-input"
          />
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}