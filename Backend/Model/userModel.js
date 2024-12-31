const db = require('../Db/conn');

const User = {
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  create: (userData, callback) => {
    const { username, email, password } = userData;
    db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password],
      callback
    );
  },

  updateToken: (userId, token, callback) => {
    db.query('UPDATE users SET token = ? WHERE id = ?', [token, userId], callback);
  },
};

module.exports = User;
