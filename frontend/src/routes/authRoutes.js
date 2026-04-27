// const express = require("express");
// const router = express.Router();
// const db = require("../db");

// router.post("/register", (req, res) => {
//   const { name, email, password } = req.body;

//   console.log("📥 Register Request:", req.body);

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "All fields required ❌" });
//   }

//   const sql = "INSERT INTO profiles (name, email, password) VALUES (?, ?, ?)";

//   db.query(sql, [name, email, password], (err, result) => {
//     if (err) {
//       console.error("❌ DB ERROR:", err);
//       return res.status(500).json({ message: "Database error ❌" });
//     }

//     res.json({ message: "User registered successfully ✅" });
//   });
// });

// module.exports = router;