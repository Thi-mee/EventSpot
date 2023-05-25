const router = require('express').Router();
const passport = require('passport');
const registerUser = require('../controllers/authController').registerUser;
const loginUser = require('../controllers/authController').loginUser;

// Register
router.post('/register', async (req, res) => {
  const { success, message, err } = await registerUser(req.body);
  if (success) {
    return res.json({ success: true, message });
  }
  if (err === 500) {
    return res.status(500).json({ success: false, message });
  }
  if (err === 409) {
    return res.status(409).json({ success: false, message });
  }
});

// Login
router.post('/login', (req, res) => {
  const { success, token, err, message } = loginUser();

  if (success) {
    return res.json({ success: true, token: `Bearer ${token}` });
  }

  if (err === 500) {
    return res.status(500).json({ success: false, message });
  }

  if (err === 401) {
    return res.status(401).json({ success: false, message });
  }
});

// Protected route
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ success: true, message: 'You have access to this protected route' });
});

module.exports = router;
