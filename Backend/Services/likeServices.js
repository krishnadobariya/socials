const Like = require('../Model/likeModel');

const likePost = (userId, postId) => {
  return new Promise((resolve, reject) => {
    Like.addLike(userId, postId, (err, result) => {
      if (err) return reject(err);
      resolve({ message: 'Post liked successfully' });
    });
  });
};

const unlikePost = (userId, postId) => {
  return new Promise((resolve, reject) => {
    Like.removeLike(userId, postId, (err, result) => {
      if (err) return reject(err);
      resolve({ message: 'Post unliked successfully' });
    });
  });
};

module.exports = {
  likePost,
  unlikePost,
};
