const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const validateEvent = require('../middlewares/validateEvent');
const authenticateUser = require('../middlewares/authenticateUser');
const filterEvents = require('../middlewares/filterEvents');
const validateEventOwnership = require('../middlewares/validateEventOwnership');

router.post('/', authenticateUser, validateEvent, eventController.createEvent);
router.get('/', filterEvents, eventController.getAllEvents);
router.put('/:eventId', authenticateUser, validateEventOwnership, eventController.editEvent);
router.delete('/:eventId', authenticateUser, validateEventOwnership, eventController.deleteEvent);
router.post('/:eventId/join', authenticateUser, eventController.joinEvent);

module.exports = router;
