const express = require('express');
const app = express();

const User = require('../models/User');

app.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id }, (err, arr) => {
    if (!err) {
      if (arr.length !== 0) {
        const user = {
          username: arr.username,
          name: arr.name,
          avatar: arr.avatar,
          following: arr.following,
          followers: arr.followers,
          bio: arr.bio,
        };
        res.json(user);
      } else {
        res.json([]);
      }
    } else {
      res.json([]);
    }
  });
});

module.exports = app;
