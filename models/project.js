const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please enter a title"]
    },

    tickets: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Ticket"
    }],

    members: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }]
})