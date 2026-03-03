require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // use camelCase
const authRouter = require('./router/authRouter');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser()); // fixed naming

// Connect to MongoDB
// Make sure process.env.MONGODB_URI is set in .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/auth', authRouter);

// Test endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});