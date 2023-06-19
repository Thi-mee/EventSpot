const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const authorize = require('../middlewares/authorization');


// Get a user's profile by ID
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize('user'),
  userController.getUserById
)

// Update a user's profile by ID
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize('user'),
  userController.updateUserById
)

// Get a list of all reservations for a user
router.get(
  '/:id/reservations',
  passport.authenticate('jwt', { session: false }),
  authorize('user'),
  userController.getUserReservations
)


module.exports = router;