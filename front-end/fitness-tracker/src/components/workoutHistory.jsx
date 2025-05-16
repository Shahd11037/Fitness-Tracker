import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import WorkoutCard from './workoutCard';
import '../App.css';
import '../historyStyle.css';

function WorkoutHistory() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('historyWorkouts')) || [];
    setHistory(stored);
  }, []);

  const deleteWorkout = (workoutId) => {
    const updatedHistory = history.filter(workout => workout.id !== workoutId);
    setHistory(updatedHistory);
    localStorage.setItem('historyWorkouts', JSON.stringify(updatedHistory));
  };

  const handleEditClick = (workout) => {
    setEditingWorkout(workout);
    setEditedFields({ ...workout });
  };

  const handleSaveEdit = () => {
    const updated = history.map(w => w.id === editingWorkout.id ? editedFields : w);
    setHistory(updated);
    localStorage.setItem('historyWorkouts', JSON.stringify(updated));
    setEditingWorkout(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFields(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDifficultyFilter = (e) => {
    setDifficultyFilter(e.target.value);
  };

  const filteredHistory = history.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter
      ? workout.details?.toLowerCase().includes(difficultyFilter.toLowerCase())
      : true;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div>
      <Navbar />

      <main className="workout-container">
        <div className="workout-header">
          <h2>HISTORY</h2>
          <div className="workout-actions">
            <select onChange={handleDifficultyFilter} value={difficultyFilter} className="action-btn">
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search Workouts"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </div>
      </main>

      <main className="workout-container2">
        <div className="workout-grid">
          {filteredHistory.map(workout => (
            <div key={workout.id} className="card-container">
              <div className="button-group">
                <button className="edit-btn" onClick={() => handleEditClick(workout)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteWorkout(workout.id)}>Delete</button>
              </div>
              <WorkoutCard workout={workout} />
            </div>
          ))}
        </div>

        {editingWorkout && (
          <div className="edit-modal">
            <h3>Edit Workout</h3>
            <label>Title: <input name="title" value={editedFields.title || ''} onChange={handleChange} /></label><br />
            <label>Description: <input name="description" value={editedFields.description || ''} onChange={handleChange} /></label><br />
            <label>Details: <input name="details" value={editedFields.details || ''} onChange={handleChange} /></label><br />
            <label>Image: <input name="image" value={editedFields.image || ''} onChange={handleChange} /></label><br />
            <label>Category: <input name="category" value={editedFields.category || ''} onChange={handleChange} /></label><br />
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setEditingWorkout(null)}>Cancel</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default WorkoutHistory;
