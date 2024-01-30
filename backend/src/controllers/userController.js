const userService = require('../services/userService');
const { generateToken } = require('../utils/jwtUtils');
class UserController {
  async registerUser(req, res) {
    try {
      const user = await userService.registerUser(req.body);
      const token = generateToken(user);
      res.status(201).json({user, token});
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new UserController();
