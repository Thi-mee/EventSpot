const Event = require('../models/Event');
const Validator = require('../helpers/validator');
const { eventRules, eventErrorMessages } = require('../helpers/validationRules');

// Create a new event
const createEvent = async (req, res, next) => {
  try {
    console.log(req.body)
    const validator = new Validator(req.body, eventRules, eventErrorMessages);

    if (validator.passes()) {
      const newEvent = new Event({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
        totalNumberOfSeats: req.body.totalNumberOfSeats,
        organizerId: req.user._id,
      });
      await newEvent.save();
      res.json({ success: true, message: 'Event created successfully', event: newEvent });
    } else {
      res.status(400).json({ success: false, message: validator.errors() });
    }
  } catch (error) {
    next(error);
  }
};

// Get an event details
const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizerId', 'name email');
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// Update an event details
const updateEventById = async (req, res, next) => {
  try {
    const validator = new Validator(req.body, eventRules, eventErrorMessages);

    if (validator.passes()) {
      const event = await Event.findById(req.params.id);

      event.name = req.body.name;
      event.description = req.body.description;
      event.category = req.body.category;
      event.type = req.body.type;
      event.location = req.body.location;
      event.date = req.body.date;
      event.time = req.body.time;
      event.totalNumberOfSeats = req.body.totalNumberOfSeats;
      await event.save();

      res.json({ success: true, message: 'Event updated successfully', event });
    } else {
      res.status(400).json({ success: false, message: validator.errors() });
    }
  } catch (error) {
    next(error);
  }
};

// Delete an event
const deleteEventById = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get all events
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('organizerId', 'name email');
    res.json({ success: true, events });
  } catch (error) {
    next(error);
  }
};


const getEventByIdG = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizerId', 'name email');
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  getEventByIdG
};