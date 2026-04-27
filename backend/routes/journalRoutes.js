const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET JOURNAL
router.get("/", (req, res) => {
  db.query("SELECT * FROM journal ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result || []);
  });
});

// ADD ENTRY
router.post("/", (req, res) => {
  const { content } = req.body;

  db.query(
    "INSERT INTO journal (content) VALUES (?)",
    [content],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Journal added" });
    }
  );
});

// DELETE ENTRY
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM journal WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

module.exports = router;