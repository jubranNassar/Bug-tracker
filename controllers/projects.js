const Project = require('../models/project');
const { StatusCodes } = require('http-status-codes');
const { BadRequestErrors, NotFoundError } = require('../errors');

const getAllProjects = async (req, res) => {
	const projects = await Project.find({});
	res.status(StatusCodes.OK).json({ projects, count: projects.length });
};

const getProject = async (req, res) => {
	const {
		params: { id: projectId },
	} = req;
	const project = await Project.findOne({ _id: projectId }).populate(
		'members',
		'tickets'
	);

	if (!project) {
		throw new NotFoundError('does not exist');
	}
	res.status(StatusCodes.OK).json({ project });
};

const createProject = async (req, res) => {
	const projects = await Project.create(req.body);
	res.status(StatusCodes.CREATED).json({ projects });
};

const editProject = async (req, res) => {
	const {
		params: { id: projectId, body: title },
	} = req;
	if (title == '') {
		throw new BadRequestErrors('Title field cannot be empty');
	}
	const project = await Project.findByIdAndUpdate(
		{ _id: projectId },
		req.body,
		{ new: true, runValidators: true }
	);

	if (!project) {
		throw new NotFoundError('does not exist');
	}

	res.status(StatusCodes.OK).json({ project });
};

const deleteProject = async (req, res) => {
	const { id: projectId } = req.params;
	const project = await Project.findOne({ _id: projectId });

	if (!project) {
		throw new NotFoundError(`No project with ID ${projectId}`);
	}
	await project.remove();
	res.status(StatusCodes.OK).json({ msg: 'Deleted successfully' });
};

module.exports = {
	getAllProjects,
	getProject,
	createProject,
	editProject,
	deleteProject,
};
