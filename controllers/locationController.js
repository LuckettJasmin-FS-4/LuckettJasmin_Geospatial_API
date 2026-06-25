const Location = require("../models/location");

// POST /api/locations
exports.createLocation = async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json({
      message: "Location saved successfully",
      id: location._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/locations
exports.getAllLocations = async (req, res) => {
  try {
    const {
      country,
      minLat,
      maxLat,
      select,
      sort,
      page = 1,
      limit = 5
    } = req.query;

    let filter = {};

    if (country) {
      filter.country = country;
    }

    if (minLat || maxLat) {
      filter.latitude = {};
      if (minLat) filter.latitude.$gte = Number(minLat);
      if (maxLat) filter.latitude.$lte = Number(maxLat);
    }

    let query = Location.find(filter);

    if (select === "hideVersion") {
      query = query.select("-__v");
    }

    if (sort === "name") {
      query = query.sort({ locationName: 1 });
    } else if (sort === "newest") {
      query = query.sort({ createdAt: -1 });
    }

    const locations = await query
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};