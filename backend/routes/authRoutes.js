const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");


// Register
router.post("/user/register", authController.registerUser);
router.post("/organizer/register", authController.registerOrganizer);

// Login
router.post(
  "/user/login",
  passport.authenticate("user", { session: false }),
  authController.loginUser
);

router.post(
  "/organizer/login",
  passport.authenticate("organizer", { session: false }),
  authController.loginOrganizer
);

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json(req.user);
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout(() => console.log("User logged out"));
  res.json({ success: true, message: "You have successfully logged out" });
});

module.exports = router;
