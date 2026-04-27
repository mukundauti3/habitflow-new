const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // 🔴 validation
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    // check if user exists
    db.query(
      "SELECT * FROM profiles WHERE email=?",
      [email],
      async (err, result) => {
        if (err) {
          console.error("DB ERROR:", err);
          return res.status(500).json({ message: "Database error ❌" });
        }

        if (result.length > 0) {
          return res.status(400).json({ message: "User already exists ❌" });
        }

        try {
          // hash password
          const hash = await bcrypt.hash(password, 10);

          // insert user
          db.query(
            "INSERT INTO profiles (email, password, name) VALUES (?, ?, ?)",
            [email, hash, name],
            (err) => {
              if (err) {
                console.error("INSERT ERROR:", err);
                return res.status(500).json({ message: "Insert failed ❌" });
              }

              res.status(201).json({
                message: "Registered successfully ✅",
              });
            }
          );
        } catch (hashErr) {
          console.error("HASH ERROR:", hashErr);
          return res.status(500).json({ message: "Password error ❌" });
        }
      }
    );
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// ================= LOGIN =================
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔴 validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    db.query(
      "SELECT * FROM profiles WHERE email=?",
      [email],
      async (err, result) => {
        if (err) {
          console.error("DB ERROR:", err);
          return res.status(500).json({ message: "Database error ❌" });
        }

        if (result.length === 0) {
          return res.status(400).json({ message: "User not found ❌" });
        }

        const user = result[0];

        try {
          // compare password
          const valid = await bcrypt.compare(password, user.password);

          if (!valid) {
            return res.status(400).json({ message: "Invalid password ❌" });
          }

          // create token
          const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          res.json({
            message: "Login success ✅",
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        } catch (compareErr) {
          console.error("COMPARE ERROR:", compareErr);
          return res.status(500).json({ message: "Auth error ❌" });
        }
      }
    );
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

module.exports = router;