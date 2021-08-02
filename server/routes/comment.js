const express = require('express');
const app = express();
const auth = require('../middleware/auth');

const Post = require('../models/Post');

app.post('/', auth, async (req, res) => {
  let comment = req.body.comment;
  comment = comment.trim();
  try {
    if (comment) {
      const post = await Post.findOne({ _id: req.body.postId });
      if (!post)
        return res.status(500).json({ msg: 'This post cannot be commented' });

      const date = new Date();
      let formattedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      const newComment = {
        userId: req.user.id,
        comment: comment,
        timestamp: formattedDate,
        likes: [],
        subComments: [],
      };

      post.comments.push(newComment);
      await Post.updateOne(
        { _id: req.body.postId },
        { comments: post.comments }
      ).catch((err) => {
        console.log(err);
      });

      return res.json(newComment);
    } else {
      return res.status(500).json({ msg: 'This comment cannot be published' });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = app;
