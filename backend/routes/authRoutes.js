const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // check if user exists
    db.query(
      "SELECT * FROM profiles WHERE email=?",
      [email],
      async (err, result) => {
        if (result.length > 0) {
          return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const hash = await bcrypt.hash(password, 10);

        // insert user
        db.query(
          "INSERT INTO profiles (email, password, name) VALUES (?, ?, ?)",
          [email, hash, name],
          (err) => {
            if (err) {
              return res.status(500).json({ message: "DB error" });
            }

            res.json({ message: "Registered successfully ✅" });
          }
        );
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================= LOGIN =================
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    db.query(
      "SELECT * FROM profiles WHERE email=?",
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({ message: "DB error" });
        }

        if (result.length === 0) {
          return res.status(400).json({ message: "User not found" });
        }

        const user = result[0];

        // compare password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          return res.status(400).json({ message: "Invalid password" });
        }

        // create token
        const token = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET || "secretkey",
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
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;