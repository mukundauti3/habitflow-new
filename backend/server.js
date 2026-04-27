require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // ✅ FIXED
    credentials: true,
  })
);

app.use(express.json());

// ================= ROUTE LOADER =================
const loadRoute = (path, route) => {
  try {
    app.use(path, require(route));
    console.log(`✅ Loaded route: ${path}`);
  } catch (err) {
    console.warn(`⚠️ Route missing: ${route}`);
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

// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({ message: "Server error ❌" });
});

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});