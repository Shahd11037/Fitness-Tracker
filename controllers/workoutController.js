const Workout = require('../models/workoutModel');

// Get all workouts for the current user
exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id })
    .sort({ date: -1 }); //make most recent workouts first 
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    if (workout.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createWorkout = async (req, res) => {
  try {
    const { type, exercises, date } = req.body;
    if (!type || !exercises || !exercises.length) {
      return res.status(400).json({ 
        message: 'Workout type and at least one exercise are required' 
      });
    }
    if (!['strength', 'cardio'].includes(type)) {
      return res.status(400).json({ 
        message: 'Workout type must be either "strength" or "cardio"' 
      });
    }
    
    // Validate exercises format
    for (const exercise of exercises) {
      if (!exercise.name) {
        return res.status(400).json({ message: 'Exercise name is required' });
      }
      if (type === 'strength' && (!exercise.sets || !exercise.reps)) {
        return res.status(400).json({ 
          message: 'Sets and reps are required for strength exercises' 
        });
      }
      if (type === 'cardio' && !exercise.duration) {
        return res.status(400).json({ 
          message: 'Duration is required for cardio exercises' 
        });
      }
    }
    
    const workout = new Workout({
      userId: req.user.id,
      date: date || Date.now(), 
      type,
      exercises
    });

    // Save the workout to the database
    const savedWorkout = await workout.save();

    // Add the workout reference to the user's workouts array
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { workouts: savedWorkout._id } }
    );

    res.status(201).json(savedWorkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    if (workout.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Delete the workout
    await Workout.findByIdAndDelete(req.params.id);
    
    // Remove workout reference from user's workouts array
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { workouts: req.params.id } }
    );

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Check if the workout belongs to the current user
    if (workout.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update the workout
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};