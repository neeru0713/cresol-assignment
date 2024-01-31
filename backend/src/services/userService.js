const User = require("../models/User");

class UserService {
  async registerUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async pushNotification(userId, title) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      user.notifications.push({ title });

      await user.save();

      return { message: "Notification added successfully", user };
    } catch (error) {
      console.error("Error pushing notification:", error);
      throw new Error("Internal Server Error");
    }
  }

  async getAllNotifications(userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const notifications = user.notifications;

      return notifications;
    } catch (error) {
      console.error("Error getting notifications:", error);
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = new UserService();
