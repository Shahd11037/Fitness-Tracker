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
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/workouts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }
        
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const deleteWorkout = async (workoutId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete workout');
      }

      setHistory(prev => prev.filter(workout => workout._id !== workoutId));
    } catch (err) {
      setError(err.message);
      console.error('Delete error:', err);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/workouts/${editingWorkout._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editedFields)
      });

      if (!response.ok) {
        throw new Error('Failed to update workout');
      }

      const updatedWorkout = await response.json();
      setHistory(prev => 
        prev.map(w => w._id === updatedWorkout._id ? updatedWorkout : w)
      );
      setEditingWorkout(null);
    } catch (err) {
      setError(err.message);
      console.error('Update error:', err);
    }
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
  const title = workout.title || '';
  const details = workout.details || '';
  
  const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesDifficulty = difficultyFilter
    ? details.toLowerCase().includes(difficultyFilter.toLowerCase())
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
