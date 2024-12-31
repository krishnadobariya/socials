const express = require('express');
const router = express.Router();
const authenticate = require('../Middleware/authMiddleware');
const likeController = require('../Controllers/likeController');

router.post('/like', authenticate, likeController.likePost);
router.post('/unlike', authenticate, likeController.unlikePost);

module.exports = router;
