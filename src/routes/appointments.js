import express from "express";
import { Appointment } from "../models/Appointment.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const appointment = await Appointment.create(req.body);
  res.status(201).json(appointment);
});

router.get("/", requireAuth, async (_req, res) => {
  const appointments = await Appointment.find().sort({ createdAt: -1 });
  res.json(appointments);
});

router.patch("/:id", requireAuth, async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(appointment);
});

export default router;
