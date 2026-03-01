

const mongoose = require ('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true,
        required: true,

    },

    createdAt: {
        type: Date,
        default: Date.now
    }

} )

module.exports = mongoose.model("comment", commentSchema)