
const { required, string } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      trim: true,
   },

   email: {
      type: String,
      unique: true,
      trim: true,
   },

   password: {
      required: true,
      select: false,
      type: String
   }
})


module.exports = ("user", userSchema);