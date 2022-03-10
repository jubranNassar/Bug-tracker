const User = require("../models/auth");
const { StatusCodes } = require("http-status-codes");
const { BadRequestErrors, UnauthenticatedError } = require("../errors")

const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: {firstName: user.firstName}, token
    })
}

const logIn = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestErrors("Please provide email and password").json()
    }

    const user = await User.findOne({email})
    
    if (!user) {
        throw new UnauthenticatedError("Invalid credentials")
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid credentials")
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{ firstName: user.firstName }, token})

}

module.exports = { register, logIn }