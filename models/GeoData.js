const mongoose = require("mongoose");

const GeoDataSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  temperature: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("GeoData", GeoDataSchema);