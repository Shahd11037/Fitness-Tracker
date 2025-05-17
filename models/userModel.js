const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  weight:   { type: Number },
  height:   { type: Number },
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }] 
});

module.exports = mongoose.model('User', userSchema);