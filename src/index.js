import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import { bootstrapAppData } from "./lib/bootstrap.js";
import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import appointmentRoutes from "./routes/appointments.js";
import uploadRoutes from "./routes/uploads.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 5000;

const envOrigins = [process.env.CLIENT_ORIGIN, process.env.CLIENT_ORIGINS]
  .filter(Boolean)
  .flatMap((origin) => origin.split(","))
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [
  ...envOrigins,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "https://dr-kazi-khadeza-farhin-client-site.vercel.app"
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  })
);
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

function getApiStatus() {
  return {
    ok: true,
    service: "doctor-portfolio-api",
    message: "Backend is running. All API routes are available.",
    dbReady: app.locals.dbReady === true,
    dbError: app.locals.dbError || null,
    cloudinaryReady: Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET),
    allowedOrigins,
    routes: [
      { method: "GET", path: "/api/health", description: "Backend health check" },
      { method: "POST", path: "/api/auth/login", description: "Admin login" },
      { method: "GET", path: "/api/content", description: "Website content" },
      { method: "PUT", path: "/api/content", description: "Update website content" },
      { method: "POST", path: "/api/appointments", description: "Create appointment request" },
      { method: "GET", path: "/api/appointments", description: "Admin appointment list" },
      { method: "PATCH", path: "/api/appointments/:id", description: "Update appointment status" },
      { method: "POST", path: "/api/uploads/image", description: "Upload image to Cloudinary" }
    ]
  };
}

app.get("/", (_req, res) => {
  const status = getApiStatus();
  res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Doctor Portfolio API</title>
    <style>
      body { margin: 0; font-family: Inter, Arial, sans-serif; background: #fff8fb; color: #111827; }
      main { max-width: 980px; margin: 0 auto; padding: 56px 20px; }
      .card { background: #fff; border: 1px solid #ead6e2; border-radius: 28px; padding: 30px; box-shadow: 0 24px 80px rgba(15, 23, 42, .08); }
      .badge { display: inline-flex; align-items: center; gap: 8px; border-radius: 999px; padding: 8px 14px; background: #f4cbc0; color: #5b2b6d; font-weight: 800; font-size: 13px; }
      h1 { margin: 18px 0 10px; font-size: clamp(34px, 6vw, 60px); line-height: 1; }
      p { color: #5f6472; line-height: 1.7; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin: 24px 0; }
      .stat { border: 1px solid #f0dce7; border-radius: 20px; padding: 18px; background: #fff8fb; }
      .stat strong { display: block; font-size: 22px; }
      code { background: #111827; color: #fff; border-radius: 10px; padding: 4px 8px; }
      ul { padding: 0; list-style: none; display: grid; gap: 10px; }
      li { border: 1px solid #f0dce7; border-radius: 16px; padding: 12px 14px; background: #fff; }
      .method { display: inline-block; min-width: 48px; color: #b499ac; font-weight: 900; }
    </style>
  </head>
  <body>
    <main>
      <section class="card">
        <span class="badge">Backend Live</span>
        <h1>Backend is running</h1>
        <p>All API routes for the Dr. Kazi Khadeza Farhin portfolio backend are available now.</p>
        <div class="grid">
          <div class="stat"><strong>${status.dbReady ? "Connected" : "Not connected"}</strong><span>MongoDB</span></div>
          <div class="stat"><strong>${status.cloudinaryReady ? "Configured" : "Missing env"}</strong><span>Cloudinary</span></div>
          <div class="stat"><strong>${status.routes.length}</strong><span>API routes</span></div>
        </div>
        <p>Health check: <code>/api/health</code></p>
        <ul>
          ${status.routes.map((route) => `<li><span class="method">${route.method}</span> <code>${route.path}</code> ${route.description}</li>`).join("")}
        </ul>
      </section>
    </main>
  </body>
</html>`);
});

app.get("/api", (_req, res) => {
  res.json(getApiStatus());
});

app.get("/api/health", (_req, res) => {
  res.json(getApiStatus());
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
    app.locals.dbError = null;
    return bootstrapAppData();
  })
  .then(() => {
    console.log("Bootstrap complete");
  })
  .catch((error) => {
    app.locals.dbReady = false;
    app.locals.dbError = error.message;
    console.warn(`MongoDB unavailable: ${error.message}`);
  });
