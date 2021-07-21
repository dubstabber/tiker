const express = require('express');
const app = express();

const User = require('../models/User');
const Post = require('../models/Post');

app.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(post.userId);

    const readyPost = {
      id: post._id,
      userId: post.userId,
      caption: post.caption,
      video: post.video,
      likes: post.likes,
      comments: post.comments,
      timestamp: post.timestamp,
      username: user.username,
      name: user.name,
      avatar: user.avatar,
    };

    res.json(readyPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = app;
