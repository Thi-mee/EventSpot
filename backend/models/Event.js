const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seats: { type: Number, required: true },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
