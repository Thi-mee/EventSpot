const User = require('../models/User');
const Reservation = require('../models/Reservation');
const Validator = require('../helpers/validator');
const { userRules, userErrorMessages } = require('../helpers/validationRules');

// Get a user's profile by ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('favouriteEvents', 'name description category type location date time');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
}

// Update a user's profile by ID
const updateUserById = async (req, res, next) => {
  try {
    const validator = new Validator(req.body, userRules, userErrorMessages);

    if (validator.passes()) {
      const user = req.user;
      user.name = req.body.name;
      user.email = req.body.email;
      await user.save();
      res.json({ success: true, user });
    }
    else {
      res.status(422).json({ success: false, message: validator.errors() });
    }
  } catch (error) {
    next(error);
  }
}

// Get a list of all reservations for a user
const getUserReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ userId: req.user._id }).populate('event', 'name description category type location date time');
    res.json({ success: true, reservations });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserById,
  updateUserById,
  getUserReservations
};