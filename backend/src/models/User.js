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
  city: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["organizer", "attendee"],
    default: "attendee",
  },
  joinedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
