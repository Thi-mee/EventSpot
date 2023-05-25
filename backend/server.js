const express = require('express');
const mongoose = require('mongoose');
const config = require('./env');
const passport = require('passport');
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// Passport configuration
require('./config')(passport);

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Connect to MongoDB Atlas
mongoose
  .connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('Failed to connect to MongoDB Atlas', err));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
