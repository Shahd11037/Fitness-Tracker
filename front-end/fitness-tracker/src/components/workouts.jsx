import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { FaSearch, FaDumbbell, FaRunning, FaPlus, FaChevronLeft, FaChevronRight, FaFilter } from 'react-icons/fa';
// import { GrYoga } from "react-icons/gr";
import WorkoutCard from './workoutCard';
import workoutsData from './data.json';
import Navbar from './navbar'; 
import styles from '../workoutStyle.module.css';


const WorkoutPage = () => {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [coach, setCoach] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [history, setHistory] = useState([]); 
  const [customWorkouts, setCustomWorkouts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('customWorkouts')) || [];
    setCustomWorkouts(saved);
  }, []);

  const _allWorkouts = [...workoutsData, ...customWorkouts];

  const addToHistory = (workout) => {
    const updatedHistory = [...history, workout];
    setHistory(updatedHistory);
    localStorage.setItem('workoutHistory', JSON.stringify(updatedHistory));
  };

  const filteredWorkouts = allWorkouts.filter(w =>
    w.title.toLowerCase().includes(search.toLowerCase()) &&
    (!difficulty || w.details.toLowerCase().includes(difficulty.toLowerCase())) &&
    (!coach || w.details.toLowerCase().includes(coach.toLowerCase()))
  );

  const yogaWorkouts = filteredWorkouts.filter(w => w.category === 'yoga');
  const cardioWorkouts = filteredWorkouts.filter(w => w.category === 'cardio');
  const strengthWorkouts = filteredWorkouts.filter(w => w.category === 'strength');
  const customWorkoutsFiltered = customWorkouts.filter(w => 
    w.title.toLowerCase().includes(search.toLowerCase()) &&
    (!difficulty || w.details.toLowerCase().includes(difficulty.toLowerCase()))
  );

  const resetFilters = () => {
    setSearch('');
    setDifficulty('');
    setCoach('');
  };

  return (
    <div className={styles.pageContainer}> 
      <Navbar />
      
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Discover Workouts</h1>
          <p className={styles.heroSubtitle}>Find the perfect workout for your fitness journey</p>
        </div>
      </div>
      
      <div className={styles.contentContainer}>
        <div className={styles.controlsBar}> 
          <div className={styles.searchWrapper}> 
            {/* <FaSearch className={styles.searchIcon} /> */}
            <input 
              type="text" 
              placeholder="Search workouts..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className={styles.searchInput} 
            /> 
            {search && (
              <button 
                className={styles.clearButton} 
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div> 
          
          <div className={styles.actionButtons}>
            <button 
              className={styles.filterToggle}
              onClick={() => setFilterOpen(!filterOpen)}
              aria-expanded={filterOpen}
            >
              {/* <FaFilter /> */}
              <span>Filters</span>
              {(difficulty || coach) && <span className={styles.filterBadge}></span>}
            </button>
            
            <Link to="/create" className={styles.createButton}>
              {/* <FaPlus className={styles.buttonIcon} /> */}
              <span>Create</span>
            </Link> 
          </div>
        </div>
        
        {filterOpen && (
          <div className={styles.filtersPanel}>
            <div className={styles.filterGroup}>
              <label htmlFor="difficulty-filter" className={styles.filterLabel}>Difficulty</label>
              <select 
                id="difficulty-filter"
                onChange={(e) => setDifficulty(e.target.value)} 
                value={difficulty} 
                className={styles.filterSelect}
              > 
                <option value="">All Difficulties</option> 
                <option value="beginner">Beginner</option> 
                <option value="intermediate">Intermediate</option> 
                <option value="advanced">Advanced</option> 
              </select> 
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="coach-filter" className={styles.filterLabel}>Coach</label>
              <select 
                id="coach-filter"
                onChange={(e) => setCoach(e.target.value)} 
                value={coach} 
                className={styles.filterSelect}
              > 
                <option value="">All Coaches</option> 
                <option value="Ashley Lee">Ashley Lee</option> 
                <option value="Jordan Smith">Jordan Smith</option> 
              </select> 
            </div>
            
            <button onClick={resetFilters} className={styles.resetButton}>
              Reset Filters
            </button>
          </div>
        )}
      
        <div className={styles.workoutGrid}>
          {customWorkoutsFiltered.length > 0 && (
            <WorkoutSection 
              title="Your Workouts" 
              workouts={customWorkoutsFiltered}
              onWorkoutClick={addToHistory} 
            />
          )}
          
          {yogaWorkouts.length > 0 && (
            <WorkoutSection 
              title="Yoga" 
              workouts={yogaWorkouts} 
              onWorkoutClick={addToHistory}
            />
          )}
          
          {cardioWorkouts.length > 0 && (
            <WorkoutSection 
              title="Cardio" 
              workouts={cardioWorkouts}
              onWorkoutClick={addToHistory} 
            />
          )}
          
          {strengthWorkouts.length > 0 && (
            <WorkoutSection 
              title="Strength" 
              workouts={strengthWorkouts}
              onWorkoutClick={addToHistory} 
            />
          )}
          
          {filteredWorkouts.length === 0 && (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h3>No workouts found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WorkoutSection = ({ title, workouts, onWorkoutClick }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.workoutSection}> 
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleWrapper}>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
        <div className={styles.scrollControls}>
          <button 
            className={styles.scrollButton} 
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            {/* <FaChevronLeft /> */}
          </button>
          <button 
            className={styles.scrollButton} 
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            {/* <FaChevronRight /> */}
          </button>
        </div>
      </div>
      
      <div className={styles.scrollWrapper}> 
        <div className={styles.scrollContainer} ref={scrollRef}> 
          {workouts.map(workout => ( 
            <WorkoutCard 
              key={workout.id} 
              workout={workout} 
              onClick={() => onWorkoutClick(workout)}
            /> 
          ))} 
        </div> 
      </div> 
    </section> 
  );
};

export default WorkoutPage;