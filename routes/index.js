const express = require("express");
const router = express.Router();
const Summary = require("../models/Summary");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Index route
router.get("/", (req, res) => {
  res.render("index");
});

// Dashboard route
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const summaries = await Summary.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      firstName: req.user.firstName,
      summaries,
    });
  } catch (error) {
    console.log(error);
    res.render("error/500");
  }
});

module.exports = router;
