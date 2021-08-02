const express = require('express');
const app = express();

const User = require('../models/User');

app.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id }, (err, arr) => {
    if (!err) {
      if (arr.length !== 0) {
        const user = {
          id: arr.id,
          username: arr.username,
          name: arr.name,
          avatar: arr.avatar,
          following: arr.following,
          followers: arr.followers,
          bio: arr.bio,
        };
        return res.json(user);
      } else {
        return res.json([]);
      }
    } else {
      return res.json([]);
    }
  });
});

module.exports = app;
