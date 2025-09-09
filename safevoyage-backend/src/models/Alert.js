const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  touristId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["panic", "geo-fence", "anomaly"], required: true },
  location: {
    lat: { type: Number },
    lon: { type: Number },
  },
  status: { type: String, default: "active" }
}, { timestamps: true });

module.exports = mongoose.model("Alert", alertSchema);
