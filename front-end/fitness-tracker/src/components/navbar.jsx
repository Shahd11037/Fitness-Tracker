import { NavLink } from 'react-router-dom';
import '../workoutStyle.css';

const Navbar = () => (
<header className="navbar">
    <div className="navbar-left">
    <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
    <NavLink to="/workouts" className={({ isActive }) => isActive ? 'active' : ''}>Workouts</NavLink>
    <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>History</NavLink>
  </div>
  <div className="navbar-right">
    <h1>
      FitTrack<span className="dot">.</span>
    </h1>
  </div>
</header>

);

export default Navbar;
