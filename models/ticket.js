const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"]
    },

    priority: {
        enum: ["Low", "Medium", "High"],
        required: [true, "please provide ticket priority"]
    },

    description: {
        type: Text,
        required: [true, "Please provide a description"]
    },

    progress: {
        enum: ["incomplete", "in-progress", "completed"],
        default: "incomplete"
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    assignees: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }],

    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Comment"
    }]
})

module.exports = mongoose.model("Ticket", ticketSchema)