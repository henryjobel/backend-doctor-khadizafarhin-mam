import express from "express";
import { SiteContent } from "../models/SiteContent.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const content = await SiteContent.findOne().sort({ createdAt: 1 });
  res.json(content);
});

router.put("/", requireAuth, async (req, res) => {
  const { _id, __v, createdAt, updatedAt, ...payload } = req.body;
  const existing = await SiteContent.findOne().sort({ createdAt: 1 });
  const content = existing
    ? await SiteContent.findByIdAndUpdate(existing._id, payload, { new: true })
    : await SiteContent.create(payload);
  res.json(content);
});

export default router;
