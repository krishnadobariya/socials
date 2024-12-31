const likeService = require('../Services/likeServices');

exports.likePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.body;
    const response = await likeService.likePost(userId, postId);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.body;
    const response = await likeService.unlikePost(userId, postId);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
