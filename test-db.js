require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/userModel');
const Workout = require('./models/workoutModel');

(async () => {
  try {
    // 1. Connect to DB
    await connectDB();
    console.log('✅ MongoDB Connected');

    // 2. Clear any existing test data
    await User.deleteMany({});
    await Workout.deleteMany({});

    // 3. Create test user (with hashed password)
    const hashedPassword = await bcrypt.hash('test1234', 12);
    const user = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword,
      weight: 70,
      height: 175
    });
    console.log('✅ Test user created:', user.email);

    // 4. Create test workout
    const workout = await Workout.create({
      userId: user._id,
      type: "strength",
      exercises: [{
        name: "Bench Press",
        sets: 3,
        reps: 10,
        weight: 135
      }]
    });
    console.log('✅ Test workout created:', workout.type);

    // 5. Verify data in MongoDB
    console.log('\n🎉 Success! Check MongoDB Compass:');
    console.log('- Collections: users, workouts');
    console.log('- Documents:', await User.countDocuments(), 'users,', await Workout.countDocuments(), 'workouts');

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
})();