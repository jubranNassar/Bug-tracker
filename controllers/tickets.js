const Ticket = require('../models/ticket');
const Project = require('../models/project');
const Comment = require('../models/comment');
const User = require('../models/auth');
const { BadRequestErrors, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllTickets = async (req, res) => {
	const tickets = await Ticket.find({});
	res.status(StatusCodes.OK).json({ tickets, count: tickets.length });
};

const getTicket = async (req, res) => {
	const {
		params: { ticketID },
	} = req;

	const ticket = await Ticket.findById(ticketID);

	if (!ticket) {
		throw new NotFoundError('does not exist');
	}
	res.status(StatusCodes.OK).json({ ticket });
};

const createTicket = async (req, res) => {
	const { projectID } = req.params;
	const { userId } = req.user;
	const currentProject = await Project.findById(projectID);

	const tickets = await Ticket.create({
		...req.body,
		project: projectID,
		createdBy: userId,
	});

	const ticketID = await Ticket.findById(tickets._id);
	currentProject.tickets.push(ticketID);
	currentProject.save();
	res.status(StatusCodes.CREATED).json({ data: tickets });
};

const editTicket = async (req, res) => {
	const {
		params: { ticketID, body: title },
	} = req;

	const currentTicket = await Ticket.findById(ticketID);
	const currentUser = await User.findById(userId);

	if (currentUser._id !== currentTicket.createdBy) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: 'no permissions' });
	}

	if (title == '') {
		throw new BadRequestErrors('Title field cannot be empty');
	}
	const ticket = await Ticket.findByIdAndUpdate(ticketID, req.body, {
		new: true,
		runValidators: true,
	});

	if (!ticket) {
		throw new NotFoundError('does not exist');
	}

	res.status(StatusCodes.OK).json({ ticket });
};

const deleteTicket = async (req, res) => {
	const {
		params: { projectID, ticketID },
		user: { userId },
	} = req;

	const currentTicket = await Ticket.findById(ticketID);
	const currentUser = await User.findById(userId);

	if (currentUser._id !== currentTicket.createdBy) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: 'no permissions' });
	}

	await Comment.deleteMany({ ticket: ticketID });

	const ticket = await Ticket.findByIdAndDelete(ticketID, {
		createdBy: userId,
	});

	const currentProject = await Project.findById(projectID);
	currentProject.tickets.pull(ticketID);
	currentProject.save();

	if (!ticket) {
		throw new NotFoundError(`No ticket with ID ${ticketID}`);
	}
	res.status(StatusCodes.OK).json({ msg: 'Deleted successfully' });
};

module.exports = {
	getAllTickets,
	getTicket,
	createTicket,
	editTicket,
	deleteTicket,
};
