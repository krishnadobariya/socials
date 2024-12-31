const db = require('../Db/conn');

const Post = {
  create: ({ userId, content, imageUrl }, callback) => {
    db.query(
      'INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)',
      [userId, content, imageUrl],
      callback
    );
  },

  findAll: (offset, limit, currentUserId, callback) => {
    db.query(
      `SELECT 
         posts.id, 
         posts.content, 
         posts.image_url, 
         posts.created_at, 
         users.username AS author,
         users.id AS userId,
         (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id) AS like_count,
         (SELECT GROUP_CONCAT(user_id) FROM likes WHERE likes.post_id = posts.id) AS liked_user_ids,
         EXISTS (
           SELECT 1 
           FROM follows 
           WHERE follows.follower_id = ? AND follows.following_id = posts.user_id
         ) AS is_following
       FROM posts 
       JOIN users ON posts.user_id = users.id 
       ORDER BY posts.created_at DESC 
       LIMIT ? OFFSET ?`,
      [currentUserId, limit, offset],
      (err, results) => {
        if (err) {
          return callback(err);
        }

        // Process the liked_user_ids column
        const processedResults = results.map(post => ({
          ...post,
          liked_user_ids: post.liked_user_ids
            ? post.liked_user_ids.split(',').map(Number)
            : [],
          is_following: Boolean(post.is_following),
        }));

        callback(null, processedResults);
      }
    );
  },
};

module.exports = Post;
