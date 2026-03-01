const express = require('express');
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const authRouter = require('./router/authRouter');
const mongoose = require('mongoose')
const app = express()

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookie_parser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected successfully✅✅🏀")
  })
  .catch((error) => {
    console.log(error)
  })

// Routes
app.use('/api/auth', authRouter);
app.use('/api/auth', authRouter)

// API endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome" });
});




// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
