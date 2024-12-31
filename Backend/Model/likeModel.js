const db = require('../Db/conn');

const Like = {
  addLike: (userId, postId, callback) => {
    db.query(
      'INSERT INTO likes (user_id, post_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP',
      [userId, postId],
      callback
    );
  },

  removeLike: (userId, postId, callback) => {
    db.query('DELETE FROM likes WHERE user_id = ? AND post_id = ?', [userId, postId], callback);
  },
};

module.exports = Like;
