import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import './App.css'; // Import the main CSS file
import WorkoutHistory from './components/workoutHistory';
import WorkoutDetails from './components/workoutDetails';
import WorkoutPage  from './components/workouts';
import CreateWorkoutPage from './components/createWorkout';

// Main App component that handles routing and theme
function App() {
  // Initialize theme state from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  // Apply dark mode class to html element
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/workouts" element={<WorkoutPage />} />
          <Route path="/history" element={<WorkoutHistory />} />
          <Route path="/workoutDetails" element={<WorkoutDetails />} />
          <Route path="/create" element={<CreateWorkoutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


