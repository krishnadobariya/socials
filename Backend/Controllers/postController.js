const postService = require('../Services/postServices');

exports.createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const content = req.body.content;
    const imageUrl = req.file?.path || null; // Uploaded image URL from Cloudinary
    console.log("req.file", req.file)
    console.log("imageUrlimageUrl", imageUrl)
    const img_link = `http://localhost:3000/${req.file?.destination}${req.file?.filename}`
    const response = await postService.createPost(userId, content, img_link);
    res.status(201).send(response);
  } catch (error) {
    console.error('Error creating post:', error); // Log full error for debugging
    res.status(500).json({ error: error.message || 'An error occurred' });
    
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.id; // Logged-in user's ID
    const posts = await postService.getAllPosts(userId, Number(page), Number(limit));
    res.status(200).send(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message });
  }
};
