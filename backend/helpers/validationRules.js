const reservationRules = {
  seats: 'required|integer|minValue:1',
  event: 'required|objectId',
};

const reservationErrorMessages = {
  'required.seats': 'The seats field is required.',
  'integer.seats': 'The seats must be an integer.',
  'minValue.seats': 'The seats must be at least 1.',
  'required.event': 'The event ID field is required.',
  'objectId.event': 'The event ID must be a valid ID.',
};

const eventRules = {
  name: 'required|min:3|max:255',
  description: 'required|min:3|max:255',
  category: 'required|in:music,sports,arts,food,business,tech,other',
  type: 'required|in:online,in-person,hybrid',
  location: 'required_if:type,in-person|required_if:type,hybrid|min:3|max:255',
  date: 'required|date',
  time: 'required|time',
  organizerId: 'required|objectId',
  totalNumberOfSeats: 'required|integer|minValue:1'
};

const eventErrorMessages = {
  'required.name': 'The name field is required.',
  'min.name': 'The name must be at least 3 characters.',
  'max.name': 'The name may not be greater than 255 characters.',
  'required.description': 'The description field is required.',
  'min.description': 'The description must be at least 3 characters.',
  'max.description': 'The description may not be greater than 255 characters.',
  'required.category': 'The category field is required.',
  'in.category': 'The category must be one of the following: music, sports, arts, food, business, tech, other.',
  'required.type': 'The type field is required.',
  'in.type': 'The type must be one of the following: online, in-person, hybrid.',
  'required.location': 'The location field is required.',
  'min.location': 'The location must be at least 3 characters.',
  'max.location': 'The location may not be greater than 255 characters.',
  'required_if.location': 'The location field is required.',
  'required.date': 'The date field is required.',
  'date.date': 'The date must be a valid date.',
  'required.time': 'The time field is required.',
  'time.time': 'The time must be a valid time.',
  'required.organizerId': 'The organizer ID field is required.',
  'objectId.organizerId': 'The organizer ID must be a valid ID.',
  'required.totalNumberOfSeats': 'The total number of seats field is required.',
  'integer.totalNumberOfSeats': 'The total number of seats must be an integer.',
  'minValue.totalNumberOfSeats': 'The total number of seats must be at least 1.'
};

const userRules = {
  name: 'required|min:3|max:255',
  email: 'required|email',
};

const userErrorMessages = {
  'required.name': 'The name field is required.',
  'email.email': 'The email must be a valid email address.',
  'min.name': 'The name must be at least 3 characters.',
  'max.name': 'The name may not be greater than 255 characters.',
};
  
const organizerRules = {
  name: 'required|min:3|max:255',
  email: 'required|email',
  phoneNo: 'integer|minValue:1000000000|maxValue:99999999999',
};

const organizerErrorMessages = {
  'required.name': 'The name field is required.',
  'email.email': 'The email must be a valid email address.',
  'min.name': 'The name must be at least 3 characters.',
  'max.name': 'The name may not be greater than 255 characters.',
  'integer.phoneNo': 'The phone number must be an integer.',
};

const guestRules = {
  name: 'required|min:3|max:255',
  email: 'required|email',
  eventId: 'required|objectId',
  seats: 'required|integer|minValue:1',
};

const guestErrorMessages = {
  'required.name': 'The name field is required.',
  'email.email': 'The email must be a valid email address.',
  'min.name': 'The name must be at least 3 characters.',
  'max.name': 'The name may not be greater than 255 characters.',
  'required.event': 'The event ID field is required.',
  'objectId.event': 'The event ID must be a valid ID.',
  'required.seats': 'The seats field is required.',
  'integer.seats': 'The seats must be an integer.',
  'minValue.seats': 'The seats must be at least 1.',
};

const userRegRules = {
  name: 'required|min:3|max:255',
  email: 'required|email',
  password: 'required|min:8',
  password_confirmation: 'required|same:password',
};

const userRegErrorMessages = {
  'required.name': 'The name field is required.',
  'email.email': 'The email must be a valid email address.',
  'min.name': 'The name must be at least 3 characters.',
  'max.name': 'The name may not be greater than 255 characters.',
  'required.password': 'The password field is required.',
  'min.password': 'The password must be at least 8 characters.',
  'required.password_confirmation': 'The password confirmation field is required.',
  'same.password_confirmation': 'The password confirmation does not match.',
};

const organizerRegRules = {
  name: 'required|min:3|max:255',
  email: 'required|email',
  phoneNo: 'integer|minValue:1000000000|maxValue:99999999999',
  password: 'required|min:8',
  password_confirmation: 'required|same:password',
};

const organizerRegErrorMessages = {
  'required.name': 'The name field is required.',
  'email.email': 'The email must be a valid email address.',
  'min.name': 'The name must be at least 3 characters.',
  'max.name': 'The name may not be greater than 255 characters.',
  'integer.phoneNo': 'The phone number must be an integer.',
  'required.password': 'The password field is required.',
  'min.password': 'The password must be at least 8 characters.',
  'required.password_confirmation': 'The password confirmation field is required.',
  'same.password_confirmation': 'The password confirmation does not match.',
};

const loginRules = {
  email: 'required|email',
  password: 'required|min:8',
};

const loginErrorMessages = {
  'required.email': 'The email field is required.',
  'email.email': 'The email must be a valid email address.',
  'required.password': 'The password field is required.',
  'min.password': 'The password must be at least 8 characters.',
};



module.exports = {
  reservationRules,
  reservationErrorMessages,
  eventRules,
  eventErrorMessages,
  userRules,
  userErrorMessages,
  organizerRules,
  organizerErrorMessages,
  guestRules,
  guestErrorMessages,
  userRegRules,
  userRegErrorMessages,
  organizerRegRules,
  organizerRegErrorMessages,
  loginRules,
  loginErrorMessages,
};