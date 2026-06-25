const GeoData = require("../models/GeoData");

// GET /api/geo-data/fetch
exports.fetchGeoData = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Latitude and longitude are required."
      });
    }

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching geospatial data",
      error: error.message
    });
  }
};

// POST /api/geo-data
exports.createGeoData = async (req, res) => {
  try {
    const geoData = await GeoData.create(req.body);

    res.status(201).json({
      message: "Geospatial data saved successfully",
      id: geoData._id
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving geospatial data",
      error: error.message
    });
  }
};

// GET /api/geo-data
exports.getAllGeoData = async (req, res) => {
    try {
      const {
        minTemp,
        maxTemp,
        latitude,
        longitude,
        select,
        sort,
        page = 1,
        limit = 5
      } = req.query;
  
      let filter = {};
  
      if (minTemp || maxTemp) {
        filter.temperature = {};
        if (minTemp) filter.temperature.$gte = Number(minTemp);
        if (maxTemp) filter.temperature.$lte = Number(maxTemp);
      }
  
      if (latitude) {
        filter.latitude = {
          $gte: Number(latitude) - 1,
          $lte: Number(latitude) + 1
        };
      }
  
      if (longitude) {
        filter.longitude = {
          $gte: Number(longitude) - 1,
          $lte: Number(longitude) + 1
        };
      }
  
      let query = GeoData.find(filter);
  
      if (select === "hideVersion") {
        query = query.select("-__v");
      }
  
      if (sort === "temperature") {
        query = query.sort({ temperature: 1 });
      } else if (sort === "newest") {
        query = query.sort({ createdAt: -1 });
      }
  
      const data = await query
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving geospatial data",
        error: error.message
      });
    }
  };

// GET /api/geo-data/:id
exports.getGeoDataById = async (req, res) => {
  try {
    const data = await GeoData.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Geospatial data not found"
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving geospatial data",
      error: error.message
    });
  }
};