# Geospatial Data API

## Overview

This project is a RESTful API built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**. The application retrieves geospatial weather information using the Open-Meteo API and stores geospatial data in MongoDB. It also includes a second Location model for storing location information.

The API demonstrates MongoDB query operators, filtering with query strings, sorting, field selection, pagination, and error handling.

---

# Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* cors
* Open-Meteo API

---

# API Used

**Open-Meteo API**

Documentation:

https://open-meteo.com/en/docs

Example API Request:

https://api.open-meteo.com/v1/forecast?latitude=29.95&longitude=-90.07&current=temperature_2m

No API key is required.

---

# Project Structure

```
config/
controllers/
models/
routes/
server.js
README.md
package.json
```

---

# MongoDB Models

## GeoData

Stores:

* Latitude
* Longitude
* Temperature
* Created Date

## Location

Stores:

* Location Name
* Latitude
* Longitude
* Country
* Created Date

---

# API Routes

## GeoData Routes

### GET /api/geo-data/fetch

Retrieves live weather data from the Open-Meteo API using latitude and longitude.

Example:

```
GET /api/geo-data/fetch?latitude=29.95&longitude=-90.07
```

---

### POST /api/geo-data

Saves geospatial data to MongoDB.

Example JSON:

```json
{
  "latitude": 29.95,
  "longitude": -90.07,
  "temperature": 82
}
```

---

### GET /api/geo-data

Returns all stored GeoData.

Supports:

* Query operators (`$gte`, `$lte`)
* select()
* sort()
* Pagination

Example:

```
GET /api/geo-data?minTemp=60&maxTemp=90&sort=temperature&select=hideVersion&page=1&limit=5
```

---

### GET /api/geo-data/:id

Returns one GeoData document by MongoDB ID.

---

# Location Routes

### POST /api/locations

Creates a new location.

Example JSON:

```json
{
  "locationName": "New Orleans",
  "latitude": 29.95,
  "longitude": -90.07,
  "country": "USA"
}
```

---

### GET /api/locations

Returns all stored locations.

Supports:

* Query string filtering
* select()
* sort()
* Pagination

Example:

```
GET /api/locations?country=USA&sort=name&select=hideVersion&page=1&limit=5
```

---

# Features

* RESTful API
* MongoDB with Mongoose
* External API integration
* Query string filtering
* MongoDB Query Operators (`$gte`, `$lte`)
* Field selection using `select()`
* Sorting using `sort()`
* Pagination using `skip()` and `limit()`
* Error handling with HTTP status codes

---

# Running the Project

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=mongodb://127.0.0.1:27017/geospatialDB
```

Start the server:

```bash
node server.js
```

Server:

```
http://localhost:3000
```

---

# Author

Jasmin Luckett

Full Sail University

Web Development Program
