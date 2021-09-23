const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// display login page
router.get("/login", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

/*
- This route will return a template to enter 'email' and 'password' to Login,
- If you are previously using google account in chrome it will logged you in without entering 'email' & 'password'
*/
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth" }),
  (req, res) => {
    console.log(" -------------- successful login -------------- ");
    res.redirect("/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
