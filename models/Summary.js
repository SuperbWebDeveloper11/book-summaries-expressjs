const mongoose = require("mongoose");

const SummarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  quickDescription: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Summary", SummarySchema);
