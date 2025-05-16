import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import '../createWorkoutStyle.css';

const CreateWorkoutPage = () => {
  const [workout, setWorkout] = useState({
    title: '',
    description: '',
    details: '',
    image: '',
    category: '',
  });

  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const history = JSON.parse(localStorage.getItem('historyWorkouts')) || [];
    const newWorkout = { ...workout, id: Date.now() };
    localStorage.setItem('historyWorkouts', JSON.stringify([...history, newWorkout]));

    setSuccessMsg('Workout created successfully!');

    // Delay and redirect to history
    setTimeout(() => {
      navigate('/history');
    }, 1500);
  };

  return (
    <div>
      <Navbar />
      <main className="workout-container">
        <h2>Create Workout</h2>

        {successMsg && <p className="success-message">{successMsg}</p>}

        <form className="workout-form" onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={workout.title} onChange={handleChange} required />
          <input name="description" placeholder="Description" value={workout.description} onChange={handleChange} required />
          <input name="details" placeholder="Details (e.g. 30 min · Beginner · Coach Name)" value={workout.details} onChange={handleChange} required />
          <input name="image" placeholder="Image URL or /image.png" value={workout.image} onChange={handleChange} required />
          <select name="category" value={workout.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="yoga">Yoga</option>
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
          </select>
          <button type="submit">Save Workout</button>
        </form>
      </main>
    </div>
  );
};

export default CreateWorkoutPage;
