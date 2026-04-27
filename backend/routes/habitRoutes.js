const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET HABITS
router.get("/", (req, res) => {
  db.query("SELECT * FROM habits ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result || []);
  });
});

// ADD HABIT
router.post("/", (req, res) => {
  const { title } = req.body;

  db.query(
    "INSERT INTO habits (title, completed) VALUES (?, ?)",
    [title, false],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Habit added" });
    }
  );
});

// TOGGLE
router.put("/:id", (req, res) => {
  db.query(
    "UPDATE habits SET completed = NOT completed WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM habits WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

module.exports = router;