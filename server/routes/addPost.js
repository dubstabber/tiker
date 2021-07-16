const express = require('express');
const app = express();
const axios = require('axios');
const auth = require('../middleware/auth');

const Post = require('../models/Post');

app.post('/', auth, async (req, res) => {
  const timestamp = new Date();
  const timestampString = `${timestamp.getFullYear()}-${
    timestamp.getMonth() + 1
  }-${timestamp.getDate()}T${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;

  if (req.body.video) {
    await axios
      .head(req.body.video)
      .then((data) => {
        const isVideo = data.headers['content-type'].includes('video');
        if (!isVideo) res.send('Link does not contain a video');
      })
      .catch((err) => {
        res.send(`A video cannot be processed: ${err}`);
      });
  } else {
    res.send('You have not provided any link');
  }

  const newPost = {
    userId: req.user.id,
    caption: req.body.caption,
    video: req.body.video,
    likes: [],
    comments: [],
    timestamp: timestampString,
  };

  await Post.create(newPost)
    .then((data) => {
      res.json('Post has been created');
    })
    .catch((err) => {
      res.status(401).json({ msg: 'Error: Post could not be created', err });
    });
});

module.exports = app;
