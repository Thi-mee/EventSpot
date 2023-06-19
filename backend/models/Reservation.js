const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: () => this.name ? false : true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  seats: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  name: { type: String, required: () => this.userId ? false : true },
  email: { type: String, required: () => this.userId ? false : true },
});

module.exports = mongoose.model('Reservation', ReservationSchema);