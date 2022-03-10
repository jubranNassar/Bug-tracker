const express = require("express");
const router = express.Router();
const { register, logIn } = require("../controllers/users")

router.post("/register", register)
router.post("/login", logIn)


module.exports = router