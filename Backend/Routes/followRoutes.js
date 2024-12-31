const express = require('express');
const router = express.Router();
const authenticate = require('../Middleware/authMiddleware');
const followController = require('../Controllers/followController');

router.post('/follow', authenticate, followController.followUser);
router.post('/unfollow', authenticate, followController.unfollowUser);

module.exports = router;
