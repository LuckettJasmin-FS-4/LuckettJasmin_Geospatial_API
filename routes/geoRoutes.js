const express = require("express");
const router = express.Router();

const {
  fetchGeoData,
  createGeoData,
  getAllGeoData,
  getGeoDataById
} = require("../controllers/geoController");

router.get("/fetch", fetchGeoData);
router.post("/", createGeoData);
router.get("/", getAllGeoData);
router.get("/:id", getGeoDataById);

module.exports = router;