const Project = require('../models/project');
const Ticket = require('../models/ticket');
const Comment = require('../models/comment');
const User = require('../models/auth');
const { StatusCodes } = require('http-status-codes');
const { BadRequestErrors, NotFoundError } = require('../errors');

const getAllProjects = async (req, res) => {
	const projects = await Project.find({});
	res.status(StatusCodes.OK).json({ projects, count: projects.length });
};

const getProject = async (req, res) => {
	const {
		params: { projectID },
	} = req;
	const project = await Project.findById(projectID);

	if (!project) {
		throw new NotFoundError('does not exist');
	}
	res.status(StatusCodes.OK).json({ project });
};

const createProject = async (req, res) => {
	const user = await User.findById(req.user.userId);
	if (user.role !== 'Admin') {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: 'no permission' });
	}

	const projects = await Project.create(req.body);
	res.status(StatusCodes.CREATED).json({ projects });
};

const editProject = async (req, res) => {
	const {
		params: { projectID, body: title },
	} = req;

	const user = await User.findById(req.user.userId);
	if (user.role !== 'Admin') {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: 'no permission' });
	}

	if (title == '') {
		throw new BadRequestErrors('Title field cannot be empty');
	}
	const project = await Project.findByIdAndUpdate(projectID, req.body, {
		new: true,
		runValidators: true,
	});

	if (!project) {
		throw new NotFoundError('does not exist');
	}

	res.status(StatusCodes.OK).json({ project });
};

const deleteProject = async (req, res) => {
	const {
		params: { projectID, ticketID },
	} = req;

	const user = await User.findById(req.user.userId);
	if (user.role !== 'Admin') {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: 'no permission' });
	}

	await Comment.deleteMany({ ticketID });
	await Ticket.deleteMany({ project: projectID });

	const project = await Project.findByIdAndDelete(projectID);

	if (!project) {
		throw new NotFoundError(`No project with ID ${projectID}`);
	}

	res.status(StatusCodes.OK).json({ msg: 'Deleted successfully' });
};

module.exports = {
	getAllProjects,
	getProject,
	createProject,
	editProject,
	deleteProject,
};
