const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Organizer = require("../models/Organizer");
const AuthSuccessResponse =
  require("../helpers/authHelper").AuthSuccessResponse;
const Validator = require("../helpers/validator");
const {
  userRegErrorMessages,
  userRegRules,
  organizerRegErrorMessages,
  organizerRegRules,
} = require("../helpers/validationRules");

module.exports = {
  async registerUser(req, res, next) {
    try {
      const validator = new Validator(
        req.body,
        userRegRules,
        userRegErrorMessages
      );

      if (!validator.passes()) {
        res.status(400).json({ success: false, message: validator.errors() });
      } else {
        const { email, password, name } = req.body;
        User.register(new User({ email, name }), password, (err, user) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: "User already exists" });
          }
          req.login(user, { session: false }, (err) => {
            if (err) {
              return next(err);
            }
            const token = jwt.sign(
              { id: user._id, role: user.role },
              process.env.JWT_SECRET,
              { expiresIn: "10h" }
            );
            return res.json(new AuthSuccessResponse(token, user));
          });
        });
      }
    } catch (err) {
      next(err);
    }
  },

  async registerOrganizer(req, res, next) {
    try {
      const validator = new Validator(
        req.body,
        organizerRegRules,
        organizerRegErrorMessages
      );

      if (!validator.passes()) {
        res.status(400).json({ success: false, message: validator.errors() });
      } else {
        const { email, password, name, phoneNo } = req.body;
        Organizer.register(
          new Organizer({ email, name, phoneNo }),
          password,
          (err, organizer) => {
            if (err) {
              return res
                .status(400)
                .json({ success: false, message: "Organizer already exists" });
            }
            req.login(organizer, { session: false }, (err) => {
              if (err) {
                return next(err);
              }
              const token = jwt.sign(
                { id: organizer._id, role: organizer.role },
                process.env.JWT_SECRET,
                { expiresIn: "10h" }
              );
              return res.json(new AuthSuccessResponse(token, organizer));
            });
          }
        );
      }
    } catch (err) {
      next(err);
    }
  },

  async loginUser(req, res, next) {
    try {
      const user = req.user;
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "10h" }
      );
      return res.json(new AuthSuccessResponse(token, user));
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  async loginOrganizer(req, res, next) {
    try {
      const organizer = req.user;
      const token = jwt.sign(
        { id: organizer._id, role: organizer.role },
        process.env.JWT_SECRET,
        { expiresIn: "10h" }
      );
      return res.json(new AuthSuccessResponse(token, organizer));
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
