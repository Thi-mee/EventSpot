const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Organizer model
const OrganizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
  eventsId: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event'
  }],
  role: {
    type: String,
    default: 'organizer',
  }
});

OrganizerSchema.plugin(passportLocalMongoose, { usernameField: 'email' });


module.exports = mongoose.model('Organizer', OrganizerSchema);