const userService = require('../services/userService');

class UserController {
  async registerUser(req, res) {
    try {
      const user = await userService.registerUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new UserController();
