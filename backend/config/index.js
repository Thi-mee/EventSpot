const config = require('../env');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
	// JWT Strategy
	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: config.secret
			},
			(jwt_payload, done) => {
				User.findById(jwt_payload.id)
					.then((user) => {
						if (user) {
							return done(null, user);
						}
						return done(null, false);
					})
					.catch((err) => {
						return done(err, false);
					});
			}
		)
	);

	// Local Strategy
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			(email, password, done) => {
				User.findOne({email})
					.then((user) => {
						if (!user) {
							return done(null, false, {message: 'User not found'});
						}
						user.comparePassword(password, (err, isMatch) => {
							if (isMatch && !err) {
								return done(null, user);
							} else {
								return done(null, false, {message: 'Wrong Password'})
							}
						});
					})
					.catch((err) => {
						return done(err);
					});
			}
		)
	);
};

	
