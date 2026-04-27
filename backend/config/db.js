const mysql = require("mysql2");

// ✅ STRICT ENV (no fallback)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 🔍 Debug logs (VERY IMPORTANT)
console.log("🔍 DB CONFIG:");
console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("DB:", process.env.DB_NAME);
console.log("PORT:", process.env.DB_PORT);

// 🔥 Test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB Connection Failed FULL ERROR:");
    console.error(err); // FULL error (not just message)
  } else {
    console.log("✅ MySQL Connected");
    connection.release();
  }
});

module.exports = db;