const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['strength', 'cardio'], 
    required: true 
  },
  exercises: [{
    name: { type: String, required: true },
    sets: { type: Number },
    reps: { type: Number },
    weight: { type: Number },
    duration: { type: Number } // For cardio
  }],
  date: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Workout', workoutSchema);