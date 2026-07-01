import express from "express";
import { SiteContent } from "../models/SiteContent.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const content = await SiteContent.findOne().sort({ createdAt: 1 });
    res.set("Cache-Control", "no-store");
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch content" });
  }
});

router.put("/", requireAuth, async (req, res) => {
  try {
    const { _id, __v, createdAt, updatedAt, ...payload } = req.body;
    const existing = await SiteContent.findOne().sort({ createdAt: 1 });
    let content;
    if (existing) {
      content = await SiteContent.findByIdAndUpdate(
        existing._id,
        { $set: payload },
        { new: true, runValidators: true }
      );
      if (!content) {
        return res.status(404).json({ message: "Content document not found after update" });
      }
    } else {
      content = await SiteContent.create(payload);
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to save content" });
  }
});

export default router;
