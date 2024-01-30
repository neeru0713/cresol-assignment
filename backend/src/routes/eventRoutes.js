const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const validateEvent = require('../middlewares/validateEvent');
const authenticateUser = require('../middlewares/authenticateUser');


router.post('/', authenticateUser, validateEvent, eventController.createEvent);

module.exports = router;
