const Event = require('../models/Event');

// Create a new event
const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, seats } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      seats,
      organizer: req.user._id, // Assuming you're using passport for authentication and storing user in req.user
      reservations: [],
    });

    await newEvent.save();

    res.json({ success: true, message: 'Event created successfully', event: newEvent });
  } catch (error) {
    next(error);
  }
};

// Get all events
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('organizer', 'name email');
    res.json({ success: true, events });
  } catch (error) {
    next(error);
  }
};

// Get an event by ID
const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name email');
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// Update an event by ID
const updateEventById = async (req, res, next) => {
  try {
    const { title, description, date, seats } = req.body;

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.seats = seats;
    await event.save();

    res.json({ success: true, message: 'Event updated successfully', event });
  } catch (error) {
    next(error);
  }
};

// Delete an event by ID
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

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
