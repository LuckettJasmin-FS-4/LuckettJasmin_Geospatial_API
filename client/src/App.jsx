import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:3000";

function App() {
  const [geoData, setGeoData] = useState([]);
  const [locations, setLocations] = useState([]);

  const [geoForm, setGeoForm] = useState({
    latitude: "",
    longitude: "",
    temperature: ""
  });

  const [locationForm, setLocationForm] = useState({
    locationName: "",
    latitude: "",
    longitude: "",
    country: ""
  });

  const getGeoData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/geo-data?sort=newest&limit=20`);
      setGeoData(response.data);
    } catch (error) {
      console.error("Error getting geo data:", error);
    }
  };

  const getLocations = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/locations?sort=newest&limit=20`);

     setLocations(response.data);
    } catch (error) {
      console.error("Error getting locations:", error);
    }
  };

  const addGeoData = async (e) => {
    e.preventDefault();
    console.log("GeoData button clicked", geoForm);
  
    if (
      !geoForm.latitude ||
      !geoForm.longitude ||
      !geoForm.temperature
    ) {
      alert("Please fill out all GeoData fields.");
      return;
    }
  
    try {
      await axios.post(`${API_URL}/api/geo-data`, {
        latitude: Number(geoForm.latitude),
        longitude: Number(geoForm.longitude),
        temperature: Number(geoForm.temperature)
      });

      setGeoForm({
        latitude: "",
        longitude: "",
        temperature: ""
      });

      await getGeoData();
    } catch (error) {
      console.log("GeoData error:", error.response?.data || error.message);
    }
  };

  const addLocation = async (e) => {
    e.preventDefault();
    console.log("Location button clicked", locationForm);
  
    if (
      !locationForm.locationName ||
      !locationForm.latitude ||
      !locationForm.longitude ||
      !locationForm.country
    ) {
      alert("Please fill out all Location fields.");
      return;
    }
  
    try {
      await axios.post(`${API_URL}/api/locations`, {
        locationName: locationForm.locationName,
        latitude: Number(locationForm.latitude),
        longitude: Number(locationForm.longitude),
        country: locationForm.country
      });

      setLocationForm({
        locationName: "",
        latitude: "",
        longitude: "",
        country: ""
      });

     await getLocations();
    } catch (error) {
      console.log("Location error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getGeoData();
    getLocations();
  }, []);

  return (
    <div className="app">
      <h1>Geospatial Full Stack App</h1>
      <p>React frontend connected to Node.js, Express, MongoDB, and Mongoose backend.</p>

      <section className="card">
        <h2>Add GeoData</h2>

        <form onSubmit={addGeoData}>
          <input
            type="number"
            step="any"
            placeholder="Latitude"
            value={geoForm.latitude}
            onChange={(e) =>
              setGeoForm({ ...geoForm, latitude: e.target.value })
            }
          />

          <input
            type="number"
            step="any"
            placeholder="Longitude"
            value={geoForm.longitude}
            onChange={(e) =>
              setGeoForm({ ...geoForm, longitude: e.target.value })
            }
          />

          <input
            type="number"
            step="any"
            placeholder="Temperature"
            value={geoForm.temperature}
            onChange={(e) =>
              setGeoForm({ ...geoForm, temperature: e.target.value })
            }
          />

          <button type="submit">Add GeoData</button>
        </form>

        <h3>Saved GeoData</h3>

        {geoData.length === 0 ? (
          <p>No GeoData saved yet.</p>
        ) : (
          <ul>
            {geoData.map((item) => (
              <li key={item._id}>
                Lat: {item.latitude} | Long: {item.longitude} | Temp:{" "}
                {item.temperature}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2>Add Location</h2>

        <form onSubmit={addLocation}>
          <input
            type="text"
            placeholder="Location Name"
            value={locationForm.locationName}
            onChange={(e) =>
              setLocationForm({ ...locationForm, locationName: e.target.value })
            }
          />

          <input
            type="number"
            step="any"
            placeholder="Latitude"
            value={locationForm.latitude}
            onChange={(e) =>
              setLocationForm({ ...locationForm, latitude: e.target.value })
            }
          />

          <input
            type="number"
            step="any"
            placeholder="Longitude"
            value={locationForm.longitude}
            onChange={(e) =>
              setLocationForm({ ...locationForm, longitude: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Country"
            value={locationForm.country}
            onChange={(e) =>
              setLocationForm({ ...locationForm, country: e.target.value })
            }
          />

          <button type="submit">Add Location</button>
        </form>

        <h3>Saved Locations</h3>

        {locations.length === 0 ? (
          <p>No locations saved yet.</p>
        ) : (
          <ul>
            {locations.map((location) => (
              <li key={location._id}>
                {location.locationName} | {location.country} | Lat:{" "}
                {location.latitude} | Long: {location.longitude}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;