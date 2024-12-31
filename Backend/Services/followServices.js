const Follow = require('../Model/followModel');

const followUser = (followerId, followingId) => {
  return new Promise((resolve, reject) => {
    Follow.addFollow(followerId, followingId, (err, result) => {
      if (err) return reject(err);
      resolve({ message: 'User followed successfully' });
    });
  });
};

const unfollowUser = (followerId, followingId) => {
  return new Promise((resolve, reject) => {
    Follow.removeFollow(followerId, followingId, (err, result) => {
      if (err) return reject(err);
      resolve({ message: 'User unfollowed successfully' });
    });
  });
};

module.exports = {
  followUser,
  unfollowUser,
};
