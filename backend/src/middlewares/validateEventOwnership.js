const Event = require('../models/Event');

const validateEventOwnership = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    console.log("event in midd", event)
    console.log("event.owner.toString() ", event.owner.toString())
    console.log("userId.toString() ", userId.toString())
    

    if (!event || event.owner.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized - You do not own this event' });
    }

    next();
  } catch (error) {
    console.error('Error validating event ownership:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = validateEventOwnership;
