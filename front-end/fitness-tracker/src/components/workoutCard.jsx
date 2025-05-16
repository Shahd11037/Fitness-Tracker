import { Link } from 'react-router-dom';
import '../workoutStyle.css';

const WorkoutCard = ({ workout, onDelete }) => {
  return (
    <div className="workout-card">
      <img src={workout.image} alt="Workout Preview" />
      <div className="workout-overlay">
        <Link to={workout.link || "/workoutDetails"} className="explore-button">Explore</Link>
        <h3>{workout.title}</h3>
        <p className="descrip">{workout.description}</p>
        <p className="details">{workout.details}</p>

        {/* Delete Button */}
      {onDelete && (
        <button className="delete-btn" onClick={() => onDelete(workout.id)}>
          ✖
        </button>
      )}
      </div>
    </div>
  );
};

export default WorkoutCard;
