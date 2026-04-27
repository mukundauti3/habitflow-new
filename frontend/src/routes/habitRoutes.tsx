const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET ALL HABITS
router.get("/", (req, res) => {
  db.query("SELECT * FROM habits", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD HABIT
router.post("/", (req, res) => {
  const { name, description } = req.body;

  db.query(
    "INSERT INTO habits (name, description) VALUES (?, ?)",
    [name, description],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Habit added" });
    }
  );
});

// DELETE HABIT
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM habits WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Habit deleted" });
  });
});

module.exports = router;