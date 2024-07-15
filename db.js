const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./data.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    )`);
  }
});

// Function to fetch all items from database
exports.getAllItems = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM items', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Function to add a new item to the database
exports.addItem = (name, description) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); // Return the ID of the inserted item
      }
    });
  });
};
