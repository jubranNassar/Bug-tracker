const express = require('express');
const router = express.Router();
const { register, logIn, getAllUsers } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', logIn);
router.get('/users', getAllUsers);

module.exports = router;
