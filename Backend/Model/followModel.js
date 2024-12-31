const db = require('../Db/conn');

const Follow = {
  addFollow: (followerId, followingId, callback) => {
    db.query(
      'INSERT INTO follows (follower_id, following_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP',
      [followerId, followingId],
      callback
    );
  },

  removeFollow: (followerId, followingId, callback) => {
    db.query('DELETE FROM follows WHERE follower_id = ? AND following_id = ?', [followerId, followingId], callback);
  },
};

module.exports = Follow;
