require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ================= DEBUG ENV =================
console.log("🌐 FRONTEND_URL:", process.env.FRONTEND_URL);

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.json());

// ================= ROUTES =================
const routes = [
  { path: "/auth", file: "./routes/authRoutes" },
  { path: "/habits", file: "./routes/habitRoutes" },
  { path: "/tasks", file: "./routes/taskRoutes" },
  { path: "/notes", file: "./routes/noteRoutes" },
  { path: "/sleep", file: "./routes/sleepRoutes" },
  { path: "/journal", file: "./routes/journalRoutes" },
  { path: "/workout", file: "./routes/workoutRoutes" },
];

routes.forEach(({ path, file }) => {
  try {
    const route = require(file);

    // 🔥 check if router exists
    if (!route) {
      console.warn(`⚠️ Empty route: ${file}`);
      return;
    }

    app.use(path, route);
    console.log(`✅ Loaded route: ${path}`);
  } catch (err) {
    console.error(`❌ Failed to load ${file}`);
    console.error(err.message);
  }
});

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("HabitFlow API Running 🚀");
});

// 🔥 DEBUG ROUTE
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
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ message: "Server error ❌" });
});

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});