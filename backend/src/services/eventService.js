const Event = require('../models/Event');

class EventService {
  async createEvent(eventData, userId) {
    try {
      console.log(eventData)  
      const event = new Event(eventData);
      await event.save();
      return event;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new EventService();
