# LuckettJasmin Geospatial API & Full Stack Application

## Overview

This project is a Full Stack MERN application built for Full Sail University.

The backend is a Node.js and Express REST API that stores geospatial and weather information in MongoDB using Mongoose.

The frontend is built with React and Vite and communicates with the backend using Axios.

The project demonstrates:

- REST API development
- MongoDB and Mongoose integration
- React frontend
- Axios API communication
- Query operators
- Pagination
- Sorting
- Unit testing with Jest

---

# Technologies Used

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors

## Frontend

- React
- Vite
- Axios

## Testing

- Jest
- Supertest

---

# Project Structure

```
LuckettJasmin_Geospatial_API

client/
    src/
    public/

controllers/
models/
routes/
config/
__tests__/

server.js
package.json
README.md
```

---

# Features

## Location Collection

- Create Location
- Get All Locations
- Query by Country
- Sort by Name
- Pagination
- Select Fields

## Geo Data Collection

- Create Weather Data
- Temperature Filtering
- Query Operators
- Pagination
- Sort Ascending
- Sort Descending
- Field Selection

---

# Mongo Query Operators

The API supports:

### Filtering

```
?country=USA
```

```
?minTemp=60
```

```
?maxTemp=90
```

---

### Sorting

Ascending

```
?sort=temperature
```

Descending

```
?sort=newest
```

---

### Pagination

```
?page=1&limit=5
```

---

### Select

```
?select=hideVersion
```

---

# API Endpoints

## Locations

### GET

```
GET /api/locations
```

### POST

```
POST /api/locations
```

---

## Geo Data

### GET

```
GET /api/geo-data
```

Supports

- minTemp
- maxTemp
- sort
- page
- limit
- select

### POST

```
POST /api/geo-data
```

---

# Running the Backend

Install dependencies

```
npm install
```

Start server

```
node server.js
```

Server

```
http://localhost:3000
```

---

# Running the React Client

Move into client folder

```
cd client
```

Install packages

```
npm install
```

Run Vite

```
npm run dev
```

Client

```
http://localhost:5173
```

---

# Running Unit Tests

```
npm test
```

Current Jest Tests

- Query String and Select
- Query with Max Temperature
- Pagination
- Pagination First Page
- Sort Ascending
- Sort Descending (Newest First)

All tests pass successfully.

---

# Example Request

```
GET /api/geo-data?minTemp=60&maxTemp=90&sort=temperature&page=1&limit=5&select=hideVersion
```

---

# Future Improvements

- Update Locations
- Delete Locations
- Update Geo Data
- Delete Geo Data
- Better UI Styling
- Charts and Maps
- Search Component
- Loading Indicators
- Error Messages

---

# Author

Jasmin Luckett

Full Sail University

Web Development Program

---

# Assignment Objectives Completed

Express REST API

MongoDB Integration

Mongoose Models

Query Operators

Pagination

Sorting

Field Selection

React Frontend

Axios Integration

Jest Unit Testing

 Modular Code Structure

GitHub Repository

 README Documentation