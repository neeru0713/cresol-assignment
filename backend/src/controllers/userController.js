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

  async pushNotification(req, res) {
    try {
      const { userId } = req.params;
      const { title } = req.body;
  
      const result = await userService.pushNotification(userId, title);

      res.status(201).json({ message: 'Notification added successfully', result });
    } catch (error) {
      console.error('Error pushing notification:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

async getAllNotifications(req, res){
    try {
      const { userId } = req.params;
  
      const notifications = await userService.getAllNotifications(userId);
  
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error getting notifications:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
}

module.exports = new UserController();
