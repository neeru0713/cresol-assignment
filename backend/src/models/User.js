const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['organizer', 'attendee'],
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
