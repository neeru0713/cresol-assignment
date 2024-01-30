const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const validateEvent = require('../middlewares/validateEvent');
const authenticateUser = require('../middlewares/authenticateUser');
const filterEvents = require('../middlewares/filterEvents');

router.post('/', authenticateUser, validateEvent, eventController.createEvent);
router.get('/', filterEvents, eventController.getAllEvents);

module.exports = router;
