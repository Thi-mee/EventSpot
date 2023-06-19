const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: {
    type: String,
    default: 'user',
  },
  favouriteEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});


module.exports = mongoose.model('User', UserSchema);
