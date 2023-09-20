const jwt = require("jsonwebtoken");
module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/users/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    // const token = jwt.sign({ _id: req.user._id }, process.env.TOKEN_SECRET);
    // res.header("auth-token", token).send(token);

    res.redirect("/dashboard");
  },
};
