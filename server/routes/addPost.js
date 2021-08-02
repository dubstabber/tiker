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
        if (!isVideo) {
          return res.status(401).json({ msg: `Link does not contain a video` });
        } else {
          const newPost = {
            userId: req.user.id,
            caption: req.body.caption,
            video: req.body.video,
            likes: [],
            comments: [],
            timestamp: timestampString,
          };

          Post.create(newPost)
            .then(() => {
              return res.json('Post has been created');
            })
            .catch(() => {
              return res.status(401).json({ msg: 'Post could not be created' });
            });
        }
      })
      .catch(() => {
        return res.status(404).json({ msg: `This link cannot be processed` });
      });
  } else {
    return res.status(404).json({ msg: 'You have not provided any link' });
  }
});

module.exports = app;
