const router = require('express').Router();
const passport = require('passport');
const organizerController = require('../controllers/organizerController');
const authorize = require('../middlewares/authorization');


// Get a organizer's profile by ID
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize('organizer'),
  organizerController.getOrganizerById
)

// Update a organizer's profile by ID
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize('organizer'),
  organizerController.updateOrganizerById
)

//  Get a list of all events for an organizer
router.get(
  '/:id/events',
  passport.authenticate('jwt', { session: false }),
  authorize('organizer'),
  organizerController.getOrganizerEvents
)

// Get a list of all reservations for an event
router.get(
  '/:id/events/:eventId/reservations',
  passport.authenticate('jwt', { session: false }),
  authorize('organizer'),
  organizerController.getEventReservations
)


module.exports = router;