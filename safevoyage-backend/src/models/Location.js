const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  touristId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lat: Number,
  lon: Number,
  score: Number
}, { timestamps: true });

module.exports = mongoose.model("Location", LocationSchema);
