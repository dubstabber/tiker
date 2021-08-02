const express = require('express');
const app = express();
const auth = require('../middleware/auth');

const Post = require('../models/Post');

app.put('/', auth, async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.body.id });
    if (!post)
      return res.status(401).json({ msg: 'Error: Post could not be liked' });

    let isNotLiked = post.likes.every((userId) => userId !== req.user.id);
    if (isNotLiked) {
      post.likes.push(req.user.id);
      await Post.updateOne({ _id: req.body.id }, { likes: post.likes });

      return res.send(`${post.likes.length}`);
    } else {
      let index = post.likes.indexOf(`${req.user.id}`);
      post.likes.splice(index, 1);
      await Post.updateOne({ _id: req.body.id }, { likes: post.likes });

      return res.send(`${post.likes.length}`);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = app;
