const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const { errorHandler } = require('./middleware/errorHandler');


dotenv.config();
connectDB();

const app = express();
// Allow requests from frontend 
const corsOptions = {
  origin: 'http://localhost:5173', //  frontend port
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions)); 
app.use(express.json());

const setupSwagger = require('./swagger');
setupSwagger(app); // Initialize Swagger

app.get('/', (req, res) => {
  res.send('Fitness Tracker API is running!');
});

app.options('*', cors(corsOptions)); // Enable preflight for all routes

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

