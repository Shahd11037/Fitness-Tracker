const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));

// Error Handling (Add this last!)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: err.message 
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const swaggerDocs = require('./swagger');
swaggerDocs(app);

app.use(express.json());