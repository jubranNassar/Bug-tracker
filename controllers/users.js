const User = require("../models/auth");
const { StatusCodes } = require("http-status-codes");


const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: {firstName: user.firstName}, token
    })
}

module.exports = {register}