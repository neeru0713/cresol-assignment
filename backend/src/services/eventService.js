const Event = require('../models/Event');
const User = require('../models/User');
class EventService {
  async createEvent(eventData, userId) {
    try {
     
        const user = await User.findById(userId);

      // Modify the user's role (change this logic based on your requirements)
      if (user) {
        user.role = 'organizer'; // Change 'newRole' to the desired role
        await user.save();
      }


      const event = new Event(eventData);
      await event.save();
      return event;
    } catch (error) {
      throw error;
    }
  }

  async getAllEvents(filters) {
    try {
      const events = await Event.find(filters).populate('owner');
      return events;
    } catch (error) {
      throw error;
    }
  }

  async editEvent(eventId, eventData) {
    try {
     
      const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, { new: true });

      return updatedEvent;
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(eventId) {
    try {
      // Delete the event
      const deletedEvent = await Event.findByIdAndDelete(eventId);

      // If needed, perform additional logic

      return deletedEvent;
    } catch (error) {
      throw error;
    }
  }

  async joinEvent(eventId, userId) {
    try {
      // Find the event
      const event = await Event.findById(eventId);

      if (!event) {
        throw new Error('Event not found');
      }

      // Check if the user is already an attendee
      const isAttendee = event.attendees?.includes(userId);
      if (isAttendee) {
        throw new Error('User is already an attendee');
      }

      // Add the user to the attendees array
      event.attendees?.push(userId);

      // Save the updated event
      const updatedEvent = await event.save();

      return updatedEvent;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new EventService();
