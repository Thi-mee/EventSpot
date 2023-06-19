	const User = require('../models/User');
	const Organizer = require('../models/Organizer');
	const JwtStrategy = require('passport-jwt').Strategy;
	const ExtractJwt = require('passport-jwt').ExtractJwt;

	module.exports = function (passport) {




		// JWT Strategy
		passport.use(
			"jwt",
			new JwtStrategy(
				{
					jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
					secretOrKey: process.env.JWT_SECRET,
				},
				(jwt_payload, done) => {
					const { id, role } = jwt_payload;
					console.log(id, role);
					if (role === 'user') {
						User.findById(id)
							.then((user) => {
								if (user) {
									done(null, user);
								}
								else done(null, false);
							})
							.catch((err) => {
								done(err, false);
							});
					} else if (role === 'organizer') {
						Organizer.findById(id)
							.then((organizer) => {
								if (organizer) {
									done(null, organizer);
								}
								else done(null, false);
							})
							.catch((err) => {
								done(err, false);
							});
					}

				}
			)
		);


		// Local Strategy
		passport.use("user", User.createStrategy());
		passport.use("organizer", Organizer.createStrategy());

		// Serialize and deserialize user for all models
		passport.serializeUser(function (user, done) {
			done(null, user.id);
		});

		passport.deserializeUser(function (id, done) {
			User.findById(id)
				.then((user) => {
					if (user) {
						done(null, user);
					} else {
						Organizer.findById(id)
							.then((user) => {
								if (user) {
									done(null, user);
								}
							})
							.catch((err) => {
								done(err, false);
							});
					}
				})
				.catch((err) => {
					done(err, false);
				});
		});

	};


