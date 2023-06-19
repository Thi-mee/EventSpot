// an aythorization middleware that reads the users role from req.user.role and checks if it matches the role passed in the parameters

const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  };
}


module.exports = authorize;