const express = require('express');
const app = express();

const User = require('../models/User');
const Post = require('../models/Post');

app.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    const user = await User.findById(post.userId).lean();

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

    for (let comment of readyPost.comments) {
      const userComment = await User.findById(comment.userId);

      comment.username = userComment.username;
      comment.name = userComment.name;
      comment.avatar = userComment.avatar;

      for (let subComment of comment.subComments) {
        const userSubcomment = await User.findById(subComment.userId);

        subComment.username = userSubcomment.username;
        subComment.name = userSubcomment.name;
        subComment.avatar = userSubcomment.avatar;
      }
    }

    return res.json(readyPost);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = app;
