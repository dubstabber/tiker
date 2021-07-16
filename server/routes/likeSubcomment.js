const express = require('express');
const app = express();
const auth = require('../middleware/auth');

const Post = require('../models/Post');

app.post('/', auth, async (req, res) => {
  try {
    await Post.findOne({ _id: req.body.postId })
      .then((post) => {
        const isNotLiked = post.comments[req.body.commentIndex].subComments[
          req.body.subCommentIndex
        ].likes.every((like) => like !== req.user.id);
        if (isNotLiked) {
          post.comments[req.body.commentIndex].subComments[
            req.body.subCommentIndex
          ].likes.push(req.user.id);
          post
            .save()
            .then(() => {
              res.send(`Liked`);
            })
            .catch((err) => {
              res.send('This subcomment cannot be liked');
            });
        } else {
          const index = post.comments[req.body.commentIndex].subComments[
            req.body.subCommentIndex
          ].likes.indexOf(req.user.id);
          post.comments[req.body.commentIndex].subComments[
            req.body.subCommentIndex
          ].likes.splice(index, 1);
          post
            .save()
            .then(() => {
              res.send(`Unliked`);
            })
            .catch((err) => {
              res.send('This subComment cannot be unliked');
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = app;
