const express = require('express');
const app = express();
const axios = require('axios');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Post = require('../models/Post');

app.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) res.status(404).send('User could not be fetched');

    const posts = [];
    for (let followedUser of user.following) {
      const foundPosts = await Post.find({ userId: followedUser.id }).lean();
      if (foundPosts) posts.push(...foundPosts);
    }

    const readyPosts = [];
    for (let post of posts) {
      const postOwner = await User.findById(post.userId);
      const readyPost = {
        id: post._id,
        userId: post.userId,
        caption: post.caption,
        video: post.video,
        likes: post.likes,
        comments: post.comments,
        timestamp: post.timestamp,
        username: postOwner.username,
        name: postOwner.name,
        avatar: postOwner.avatar,
      };
      readyPosts.push(readyPost);
    }

    res.send(readyPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = app;
