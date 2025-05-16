/*const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const workoutRoutes = require('./routes/workoutRoutes')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes  
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/workouts', workoutRoutes);

// Error Handling 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: err.message 
    });
});

// Base route
app.get('/', (req, res) => {
  res.send('Fitness Tracker Home');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const swaggerDocs = require('./swagger');
swaggerDocs(app); */