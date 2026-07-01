import express from "express";
import { Appointment } from "../models/Appointment.js";
import { requireAuth } from "../middleware/auth.js";
import { getEarliestBookableDate } from "../lib/booking.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const earliest = getEarliestBookableDate();
    if (req.body.date && req.body.date < earliest) {
      return res.status(400).json({
        message: `Same-day booking closes at 5:00 PM. The earliest available date is ${earliest}.`
      });
    }
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to create appointment" });
  }
});

router.get("/", requireAuth, async (_req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch appointments" });
  }
});

router.patch("/:id", requireAuth, async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body was empty or not valid JSON. Check that the request was sent with Content-Type: application/json."
      });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to update appointment" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to delete appointment" });
  }
});

export default router;
