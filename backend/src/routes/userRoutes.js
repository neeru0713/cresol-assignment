const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');

router.post('/register', validateUser, userController.registerUser);

module.exports = router;
