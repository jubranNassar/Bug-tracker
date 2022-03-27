const Comment = require('../models/comment');
const Ticket = require('../models/ticket');
const { BadRequestErrors, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllComments = async (req, res) => {
	const comments = await Ticket.find({});
	res.status(StatusCodes.OK).json({ comments, count: comments.length });
};

const getComment = async (req, res) => {
	const {
		params: { commentID },
	} = req;

	const comment = await Comment.findOne({ commentID });

	if (!comment) {
		throw new NotFoundError('does not exist');
	}
	res.status(StatusCodes.OK).json({ comment });
};

const createComment = async (req, res) => {
	const { ticketID } = req.params;
	const { userId } = req.user;
	const currentTicket = await Ticket.findById(ticketID);

	const comment = await Comment.create({
		...req.body,
		createdBy: userId,
	});

	const commentID = await Comment.findById(comment._id);
	currentTicket.comments.push(commentID);
	currentTicket.save();
	res.status(StatusCodes.CREATED).json({ data: comment });
};

const editComment = async (req, res) => {
	const {
		params: { commentID, body: message },
	} = req;

	if (message == '') {
		throw new BadRequestErrors('Title field cannot be empty');
	}
	const comment = await Comment.findByIdAndUpdate(commentID, req.body, {
		new: true,
		runValidators: true,
	});

	if (!comment) {
		throw new NotFoundError('does not exist');
	}

	res.status(StatusCodes.OK).json({ comment });
};

const deleteComment = async (req, res) => {
	const {
		params: { ticketID, commentID },
		user: { userId },
	} = req;

	const comment = await Comment.findByIdAndDelete(commentID, {
		createdBy: userId,
	});

	const currentTicket = await Ticket.findById(ticketID);
	currentTicket.comments.pull(commentID);
	currentTicket.save();

	if (!comment) {
		throw new NotFoundError(`No ticket with ID ${commentID}`);
	}
	res.status(StatusCodes.OK).json({ msg: 'Deleted successfully' });
};

module.exports = {
	getAllComments,
	getComment,
	createComment,
	editComment,
	deleteComment,
};
