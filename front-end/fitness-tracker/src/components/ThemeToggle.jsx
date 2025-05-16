import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle({ isDarkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-light dark:bg-dark hover:bg-gray dark:hover:bg-dark-light transition-colors"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-gray-dark" />
      )}
    </button>
  );
}