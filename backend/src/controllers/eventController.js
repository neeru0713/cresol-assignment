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

  async editEvent(req, res) {
    try {
      const eventId = req.params.eventId;
    
      const updatedEvent = await eventService.editEvent(eventId, req.body);

      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error('Error editing event:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteEvent(req, res) {
    try {
      const eventId = req.params.eventId;
    
      await eventService.deleteEvent(eventId);

      res.status(204).json({message: "Event deleted successfully"});
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async joinEvent(req, res) {
    try {
      const eventId = req.params.eventId;
      const userId = req.user._id;

      const joinedEvent = await eventService.joinEvent(eventId, userId);

      res.status(200).json(joinedEvent);
    } catch (error) {
      console.error('Error joining event:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async searchEvents(req, res) {
    try {
      const searchQuery = req.query.q;
      const events = await eventService.searchEvents(searchQuery);

      res.status(200).json(events);
    } catch (error) {
      console.error('Error searching events:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getEventsOfUser(req, res){
    try {
        
        const events = await eventService.getEventsOfUser(req.params.userId);
  
        res.status(200).json(events);
      } catch (error) {
        console.error('Error searching events:', error);
        res.status(500).send('Internal Server Error');
      }
  }

  async getUserEvents(req, res) {
    try {
      const userId = req.params.userId;
      const events = await eventService.getUserEvents(userId);

      res.status(200).json(events);
    } catch (error) {
      console.error('Error getting user events:', error);
      res.status(500).send('Internal Server Error');
    }
  }


}

module.exports = new EventController();
