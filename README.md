# Geospatial Data API

## Overview

This project is a Node.js and Express API that integrates with the Open-Meteo Geospatial API and MongoDB. The application allows users to retrieve geospatial weather data, store it in a MongoDB database, and retrieve stored records through RESTful API endpoints.

This project was created for the 3.3 Geospatial Data API assignment.

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Open-Meteo API
* dotenv
* cors

---

## API Used

### Open-Meteo API

Documentation:
https://open-meteo.com/en/docs

Example Request:

https://api.open-meteo.com/v1/forecast?latitude=29.95&longitude=-90.07&current=temperature_2m

No API key is required.

---

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate into the project folder:

```bash
cd LuckettJasmin_Geospatial_API
```

3. Install dependencies:

```bash
npm install
```

4. Create a .env file and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

5. Start the server:

```bash
node server.js
```

---

## Project Structure

```text
project-root
│
├── config
│   └── db.js
│
├── controllers
│   └── geoController.js
│
├── models
│   └── GeoData.js
│
├── routes
│   └── geoRoutes.js
│
├── .env
├── server.js
└── README.md
```

---

## Routes

### GET /api/geo-data/fetch

Retrieves geospatial weather data from the Open-Meteo API.

Query Parameters:

* latitude
* longitude

Example:

```http
GET /api/geo-data/fetch?latitude=29.95&longitude=-90.07
```

---

### POST /api/geo-data

Stores geospatial data in MongoDB.

Example Request Body:

```json
{
  "latitude": 29.95,
  "longitude": -90.07,
  "temperature": 85
}
```

Example Response:

```json
{
  "message": "Saved",
  "id": "mongodb_document_id"
}
```

---

### GET /api/geo-data

Retrieves all stored geospatial data from MongoDB.

Example:

```http
GET /api/geo-data
```

---

### GET /api/geo-data/:id

Retrieves a specific geospatial data record by MongoDB ID.

Example:

```http
GET /api/geo-data/6856a123456789abcdef1234
```

---

## Error Handling

The application includes error handling for:

* Invalid API requests
* MongoDB connection errors
* Invalid MongoDB IDs
* Server errors

Appropriate HTTP status codes and error messages are returned.

---

## Author

Jasmin Luckett

Full Sail University

Web Development Program
# LuckettJasmin_Geospatial_API
