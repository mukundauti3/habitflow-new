const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= GET TASKS =================
router.get("/", (req, res) => {
  db.query(
    "SELECT id, title, completed FROM daily_tasks ORDER BY id DESC",
    (err, result) => {
      if (err) {
        console.error("GET TASK ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      // ✅ Always return array
      res.json(result || []);
    }
  );
});

// ================= ADD TASK =================
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  db.query(
    "INSERT INTO daily_tasks (title, completed) VALUES (?, ?)",
    [title, false],
    (err, result) => {
      if (err) {
        console.error("ADD TASK ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res.json({
        message: "Task added",
        id: result.insertId,
      });
    }
  );
});

// ================= TOGGLE TASK =================
router.put("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE daily_tasks SET completed = NOT completed WHERE id=?",
    [id],
    (err) => {
      if (err) {
        console.error("TOGGLE ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res.json({ message: "Task updated" });
    }
  );
});

// ================= DELETE TASK =================
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM daily_tasks WHERE id=?", [id], (err) => {
    if (err) {
      console.error("DELETE ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Task deleted" });
  });
});

module.exports = router;