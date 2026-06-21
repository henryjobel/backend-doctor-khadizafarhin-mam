import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import appointmentRoutes from "./routes/appointments.js";
import uploadRoutes from "./routes/uploads.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  "http://localhost:5173",
  "http://127.0.0.1:5173"
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "doctor-portfolio-api", dbReady: app.locals.dbReady === true });
});

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/uploads", uploadRoutes);

const server = app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Stop the old backend process or set PORT in .env.`);
    process.exit(1);
  }

  throw error;
});

connectDB()
  .then(() => {
    app.locals.dbReady = true;
  })
  .catch((error) => {
    app.locals.dbReady = false;
    console.warn(`MongoDB unavailable: ${error.message}`);
  });
