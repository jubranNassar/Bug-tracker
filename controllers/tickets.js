const Ticket = require('../models/ticket');
const Project = require("../models/project")
const { BadRequestErrors, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');


const getAllTickets = async (req, res) => {
	const tickets = await Ticket.find({});
	res.status(StatusCodes.OK).json({ tickets, count: tickets.length });
};

const getTicket = async (req, res) => {
	const {
		params: { id: ticketId },
	} = req;
	const ticket = await Ticket.findOne({ _id: ticketId });
	if (!ticket) {
		throw new NotFoundError('does not exist');
	}
	res.status(StatusCodes.OK).json({ ticket });
};

const createTicket = async (req, res) => {
	const { id } = req.params;
	const { userId } = req.user;
	const currentProject = await Project.findById(id)
	const tickets = await Ticket.create({
		...req.body,
		project: id,
		createdBy: userId,
	});
	const ticketID = await Ticket.findById(tickets._id)
	currentProject.tickets.push(ticketID)
	currentProject.save()
	res.status(StatusCodes.CREATED).json({ tickets });
};

const editTicket = async (req, res) => {
	const {
		params: { id: ticketId, body: title },
	} = req;

	if (title == '') {
		throw new BadRequestErrors('Title field cannot be empty');
	}
	const ticket = await Ticket.findByIdAndUpdate({ _id: ticketId }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!ticket) {
		throw new NotFoundError('does not exist');
	}

	res.status(StatusCodes.OK).json({ ticket });
};

const deleteTicket = async (req, res) => {
	const { params: { id: ticketId, projectId: projectId }, user: { userId }} = req;
	const ticket = await Ticket.findByIdAndRemove({ _id: ticketId, createdBy: userId });
	const currentProject = await Project.findById(projectId)
	res.send(params)
	// if (!ticket) {
	// 	throw new NotFoundError(`No ticket with ID ${ticketId}`);
	// }
	// res.status(StatusCodes.OK).json({ msg: 'Deleted successfully' });
};

module.exports = {
	getAllTickets,
	getTicket,
	createTicket,
	editTicket,
	deleteTicket,
};
