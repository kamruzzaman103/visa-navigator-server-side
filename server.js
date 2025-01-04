// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const visaRoutes = require('./routes/visaRoutes'); // Import visa routes
const visaApplicationRoutes = require('./routes/visaApplicationRoutes');

dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // User authentication routes
app.use('/api/visas', visaRoutes); // Visa-related routes
app.use('/api/visa-applications', visaApplicationRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Visa Navigator API is working');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
