const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const authenticateUser = require('../middlewares/authenticateUser');
const eventController = require('../controllers/eventController');

router.post('/register', validateUser, userController.registerUser);
router.get('/:userId', authenticateUser, eventController.getUserEvents);
module.exports = router;
