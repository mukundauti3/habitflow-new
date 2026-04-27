const mysql = require("mysql2");

// ✅ Create pool (Railway friendly)
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

// ✅ Use promise wrapper (VERY IMPORTANT for async/await)
const promiseDb = db.promise();

// 🔍 Debug logs
console.log("🔍 DB CONFIG:");
console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("DB:", process.env.DB_NAME);
console.log("PORT:", process.env.DB_PORT);

// 🔥 Test connection properly
(async () => {
  try {
    const connection = await promiseDb.getConnection();
    console.log("✅ MySQL Connected");
    connection.release();
  } catch (err) {
    console.error("❌ DB Connection Failed FULL ERROR:");
    console.error(err);
  }
})();

// ✅ Export promise-based pool
module.exports = promiseDb;