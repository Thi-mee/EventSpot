const router = require('express').Router();
const passport = require('passport');
const reservationController = require('../controllers/reservationController');
const authorize = require('../middlewares/authorization');


// Create a new reservation
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorize('user'),
  reservationController.createReservation
);

// Get a reservation's details
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize('user'),
  reservationController.getReservationById
);

// Update a reservation details
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize('user'),
  reservationController.updateReservationById
);

// Cancel a reservation
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize('user'),
  reservationController.deleteReservationById
);

// create a new reservation as a guest
router.post(
  '/guest',
  reservationController.createReservationAsGuest
);


module.exports = router;