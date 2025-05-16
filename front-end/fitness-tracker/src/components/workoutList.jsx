import WorkoutCard from './workoutCard';
import { useEffect, useState } from 'react';
import workoutsdata from './data.json';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Simulated fetch — replace this with an actual API call
    // fetch('/api/workouts')
    //   .then(res => res.json())
    //   .then(data => setWorkouts(data));

    setWorkouts(workoutsdata);
  }, []);

  return (
    <div className="workout-list flex gap-4 flex-wrap">
      {workouts.map(workout => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
};

export default WorkoutList;
