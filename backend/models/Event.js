const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    required: true,
    enum: ['music', 'sports', 'arts', 'food', 'business', 'tech', 'other']
  },
  type: {
    type: String,
    required: true,
    enum: ['online', 'in-person', "hybrid"]
  },
  location: {
    type: String,
    required: function () {
      return this.type !== 'remote';
    }
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizer',
    required: true
  },
  totalNumberOfSeats: { type: Number },
});

module.exports = mongoose.model('Event', eventSchema);
