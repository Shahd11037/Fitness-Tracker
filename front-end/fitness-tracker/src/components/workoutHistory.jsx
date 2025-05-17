import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaEdit, FaTrashAlt, FaPlus, FaTimes, FaHistory, FaDumbbell } from 'react-icons/fa';
import Navbar from './navbar';
import WorkoutCard from './workoutCard';
import styles from './WorkoutHistory.module.css';

const WorkoutHistory = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('historyWorkouts')) || [];
    setHistory(stored);
  }, []);

  const deleteWorkout = (workoutId) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      const updatedHistory = history.filter(workout => workout.id !== workoutId);
      setHistory(updatedHistory);
      localStorage.setItem('historyWorkouts', JSON.stringify(updatedHistory));
    }
  };

  const handleEditClick = (workout) => {
    setEditingWorkout(workout);
    setEditedFields({ ...workout });
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    const updated = history.map(w => w.id === editingWorkout.id ? editedFields : w);
    setHistory(updated);
    localStorage.setItem('historyWorkouts', JSON.stringify(updated));
    setIsModalOpen(false);
    setEditingWorkout(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFields(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingWorkout(null);
  };

  const filteredHistory = history.filter(workout => {
    const matchesSearch = workout.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter
      ? workout.details?.toLowerCase().includes(difficultyFilter.toLowerCase())
      : true;
    return matchesSearch && matchesDifficulty;
  });
  
  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Workout History</h1>
          <p className={styles.heroSubtitle}>Track your fitness journey and review your past workouts</p>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.controlsBar}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search your workouts"
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button 
                className={styles.clearButton} 
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
          
          <div className={styles.filters}>
            <select
              onChange={(e) => setDifficultyFilter(e.target.value)}
              value={difficultyFilter}
              className={styles.filterSelect}
              aria-label="Filter by difficulty"
            >
              <option value="">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            
            <Link to="/create" className={`${styles.filterSelect} ${styles.createLink}`}>
              <FaPlus style={{ marginRight: '8px' }} />
              Create Workout
            </Link>
          </div>
        </div>

        <div className={styles.workoutGrid}>
          {filteredHistory.length > 0 ? (
            filteredHistory.map(workout => (
              <div key={workout.id} className={styles.cardContainer}>
                <div className={styles.cardActions}>
                  <button 
                    className={styles.editButton} 
                    onClick={() => handleEditClick(workout)}
                    aria-label="Edit workout"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className={styles.deleteButton} 
                    onClick={() => deleteWorkout(workout.id)}
                    aria-label="Delete workout"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
                <WorkoutCard workout={workout} />
              </div>
            ))
          ) : searchTerm || difficultyFilter ? (
            <div className={styles.noResultsContainer}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h3 className={styles.noResultsTitle}>No workouts found</h3>
              <p className={styles.noResultsText}>
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                <FaHistory />
              </div>
              <h3 className={styles.emptyStateTitle}>No workout history yet</h3>
              <p className={styles.emptyStateText}>
                Get started by creating your first workout
              </p>
              <Link to="/create" className={styles.emptyStateButton}>
                <FaDumbbell style={{ marginRight: '8px' }} />
                Create Workout
              </Link>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Edit Workout</h3>
              <button 
                className={styles.closeButton}
                onClick={closeModal}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.formLabel}>Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={editedFields.title || ''}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.formLabel}>Description</label>
              <textarea
                id="description"
                name="description"
                value={editedFields.description || ''}
                onChange={handleChange}
                className={styles.formTextarea}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="details" className={styles.formLabel}>Details</label>
              <input
                id="details"
                name="details"
                type="text"
                value={editedFields.details || ''}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.formLabel}>Category</label>
              <select
                id="category"
                name="category"
                value={editedFields.category || ''}
                onChange={handleChange}
                className={styles.formSelect}
              >
                <option value="">Select Category</option>
                <option value="yoga">Yoga</option>
                <option value="cardio">Cardio</option>
                <option value="strength">Strength</option>
              </select>
            </div>
            
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={closeModal}>
                Cancel
              </button>
              <button className={styles.saveButton} onClick={handleSaveEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;