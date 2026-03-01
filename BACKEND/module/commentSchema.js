const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comment", commentSchema);
