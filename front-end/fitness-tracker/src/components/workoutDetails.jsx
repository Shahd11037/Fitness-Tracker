// src/pages/WorkoutDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ChevronDown, ChevronUp } from "lucide-react";
import '../detailsStyle.css';
import Navbar from './navbar';
import _workoutsData from './data.json';

export default function WorkoutDetails() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      if (!id) {
        setError('No workout ID provided');
        setIsLoading(false);
        return;
      }
      
      console.log('Fetching workout with ID:', id);
      setIsLoading(true);
      setError(null);
      
      try {
        // First try the API endpoint
        const apiUrl = `http://localhost:5000/api/workouts/details/${id}`;
        console.log('Attempting to fetch from:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Fetched workout data:', result);
        
        if (result.success && result.data) {
          console.log('Successfully loaded workout from API:', result.data);
          setWorkout(result.data);
          setIsLoading(false);
          return; // Exit early when API data is found
        } else {
          console.error('API returned success:false or no data', result);
          throw new Error(result.message || 'API did not return workout data');
        }
      } catch (error) {
        console.error('Error fetching workout details from API:', error);
        // Fallback to local data only if API request fails
        fallbackToLocalData();
      }
    };

    const fallbackToLocalData = () => {
      // Only called when API request fails
      console.log('API request failed, falling back to local data for ID:', id);
      
      try {
        const localWorkouts = JSON.parse(localStorage.getItem('customWorkouts')) || [];
        const staticWorkouts = _workoutsData || [];
        console.log('Local workouts count:', localWorkouts.length);
        console.log('Static workouts count:', staticWorkouts.length);
        
        const combinedWorkouts = [...staticWorkouts, ...localWorkouts];
        console.log('Combined workouts:', combinedWorkouts);
        
        // Try to match by string or number ID
        const foundWorkout = combinedWorkouts.find(w => 
          String(w.id) === String(id) || 
          (typeof w._id !== 'undefined' && String(w._id) === String(id))
        );
        
        if (foundWorkout) {
          console.log('Found workout in local data:', foundWorkout);
          setWorkout(foundWorkout);
          setIsLoading(false);
        } else {
          console.error('Workout not found in local data for ID:', id);
          // Create a placeholder workout with the ID from the URL
          setWorkout({
            id: id,
            title: 'Sample Workout',
            type: 'strength',
            description: 'This is a placeholder workout. The requested workout ID was not found.',
            duration: '30',
            difficulty: 'Beginner',
            coach: 'Fitness Coach',
            calories: '300',
            exercises: [
              { name: 'Sample Exercise', sets: 3, reps: 10, weight: 0 }
            ]
          });
          setError(`Workout with ID "${id}" was not found. Showing a sample workout instead.`);
          setIsLoading(false);
        }
      } catch (e) {
        console.error('Error in fallback:', e);
        setError('Could not load workout details');
        setIsLoading(false);
      }
    };

    fetchWorkoutDetails();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p>Loading workout details...</p>
        </div>
      </div>
    );
  }

  // Handle different data structures (API vs local)
  const getDataValue = (obj, paths, defaultVal) => {
    for (const path of paths) {
      const value = path.split('.').reduce((o, key) => o?.[key], obj);
      if (value !== undefined && value !== null) return value;
    }
    return defaultVal;
  };

  const workoutTitle = getDataValue(workout, ['title', 'type'], 'Workout').toUpperCase();
  
  const workoutSubtitle = getDataValue(
    workout, 
    ['subtitle', 'userId.username', 'exercises[0].name'], 
    ''
  );
  
  const workoutDescription = getDataValue(
    workout, 
    ['description'], 
    'No description available'
  );
  
  const workoutDuration = getDataValue(workout, ['duration'], '30');
  
  const workoutDifficulty = getDataValue(
    workout, 
    ['difficulty', 'type'], 
    'Standard'
  );
  
  const workoutCoach = getDataValue(
    workout, 
    ['coach', 'userId.username'], 
    'Unknown'
  );
  
  const workoutCalories = getDataValue(workout, ['calories'], '300');
  
  // Ensure we have consistent exercises array
  const workoutExercises = getDataValue(workout, ['exercises'], []);
  
  // Add debug info to console
  console.log('Workout data mapped to display:', {
    title: workoutTitle,
    subtitle: workoutSubtitle,
    description: workoutDescription,
    duration: workoutDuration,
    difficulty: workoutDifficulty,
    coach: workoutCoach,
    calories: workoutCalories,
    exercises: workoutExercises
  });
  
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

      {error && (
        <div className="bg-red-500 text-white p-3 text-center">
          {error}
        </div>
      )}

      {/* Main Content */}
      <div className="workout-container">
        {/* Left Side - Image */}
        <div className="image-section">
          <img 
            src={getDataValue(workout, ['image'], '/pilates.png')} 
            alt="Workout" 
            className="workout-image"
          />
        </div>

        {/* Right Side - Workout Info */}
        <div className="workout-info">
          <div className="favorite-icon">
            <Heart fill="currentColor" />
          </div>

          <h1 className="workout-title">{workoutTitle}</h1>
          <h2 className="workout-subtitle">{workoutSubtitle}</h2>

          <div className="workout-meta">
            <div>
              <p className="duration">{workoutDuration}</p>
              <p className="duration2">min</p>
            </div>
            <div className="difficulty">
              <p>{workoutDifficulty}</p>
              <p>Train with <span className="font-semibold">{workoutCoach}</span></p>
            </div>
          </div>

          <p className="calories">Estimated <span>{workoutCalories} kcal</span></p>

          {/* Timeline Section */}
          <div className="timeline-card">
            <div className="timeline-header">
                <h2>Workout Details</h2>
                <span>{workoutExercises.length} exercises | {workoutDuration} mins</span>
            </div>
            <div className="timeline">
                {workoutExercises.map((exercise, index) => (
                <div className="timeline-item" key={index}>
                    <div className="timeline-dot"></div>
                    <div>
                    <div className="timeline-title">{exercise.name}</div>
                    <div className="timeline-duration">
                      {exercise.sets ? `${exercise.sets} sets × ${exercise.reps} reps` : (exercise.duration || '5 min')}
                      {exercise.weight ? ` (${exercise.weight} lbs)` : ''}
                    </div>
                    </div>
                </div>
                ))}
                {workoutExercises.length === 0 && (
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div>
                      <div className="timeline-title">No exercises found</div>
                      <div className="timeline-duration">Try another workout</div>
                    </div>
                  </div>
                )}
            </div>
            </div>

          {/* <button className="start2-button" >
            START WORKOUT
          </button> */}
          <button className="start2-button" onClick={() => navigate('/workouts')}>
            Back to Workouts
          </button>
        </div>
      </div>
    </div>
  );
}