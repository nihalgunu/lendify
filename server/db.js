const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('path/to/your/users.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

module.exports = db;
