const request = require("supertest");
const express = require("express");
const geoRoutes = require("../routes/geoRoutes");
const GeoData = require("../models/GeoData");

jest.mock("../models/GeoData");

const app = express();
app.use(express.json());
app.use("/api/geo-data", geoRoutes);

describe("GeoData Query Endpoint Tests", () => {
  test("returns limited data based on query string and select", async () => {
    GeoData.find.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([
        { latitude: 29.95, longitude: -90.07, temperature: 82 }
      ])
    });

    const response = await request(app).get(
      "/api/geo-data?minTemp=60&maxTemp=90&select=hideVersion"
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("returns pagination using skip and limit", async () => {
    const skipMock = jest.fn().mockReturnThis();
    const limitMock = jest.fn().mockResolvedValue([
      { latitude: 29.95, longitude: -90.07, temperature: 82 }
    ]);

    GeoData.find.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: skipMock,
      limit: limitMock
    });

    const response = await request(app).get("/api/geo-data?page=2&limit=5");

    expect(response.status).toBe(200);
    expect(skipMock).toHaveBeenCalledWith(5);
    expect(limitMock).toHaveBeenCalledWith(5);
  });

  test("returns collection sorted ascending", async () => {
    const sortMock = jest.fn().mockReturnThis();

    GeoData.find.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      sort: sortMock,
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([])
    });

    await request(app).get("/api/geo-data?sort=temperature");

    expect(sortMock).toHaveBeenCalledWith({ temperature: 1 });
  });
  test("returns limited data using only maxTemp and select", async () => {
    GeoData.find.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([
        { latitude: 30.12, longitude: -91.11, temperature: 75 }
      ])
    });
  
    const response = await request(app).get(
      "/api/geo-data?maxTemp=80&select=hideVersion"
    );
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
  
  test("returns pagination for first page with limit of 2", async () => {
    const skipMock = jest.fn().mockReturnThis();
    const limitMock = jest.fn().mockResolvedValue([
      { latitude: 29.95, longitude: -90.07, temperature: 82 },
      { latitude: 30.01, longitude: -91.00, temperature: 79 }
    ]);
  
    GeoData.find.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: skipMock,
      limit: limitMock
    });
  
    const response = await request(app).get("/api/geo-data?page=1&limit=2");
  
    expect(response.status).toBe(200);
    expect(skipMock).toHaveBeenCalledWith(0);
    expect(limitMock).toHaveBeenCalledWith(2);
    expect(response.body).toHaveLength(2);
  });
  
  test("returns collection sorted newest first", async () => {
    const sortMock = jest.fn().mockReturnThis();
  
    GeoData.find.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      sort: sortMock,
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([])
    });
  
    await request(app).get("/api/geo-data?sort=newest");
  
    expect(sortMock).toHaveBeenCalledWith({ createdAt: -1 });
  });
});