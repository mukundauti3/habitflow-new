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

// ================= ROUTES (DIRECT LOAD - NO BUGS) =================
try {
  app.use("/auth", require("./routes/authRoutes"));
  console.log("✅ Loaded route: /auth");
} catch (err) {
  console.error("❌ Failed to load /auth:", err.message);
}

try {
  app.use("/habits", require("./routes/habitRoutes"));
  console.log("✅ Loaded route: /habits");
} catch (err) {
  console.error("❌ Failed to load /habits:", err.message);
}

try {
  app.use("/tasks", require("./routes/taskRoutes"));
  console.log("✅ Loaded route: /tasks");
} catch (err) {
  console.error("❌ Failed to load /tasks:", err.message);
}

try {
  app.use("/notes", require("./routes/noteRoutes"));
  console.log("✅ Loaded route: /notes");
} catch (err) {
  console.error("❌ Failed to load /notes:", err.message);
}

try {
  app.use("/sleep", require("./routes/sleepRoutes"));
  console.log("✅ Loaded route: /sleep");
} catch (err) {
  console.error("❌ Failed to load /sleep:", err.message);
}

try {
  app.use("/journal", require("./routes/journalRoutes"));
  console.log("✅ Loaded route: /journal");
} catch (err) {
  console.error("❌ Failed to load /journal:", err.message);
}

try {
  app.use("/workout", require("./routes/workoutRoutes"));
  console.log("✅ Loaded route: /workout");
} catch (err) {
  console.error("❌ Failed to load /workout:", err.message);
}

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
  console.error("🔥 Error:", err);
  res.status(500).json({ message: "Server error ❌" });
});

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});