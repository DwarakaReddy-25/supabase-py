// backend/routes/trips.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Trip Schema
const tripSchema = new mongoose.Schema({
  tripNumber: { type: Number, required: true },
  origin: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  startTime: { type: Date, required: true },
  destination: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  endTime: { type: Date, required: true },
  modeUsed: { type: String, required: true },
  travelDistance: { type: Number, required: true }, // in km
  tripPurpose: { type: String, required: true },
  companions: { type: Number, default: 0 },
  frequency: { type: String }, // e.g. "daily", "weekly"
  costIncurred: { type: Number, default: 0 }, // in INR or $
});

const Trip = mongoose.model("Trip", tripSchema);

// POST - Save a new trip
router.post("/", async (req, res) => {
  try {
    const trip = new Trip(req.body);
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET - Fetch all trips
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Fetch a trip by ID
router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
