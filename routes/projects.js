const express = require("express")
const router = express.Router()
const { getAllProjects, getProject, createProject, editProject, deleteProject } = require("../controllers/projects");

router.route("/").post(createProject).get(getAllProjects)
router.route("/:id").get(getProject).patch(editProject).delete(deleteProject)

module.exports = router