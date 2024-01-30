const eventService = require('../services/eventService');

class EventController {
  async createEvent(req, res) {
    try {
      const userId = req.user._id;
    
      let eventInfo  = {
        ...req.body,
        owner: userId,
      }
      
      const event = await eventService.createEvent(eventInfo, userId);
     
      res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  async getAllEvents(req, res) {
    try {
      const events = await eventService.getAllEvents(req.filters);
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).send('Internal Server Error');
    }
  }

}

module.exports = new EventController();
