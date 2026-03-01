const express = require('express');
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const authRouter = require('./router/authRouter.js');
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


// API endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome" });
});

// Routes
app.use('/auth', authRouter);

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
