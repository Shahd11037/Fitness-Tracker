const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware'); 

// Apply middleware
//router.use(auth);
console.log('auth middleware loaded:', typeof auth);

// Workout Routes
router.get('/', protect, workoutController.getAllWorkouts);
router.get('/:id', protect, workoutController.getWorkoutById);
router.post('/', protect, workoutController.createWorkout);
router.put('/:id', protect, workoutController.updateWorkout);
router.delete('/:id', protect, workoutController.deleteWorkout);

router.get('/details/:id', protect, workoutController.getWorkoutDetails);

module.exports = router;