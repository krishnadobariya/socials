const followService = require('../Services/followServices');

exports.followUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { followingId } = req.body;
    const response = await followService.followUser(followerId, followingId);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { followingId } = req.body;
    const response = await followService.unfollowUser(followerId, followingId);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
