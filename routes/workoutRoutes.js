const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const auth = require('../middleware/authMiddleware');

// Apply auth middleware to all workout routes to ensure users are logged in
router.use(auth);

// CRUD Routes
// Get all workouts (for the logged-in user)
router.get('/', workoutController.getAllWorkouts);
router.get('/:id', workoutController.getWorkoutById);
router.post('/', workoutController.createWorkout);
router.delete('/:id', workoutController.deleteWorkout);
router.put('/:id', workoutController.updateWorkout);

module.exports = router;