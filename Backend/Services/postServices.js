const Post = require('../Model/postModel');

const createPost = (userId, content, imageUrl) => {
  return new Promise((resolve, reject) => {
    Post.create({ userId, content, imageUrl }, (err, result) => {
      if (err) return reject(err);
      resolve({ message: 'Post created successfully', postId: result.insertId });
    });
  });
};

const getAllPosts = (currentUserId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return new Promise((resolve, reject) => {
    Post.findAll(offset, limit, currentUserId, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};


module.exports = {
  createPost,
  getAllPosts,
};
