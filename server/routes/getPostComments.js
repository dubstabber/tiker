const express = require('express');
const app = express();
const auth = require('../middleware/auth');

const User = require('../models/User');
const Post = require('../models/Post');

app.post('/', auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body.postId });
    if (!post) return res.send(`Could not fetch post's comments`);

    const comments = [];
    let currentUser;

    for (let comment of post.comments) {
      currentUser = await User.findOne({ _id: comment.userId });
      if (!currentUser) {
        comments.push({});
      } else {
        for (let subComment of comment.subComments) {
          await User.findOne({ _id: subComment.userId }).then((data) => {
            Object.assign(subComment, {
              username: data.username,
              avatar: data.avatar,
              name: data.name,
            });
          });
        }
        comments.push({
          name: currentUser.name,
          username: currentUser.username,
          avatar: currentUser.avatar,
          comment: comment.comment,
          likes: comment.likes,
          subComments: comment.subComments,
          timestamp: comment.timestamp,
        });
      }
    }

    return res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = app;
