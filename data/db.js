const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./topics.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      votes INTEGER DEFAULT 0
    )
  `);
});

module.exports = db;
