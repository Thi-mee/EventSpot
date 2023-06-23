const Reservation = require('../models/Reservation');
const { reservationRules, reservationErrorMessages, guestRules, guestErrorMessages } = require('../helpers/validationRules');
const Validator = require('../helpers/validator');

// Create a new reservation
const createReservation = async (req, res, next) => {
  try {
    const validator = new Validator(req.body, reservationRules, reservationErrorMessages);

    if (validator.passes()) {
      const newReservation = new Reservation({
        userId: req.user._id,
        name: req.user.name,
        email: req.user.email,
        event: req.body.event,
        seats: req.body.seats,
      });
      await newReservation.save();
      res.json({ success: true, message: 'Reservation created successfully', reservation: newReservation });

    } else {
      res.status(422).json(validator.errors());
    }
  } catch (error) {
    next(error);
  }
}

// Get a reservation's details
const getReservationById = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('eventId', 'name description category type location date time')
    res.json({ success: true, reservation });
  } catch (error) {
    next(error);
  }
}

// Update a reservation details
const updateReservationById = async (req, res, next) => {
  try {
    const validator = new Validator(req.body, reservationRules, reservationErrorMessages);

    if (validator.passes()) {
      const reservation = await Reservation.findByIdAndUpdate(
        req.params.id,
        { seats: req.body.seats },
        { new: true }
      );
      res.json({ success: true, message: 'Reservation updated successfully', reservation });
    } else {
      res.status(422).json(validator.errors());
    }
  } catch (error) {
    next(error);
  }
}

// Cancel a reservation
const deleteReservationById = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    await reservation.remove();

    res.json({ success: true, message: 'Reservation cancelled successfully' });
  } catch (error) {
    next(error);
  }
}

// create a new reservation as a guest
const createReservationAsGuest = async (req, res, next) => {
  try {
    const validator = new Validator(req.body, guestRules, guestErrorMessages);
    if (validator.passes()) {
      const newReservation = new Reservation({
        name: req.body.name,
        email: req.body.email,
        event: req.body.eventId,
        seats: req.body.seats,
      });
      await newReservation.save();
      res.json({ success: true, message: 'Reservation created successfully', reservation: newReservation });
    } else {
      res.status(422).json(validator.errors());
    }
  } catch (error) {
    next(error);
  }
}





module.exports = {
  createReservation,
  getReservationById,
  updateReservationById,
  deleteReservationById,
  createReservationAsGuest
};