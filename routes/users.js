const express = require('express');
const router = express.Router();
const {
	register,
	logIn,
	getAllUsers,
	updateUser,
} = require('../controllers/auth');

router.post('/register', register);
router.post('/login', logIn);
router.get('/users', getAllUsers);
router.get('/users/:userID', updateUser);

module.exports = router;
