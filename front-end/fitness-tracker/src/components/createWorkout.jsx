import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaCheckCircle, FaDumbbell, FaRunning } from 'react-icons/fa';
import { GrYoga } from "react-icons/gr";
import { toast } from 'react-toastify';
import Navbar from './navbar';
import styles from './CreateWorkout.module.css';

const CreateWorkoutPage = () => {
  const [workout, setWorkout] = useState({
    title: '',
    description: '',
    details: '',
    category: '',
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Convert image to base64 for storage
    const reader = new FileReader();
    
    const saveWorkout = (imageData) => {
      const history = JSON.parse(localStorage.getItem('historyWorkouts')) || [];
      const newWorkout = { 
        ...workout, 
        id: Date.now(),
        image: imageData || null,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('historyWorkouts', JSON.stringify([...history, newWorkout]));

      toast.success('Workout created successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/history');
      }, 1500);
    };

    if (image) {
      reader.onloadend = () => saveWorkout(reader.result);
      reader.readAsDataURL(image);
    } else {
      saveWorkout(null);
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'yoga': return <GrYoga />;
      case 'cardio': return <FaRunning />;
      case 'strength': return <FaDumbbell />;
      default: return null;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      
      <div className={styles.contentContainer}>
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.title}>Create New Workout</h2>
            <p className={styles.subtitle}>Fill in the details to create your custom workout</p>
          </div>

          <form className={styles.workoutForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.formLabel}>Workout Title</label>
              <input 
                id="title"
                name="title" 
                type="text"
                placeholder="e.g. Morning HIIT Session" 
                value={workout.title} 
                onChange={handleChange} 
                className={styles.formInput} 
                required 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.formLabel}>Description</label>
              <textarea 
                id="description"
                name="description" 
                placeholder="Describe your workout routine" 
                value={workout.description} 
                onChange={handleChange} 
                rows="3"
                className={styles.formTextarea} 
                required 
              />
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="details" className={styles.formLabel}>Workout Details</label>
                <input 
                  id="details"
                  name="details" 
                  type="text"
                  placeholder="e.g. 30 min · Beginner · Coach Name" 
                  value={workout.details} 
                  onChange={handleChange} 
                  className={styles.formInput} 
                  required 
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.formLabel}>Category</label>
                <div className={styles.selectWrapper}>
                  {workout.category && (
                    <span className={styles.categoryIcon}>
                      {getCategoryIcon(workout.category)}
                    </span>
                  )}
                  <select 
                    id="category"
                    name="category" 
                    value={workout.category} 
                    onChange={handleChange} 
                    className={`${styles.formSelect} ${workout.category ? styles.hasIcon : ''}`} 
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="yoga">Yoga</option>
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength Training</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Workout Image</label>
              <div 
                className={styles.imageUploader}
                onClick={handleImageClick}
              >
                {imagePreview ? (
                  <div className={styles.imagePreviewContainer}>
                    <img 
                      src={imagePreview} 
                      alt="Workout preview" 
                      className={styles.imagePreview}
                    />
                  </div>
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <FaImage className={styles.uploadIcon} />
                    <p className={styles.uploadText}>Click to upload an image</p>
                    <span className={styles.uploadHint}>Recommended: 16:9 ratio, PNG or JPG</span>
                  </div>
                )}
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className={styles.fileInput}
                />
              </div>
            </div>
            
            <div className={styles.actionBar}>
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinnerIcon}></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaCheckCircle className={styles.buttonIcon} />
                    Save Workout
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkoutPage;