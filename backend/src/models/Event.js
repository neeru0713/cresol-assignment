const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  organization: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  genre: {
    type: String,
  },
  price: {
    type: Number,
    min: 0,
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  feedbacks: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      message: {
        type: String,
      },
    },
  ],
  maximumAllowed: {
    type: Number,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
