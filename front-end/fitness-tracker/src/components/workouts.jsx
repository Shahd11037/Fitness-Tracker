import React, { useRef, useState, useEffect } from 'react';
import WorkoutCard from './workoutCard';
import workoutsData from './data.json';
import Navbar from './navbar'; 
import { Link } from 'react-router-dom';
import '../workoutStyle.css';

const WorkoutPage = () => {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [coach, setCoach] = useState('');
  const [history, setHistory] = useState([]); 
  const [customWorkouts, setCustomWorkouts] = useState([]);

  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem('customWorkouts')) || [];
  setCustomWorkouts(saved);
  }, []);

  const allWorkouts = [...workoutsData, ...customWorkouts];

  const addToHistory = (workout) => {
    setHistory([...history, workout]);
  };

  const filteredWorkouts = workoutsData.filter(w =>
    w.title.toLowerCase().includes(search.toLowerCase()) &&
    (!difficulty || w.details.toLowerCase().includes(difficulty.toLowerCase())) &&
    (!coach || w.details.toLowerCase().includes(coach.toLowerCase()))
  );

  const yogaWorkouts = filteredWorkouts.filter(w => w.category === 'yoga');
  const cardioWorkouts = filteredWorkouts.filter(w => w.category === 'cardio');

  return (
    <div> 
      <Navbar />
      

      <main className="workout-container">
      

      <div className="workout-controls">
        <div className="workout-actions">
          <select onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
            <option value="">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select onChange={(e) => setCoach(e.target.value)} value={coach}>
            <option value="">All Coaches</option>
            <option value="Ashley Lee">Ashley Lee</option>
            <option value="Jordan Smith">Jordan Smith</option>
          </select>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search Workouts"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <Link to="/create" className="create-button">+ Create Workout</Link>
        </div>
      </div>
    </main>
    <main className="workout-container2">
      <WorkoutSection title="Yoga Workouts" workouts={yogaWorkouts} />
      <WorkoutSection title="Cardio Workouts" workouts={cardioWorkouts} />
    </main>
      
    </div>
  );
};

const WorkoutSection = ({ title, workouts }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -260, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 260, behavior: 'smooth' });

  if (workouts.length === 0) return null;

  return (
    <section className="scroll-section">
      <h2>{title}</h2>
      <div className="scroll-wrapper">
        <button className="scroll-btn left" onClick={scrollLeft}>&#10094;</button>
        <div className="scroll-container" ref={scrollRef}>
          {workouts.map(workout => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>&#10095;</button>
      </div>
    </section>
  );
};

export default WorkoutPage;
