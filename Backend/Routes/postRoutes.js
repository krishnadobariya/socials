const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');
const authenticate = require('../Middleware/authMiddleware');
const {upload, uploadToCloudinary} = require('../Config/cloudinary')
const fs = require('fs');

// Route to create a post (with image upload)
router.post('/create', authenticate, upload.single('image'), postController.createPost);

router.get('/all', authenticate, postController.getAllPosts);

module.exports = router;
