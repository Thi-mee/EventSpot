const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  seats: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
});

module.exports = mongoose.model('Reservation', ReservationSchema);