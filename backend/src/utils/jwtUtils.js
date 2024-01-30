const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ user }, 'cresolsecret', {
    expiresIn: '1h', 
  });
};

module.exports = {
  generateToken,
};
