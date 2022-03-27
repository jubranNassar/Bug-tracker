const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	getAllProjects,
	getProject,
	createProject,
	editProject,
	deleteProject,
} = require('../controllers/projects');

router.route('/').post(createProject).get(getAllProjects);
router
	.route('/:projectID')
	.get(getProject)
	.patch(editProject)
	.delete(deleteProject);

module.exports = router;
