require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ================= DEBUG ENV =================
console.log("🌐 FRONTEND_URL:", process.env.FRONTEND_URL);

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // allow frontend (Vercel)
    credentials: true,
  })
);

app.use(express.json());

// ================= ROUTE LOADER =================
const loadRoute = (path, route) => {
  try {
    const routeModule = require(route);

    if (typeof routeModule !== "function") {
      console.warn(`⚠️ Invalid route export: ${route}`);
      return;
    }

    app.use(path, routeModule);
    console.log(`✅ Loaded route: ${path}`);
  } catch (err) {
    console.error(`❌ Failed to load route: ${route}`);
    console.error(err.message);
  }
};

// ================= ROUTES =================
loadRoute("/auth", "./routes/authRoutes");
loadRoute("/habits", "./routes/habitRoutes");
loadRoute("/tasks", "./routes/taskRoutes");
loadRoute("/notes", "./routes/noteRoutes");
loadRoute("/sleep", "./routes/sleepRoutes");
loadRoute("/journal", "./routes/journalRoutes");
loadRoute("/workout", "./routes/workoutRoutes");

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("HabitFlow API Running 🚀");
});

// 🔥 TEST REGISTER ROUTE (IMPORTANT DEBUG)
app.post("/test-register", (req, res) => {
  console.log("📥 Test Register Hit:", req.body);
  res.json({ message: "Test route working ✅" });
});

// ================= 404 HANDLER =================
app.use((req, res) => {
  console.warn("❌ 404 Route:", req.originalUrl);
  res.status(404).json({ message: "Route not found ❌" });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  res.status(500).json({ message: "Server error ❌" });
});

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});