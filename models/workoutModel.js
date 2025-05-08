const mongoose = require('mongoose'); 

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['strength', 'cardio'], required: true },
    exercises: [{
      name: { type: String, required: true },
      sets: { type: Number },
      reps: { type: Number },
      weight: { type: Number }, // kg
      duration: { type: Number } // minutes
    }]
  });
  
  module.exports = mongoose.model('Workout', workoutSchema);