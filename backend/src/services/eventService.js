const Event = require("../models/Event");
const User = require("../models/User");
class EventService {
  async createEvent(eventData, userId) {
    try {
      const user = await User.findById(userId);

      if (user) {
        user.role = "organizer";
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
     
      const regexFilters = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === 'string') {
          regexFilters[key] = new RegExp(value, 'i');
        } else {
          regexFilters[key] = value;
        }
      });
  
    
      const events = await Event.find(regexFilters).populate("owner");
      return events;
    } catch (error) {
      throw error;
    }
  }
  

  async editEvent(eventId, eventData) {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, {
        new: true,
      });

      return updatedEvent;
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(eventId) {
    try {
      const deletedEvent = await Event.findByIdAndDelete(eventId);
      return deletedEvent;
    } catch (error) {
      throw error;
    }
  }

  async joinEvent(eventId, userId) {
    try {
      const event = await Event.findById(eventId);

      if (!event) {
        throw new Error("Event not found");
      }

      const isAttendee = event.attendees?.includes(userId);
      if (isAttendee) {
        throw new Error("User is already an attendee");
      }
      event.attendees?.push(userId);

      const updatedEvent = await event.save();

      await User.findByIdAndUpdate(userId, {
        $push: { joinedEvents: eventId },
      });

      return updatedEvent;
    } catch (error) {
      throw error;
    }
  }

  async searchEvents(searchQuery) {
    try {
      if (!searchQuery) {
        throw new Error("Search query is required");
      }

      const events = await Event.find({
        $or: [
          { title: { $regex: `.*${searchQuery}.*`, $options: "i" } },
          { organization: { $regex: `.*${searchQuery}.*`, $options: "i" } },
          { city: { $regex: `.*${searchQuery}.*`, $options: "i" } },
          { description: { $regex: `.*${searchQuery}.*`, $options: "i" } },
        ],
      });

      return events;
    } catch (error) {
      throw error;
    }
  }

  async getEventsOfUser(userId){
    try {
        const events = await Event.find({ owner: userId });
        return events;
      } catch (error) {
        throw error;
      }
  }

  async getUserEvents(userId) {
    try {
     
      const user = await User.findById(userId).populate('joinedEvents');

      if (!user) {
        throw new Error('User not found');
      }

      return user.joinedEvents;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new EventService();
