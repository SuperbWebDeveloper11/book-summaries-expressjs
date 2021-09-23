const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Summary = require("../models/Summary");

// Get all public summaries
router.get("/", async (req, res) => {
  try {
    const summaries = await Summary.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    const context = {
      summaries,
    };
    res.render("summaries/summaries", context);
  } catch (err) {
    const context = {
      errorMessage: "something went wrong when retrieving summaries",
    };
    res.render("error/500", context);
  }
});

// Get summaries for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const summaries = await Summary.find({
      user: req.params.userId,
      status: "public",
    })
      .populate("user")
      .lean();
    const context = {
      summaries,
    };
    res.render("summaries/index", context);
  } catch (err) {
    const context = {
      errorMessage: "something went wrong when retrieving summaries",
    };
    res.render("error/500", context);
  }
});

// Add new summary (when get request)
router.get("/add", ensureAuth, (req, res) => {
  res.render("summaries/add");
});

// Get a specific summary by id
router.get("/:id", async (req, res) => {
  try {
    let summary = await Summary.findById(req.params.id).populate("user").lean();

    if (summary.user._id != req.user.id && summary.status == "private") {
      throw "exception thrown";
      // res.render("error/404");
    }
    res.render("summaries/show", {
      summary,
    });
  } catch (err) {
    const context = {
      errorMessage: "something went wrong when retrieving summary",
    };
    res.render("error/500", context);
  }
});

// Add new summary (when post request)
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Summary.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});
// Edit specific summary by id (when get request)
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const summary = await Summary.findOne({
      _id: req.params.id,
    }).lean();

    if (!summary) {
      return res.render("error/404");
    }

    if (summary.user != req.user.id) {
      res.redirect("/summaries");
    } else {
      res.render("summaries/edit", {
        summary,
      });
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// Edit specific summary by id (when post request)
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let summary = await Summary.findById(req.params.id).lean();

    if (!summary) {
      return res.render("error/404");
    }

    if (summary.user != req.user.id) {
      res.redirect("/summaries");
    } else {
      summary = await Summary.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// Delete specific summary by id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    let summary = await Summary.findById(req.params.id).lean();

    if (!summary) {
      return res.render("error/404");
    }

    if (summary.user != req.user.id) {
      res.redirect("/summaries");
    } else {
      await Summary.remove({ _id: req.params.id });
      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

module.exports = router;
