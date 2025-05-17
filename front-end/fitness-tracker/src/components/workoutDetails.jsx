// src/pages/WorkoutDetails.jsx
import React, { _useEffect, useState } from "react";
import { _useParams  } from 'react-router-dom';
import { Heart, ChevronDown, ChevronUp } from "lucide-react";
import '../detailsStyle.css';
import Navbar from './navbar';
import _workoutsData from './data.json';




const workoutItems = [
  { title: 'Warm Up', duration: '3 min' },
  { title: 'Warm Up', duration: '5 min' },
  { title: 'Warm Up', duration: '5 min' },
  { title: 'Warm Up', duration: '5 min' },
  { title: 'Warm Up', duration: '5 min' },
  { title: 'Warm Up', duration: '5 min' },
  { title: 'Cool Down', duration: '3 min' },
];

export default function WorkoutDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const _toggleDropdown = () => setIsOpen(!isOpen);


  // useEffect(() => {
  //   const allWorkouts = JSON.parse(localStorage.getItem('customWorkouts')) || [];
  //   const staticWorkouts = workoutsData;
  //   const combined = [...staticWorkouts, ...allWorkouts];
  //   const selectedWorkout = combined.find(w => w.id === id);
  //   setWorkout(selectedWorkout);
  // }, [id]);

  // const handleStartWorkout = () => {
  //   const existing = JSON.parse(localStorage.getItem('historyWorkouts')) || [];

  //   // Prevent duplicate entries
  //   const alreadyExists = existing.some(w => w.id === workout.id);
  //   if (!alreadyExists) {
  //     const updated = [...existing, workout];
  //     localStorage.setItem('historyWorkouts', JSON.stringify(updated));
  //   }

  //   alert('Workout started and saved to history!');
  // };


  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navigation Bar */}
      {/* <header className="navbar">
        <div className="navbar-left">
         <Link to="/">Home</Link>
         <Link to="/workouts">Workouts</Link>
         <Link to="/history" className="active">History</Link>
        </div>
        <div className="navbar-right">
          <h1>FitTrack<span className="dot">.</span></h1>
        </div>
      </header> */}
      <Navbar />

      {/* Main Content */}
      <div className="workout-container">
        {/* Left Side - Image */}
        <div className="image-section">
          <img 
            src='/pilates.png' 
            alt="Workout" 
            className="workout-image"
          />
        </div>

        {/* Right Side - Workout Info */}
        <div className="workout-info">
          <div className="favorite-icon">
            <Heart fill="currentColor" />
          </div>

          <h1 className="workout-title">STRENGTH & LENGTH</h1>
          <h2 className="workout-subtitle">FULL BODY SCULPT</h2>

          <div className="workout-meta">
            <div>
              <p className="duration">29</p>
              <p className="duration2">min</p>
            </div>
            <div className="difficulty">
              <p>Beginner</p>
              <p>Train with <span className="font-semibold">Ashley Lee</span></p>
            </div>
          </div>

          <p className="workout-description">
            Dancers don't play! Challenge yourself with a full body sweat sesh like you've never experienced. Sculpt the body and train the mind in this ballet-HIIT workout.
          </p>

          <p className="calories">Estimated <span>282 kcal</span></p>

          {/* Timeline Section */}
          <div className="timeline-card">
            <div className="timeline-header">
                <h2>Workout Details</h2>
                <span>7 workouts | 29 mins</span>
            </div>
            <div className="timeline">
                {workoutItems.map((item, index) => (
                <div className="timeline-item" key={index}>
                    <div className="timeline-dot"></div>
                    <div>
                    <div className="timeline-title">{item.title}</div>
                    <div className="timeline-duration">{item.duration}</div>
                    </div>
                </div>
                ))}
            </div>
            </div>



          {/* <button className="start2-button" >
            START WORKOUT
          </button> */}
          <button  className="start2-button">
            Start Workout
          </button>
        </div>
      </div>
    </div>
  );
}