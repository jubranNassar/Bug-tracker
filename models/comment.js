const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, "please provide a message"]
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
})

module.exports = mongoose.model("Comment", commentSchema)