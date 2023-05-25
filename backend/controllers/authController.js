
const jwt = require('jsonwebtoken');
const config = require('../env');
const User = require('../models/User');


module.exports = {
  async registerUser(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'User already exists' });
      }

      const newUser = new User({ email, password });
      await newUser.save();

      return res.json({ success: true, message: 'User registered successfully' });
    } catch (err) {
      next(err);
      // return res.status(500).json({ success: false, message: 'Failed to register user' });
    }
  },

  async loginUser(req, res, next) {
    try {
      await passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
          return res.status(401).json({ success: false, message: 'Authentication failed' });
        }

        const token = jwt.sign({ id: user._id }, config.secret);
        return res.json({ success: true, token: `Bearer ${token}` });
      });
    } catch (err) {
      next(err);
      // return res.status(500).json({ success: false, message: 'Failed to authenticate' });
    }
  }

}