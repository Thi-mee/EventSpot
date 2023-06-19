const router = require('express').Router();
const passport = require('passport');
const eventController = require('../controllers/eventController');
const authorize = require('../middlewares/authorization');

// Create a new event
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorize('organizer'),
  eventController.createEvent
);

// Get an event's details
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize('user'),
  eventController.getEventById
);

// Update an event details
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize('organizer'),
  eventController.updateEventById
);

// Delete an event
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize('organizer'),
  eventController.deleteEventById
);


// Get a list of all events
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorize('user'),
  eventController.getAllEvents
);


module.exports = router;
