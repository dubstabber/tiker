const express = require('express');
const app = express();
const auth = require('../middleware/auth');

const Post = require('../models/Post');

app.post('/', auth, async (req, res) => {
  try {
    await Post.findOne({ _id: req.body.postId }).then((post) => {
      const isNotLiked = post.comments[req.body.commentToLike].likes.every(
        (like) => like !== req.user.id
      );
      if (isNotLiked) {
        post.comments[req.body.commentToLike].likes.push(req.user.id);
        post
          .save()
          .then(() => {
            res.send(`Liked`);
          })
          .catch((err) => {
            res.send('This comment cannot be liked');
          });
      } else {
        const index = post.comments[req.body.commentToLike].likes.indexOf(
          req.user.id
        );
        post.comments[req.body.commentToLike].likes.splice(index, 1);
        post
          .save()
          .then(() => {
            res.send(`Unliked`);
          })
          .catch((err) => {
            res.send('This comment cannot be unliked');
          });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = app;
