const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"]
    },

    priority: {
        type: String,
        required: [true, "please provide ticket priority"],
        enum: ["Low", "Medium", "High"],
        default: "Low"
    },

    description: {
        type: String,
        required: [true, "Please provide a description"]
    },

    progress: {
        type: String,
        enum: ["incomplete", "in-progress", "completed"],
        default: "incomplete"
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    assignees: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }],

    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Comment"
    }],

    project: {
        type: mongoose.Schema.Types.ObjectId, ref: "Project"
    }
})

module.exports = mongoose.model("Ticket", ticketSchema)