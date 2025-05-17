// src/pages/WorkoutDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
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

const updateWorkoutDetails = async (workoutId, token) => {
  try {
    const response = await fetch(`http://localhost:5000/api/workouts/${workoutId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        type: 'strength',
        exercises: [
          {
            name: 'Updated Bench Press',
            sets: 4,
            reps: 12,
            weight: 145
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update workout details');
    }

    const data = await response.json();
    console.log('Workout updated:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default function WorkoutDetails() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/workouts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch workout details');
        }
        const data = await response.json();
        console.log('Fetched workout data:', data);
        setWorkout(data);
      } catch (error) {
        console.error('Error fetching workout details:', error);
      }
    };

    fetchWorkoutDetails();
  }, [id]);

  if (!workout) {
    return <div>Loading...</div>;
  }

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
            src={workout.image || '/default-image.png'} 
            alt="Workout" 
            className="workout-image"
          />
        </div>

        {/* Right Side - Workout Info */}
        <div className="workout-info">
          <div className="favorite-icon">
            <Heart fill="currentColor" />
          </div>

          <h1 className="workout-title">{workout.title}</h1>
          <h2 className="workout-subtitle">{workout.subtitle}</h2>

          <div className="workout-meta">
            <div>
              <p className="duration">{workout.duration}</p>
              <p className="duration2">min</p>
            </div>
            <div className="difficulty">
              <p>{workout.difficulty}</p>
              <p>Train with <span className="font-semibold">{workout.coach}</span></p>
            </div>
          </div>

          <p className="workout-description">
            {workout.description}
          </p>

          <p className="calories">Estimated <span>{workout.calories} kcal</span></p>

          {/* Timeline Section */}
          <div className="timeline-card">
            <div className="timeline-header">
                <h2>Workout Details</h2>
                <span>{workout.exercises.length} exercises | {workout.duration} mins</span>
            </div>
            <div className="timeline">
                {workout.exercises.map((exercise, index) => (
                <div className="timeline-item" key={index}>
                    <div className="timeline-dot"></div>
                    <div>
                    <div className="timeline-title">{exercise.name}</div>
                    <div className="timeline-duration">{exercise.sets} sets x {exercise.reps} reps</div>
                    </div>
                </div>
                ))}
            </div>
            </div>



          {/* <button className="start2-button" >
            START WORKOUT
          </button> */}
          <button className="start2-button">
            Start Workout
          </button>
        </div>
      </div>
    </div>
  );
}