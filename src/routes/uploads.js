import express from "express";
import multer from "multer";
import path from "path";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".webp"];
    cb(null, allowed.includes(path.extname(file.originalname).toLowerCase()));
  }
});

router.post("/image", requireAuth, upload.single("image"), (req, res) => {
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

export default router;
