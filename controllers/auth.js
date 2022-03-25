const User = require('../models/auth');
const { StatusCodes } = require('http-status-codes');
const { BadRequestErrors, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const userExists = await User.findOne({ email });

	if (!firstName || !lastName || !email || !password) {
		throw new BadRequestErrors('Please provide all values');
	}

	if (userExists) {
		throw new BadRequestErrors('Email already in use');
	}
	const user = await User.create({ ...req.body });
	const token = user.createJWT();

	//TODO: Can still see password when created
	res.status(StatusCodes.CREATED).json({
		data: { firstName, lastName, email },
		token,	
	});
};

const logIn = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestErrors('Please provide email and password');
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		throw new UnauthenticatedError('Invalid credentials');
	}

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid credentials');
	}

	const token = user.createJWT();
	res.status(StatusCodes.OK).json({
		user: { firstName: user.firstName, id: user._id },
		token,
	});
};

const getAllUsers = async (req, res) => {
	const user = await User.find({});
	res.status(StatusCodes.OK).json({ user });
};

module.exports = { register, logIn, getAllUsers };
