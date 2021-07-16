const express = require('express');
const app = express();
const auth = require('../middleware/auth');

const Post = require('../models/Post');

app.post('/', auth, async (req, res) => {
  let comment = req.body.comment;
  comment = comment.trim();
  comment = comment
    .slice(req.body.replyPlaceholder.length, comment.length)
    .trim();
  try {
    if (comment) {
      await Post.findOne({ _id: req.body.postId })
        .then((post) => {
          const date = new Date();
          let formattedDate = `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

          const replyComment = {
            userId: req.user.id,
            comment: comment,
            timestamp: formattedDate,
            likes: [],
          };

          post.comments[req.body.commentToReply].subComments.push(replyComment);
          post
            .save()
            .then((data) => {
              res.send(replyComment);
            })
            .catch((err) => {
              res.send('This post cannot be commented');
            });
        })
        .catch((err) => {
          res.send('This post cannot be commented');
        });
    } else {
      return res.send('This comment cannot be published');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = app;
