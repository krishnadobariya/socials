const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
const path = require("path")

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));

const authRoutes = require('./Routes/authRoutes');
const postRoutes = require('./Routes/postRoutes');
const likeRoutes = require('./Routes/likeRoutes');
const followRoutes = require('./Routes/followRoutes');

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follows', followRoutes);

const PORT = process.env.PORT || 3001;

app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(__dirname, 'uploads', filename));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
