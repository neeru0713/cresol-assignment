const User = require('../models/User');

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
}

module.exports = new UserService();
