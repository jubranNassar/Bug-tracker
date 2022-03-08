const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide last name"],
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password with a minimum length of 6 characters"],
        minlength: 6
    },
    role: [{
        type: String,
        enum: ["admin", "developer"],
        default: "developer"
    }],
    projects: [{
        type: Schema.Types.ObjectId, ref: "Project"
    }]
});

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({
        userId: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
    },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME
        }
    )
}



modules.export = mongoose.model("User", UserSchema)