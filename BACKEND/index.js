const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./router/authRouter');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());







const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});