const express = require('express');
const app = express();
const axios = require('axios');
const auth = require('../middleware/auth');

const Post = require('../models/Post');
// TODO reimplement for following
app.get('/', auth, (req, res) => {
  Post.find(null, (err, arr) => {
    if (!err) {
      let posts = [];
      let promises = [];
      arr.forEach((post) => {
        promises.push(
          axios
            .get('http://localhost:5000/getUser/' + post.userId)
            .then((user) => {
              readyPost = JSON.parse(JSON.stringify(post));
              Object.assign(readyPost, user.data);
              posts.push(readyPost);
            })
        );
      });
      Promise.all(promises).then(() => {
        res.json(posts);
      });
    }
  });
});

module.exports = app;
