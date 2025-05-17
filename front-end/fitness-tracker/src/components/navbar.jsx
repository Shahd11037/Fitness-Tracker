import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaDumbbell, FaChartBar, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../workoutStyle.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully', {
      position: "top-right",
      autoClose: 2000,
      style: { backgroundColor: '#22c55e', color: 'white' }
    });
    navigate('/');
  };
  
  return (
    <header className={`modern-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo-section">
          <div className="logo-icon">
            <FaDumbbell />
          </div>
          <h1 className="logo-text">
            FitTrack<span className="highlight">.</span>
          </h1>
        </div>
        
        <nav className="nav-links">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <FaChartBar className="nav-icon" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink 
            to="/workouts" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <FaDumbbell className="nav-icon" />
            <span>Workouts</span>
          </NavLink>
          
          <NavLink 
            to="/history" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <FaHistory className="nav-icon" />
            <span>History</span>
          </NavLink>
        </nav>
        
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
