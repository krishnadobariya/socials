const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Replace with your MySQL user
  password: 'Laksh@1234',  // Replace with your MySQL password
  database: 'social_media'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to the MySQL database');
});

module.exports = db;
