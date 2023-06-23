const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const app = express();


// Load environment variables
require('dotenv').config();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// Passport middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./config/passport')(passport);

// Logger
app.use((req, res, next) => {
  console.log('\x1b[45m\x1b[30m%s\x1b[0m', 'Request URL:', req.originalUrl, '\x1b[43m\x1b[33m' + 'Request Type:' + '\x1b[0m', req.method);
  next();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/organizers', require('./routes/organizerRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));


// Error handler
app.use((err, req, res, next) => {
  console.log("i am in use")
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    console.log(err);
    res.status(401).json({ error: 'Unauthorized' });
  }
  else {
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

// Connect to MongoDB Atlas
require('./config/db').connectDb();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


module.exports = app;