const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ user }, 'cresolsecret', {
    expiresIn: '24h', 
  });
};

module.exports = {
  generateToken,
};
