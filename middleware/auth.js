module.exports = {
  // if user is not authenticated redirect to "/"
  ensureAuth: function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect("/auth/login");
    } else {
      return next();
    }
  },
  ensureGuest: function (req, res, next) {
    // if user is authenticated redirect to "/dashboard"
    if (req.isAuthenticated()) {
      res.redirect("/dashboard");
    } else {
      return next();
    }
  },
};
