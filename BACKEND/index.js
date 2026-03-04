const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./router/authRouter');
const mongoose = require('mongoose');
const connectDB = require('./mongodb/mongodbconnection.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());


const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/Comments';

connectDB(DATABASE_URI)

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});