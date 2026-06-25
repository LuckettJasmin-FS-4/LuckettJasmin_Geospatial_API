const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  locationName: String,
  latitude: Number,
  longitude: Number,
  country: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Location", LocationSchema);