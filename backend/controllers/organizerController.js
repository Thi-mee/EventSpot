const Organizer = require('../models/Organizer');
const Reservation = require('../models/Reservation');
const Event = require('../models/Event');
const Validator = require('../helpers/validator');
const { organizerRules, organizerErrorMessages } = require('../helpers/validationRules');

// Get an organizer's profile by ID
const getOrganizerById = async (req, res, next) => {
  try {
    const organizer = await Organizer.findById(req.params.id).populate('eventsId', 'name description category type location date time');
    res.json({ success: true, organizer });
  } catch (error) {
    next(error);
  }
}



// Update an organizer's profile by ID
const updateOrganizerById = async (req, res, next) => {
  try {
    const validator = new Validator(req.body, organizerRules, organizerErrorMessages);

    if (validator.passes()) {
      const organizer = req.user;
      organizer.name = req.body.name;
      organizer.email = req.body.email;
      organizer.phoneNo = req.body.phoneNo;
      await organizer.save();
      res.json({ success: true, organizer });
    }
    else {
      res.status(422).json({ success: false, message: validator.errors() });
    }
  } catch (error) {
    next(error);
  }
}

// Get a list of all events for an organizer
const getOrganizerEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ organizerId: req.user._id });
    res.json({ success: true, events });
  } catch (error) {
    next(error);
  }
}

// Get a list of all reservations for an event
const getEventReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ eventId: req.params.eventId }).populate('userId', 'name email');
    res.json({ success: true, reservations });
  } catch (error) {
    next(error);
  }
}


module.exports = {
  getOrganizerById,
  updateOrganizerById,
  getOrganizerEvents,
  getEventReservations
};