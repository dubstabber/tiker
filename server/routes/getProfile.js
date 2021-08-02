const express = require('express');
const app = express();
const auth = require('../middleware/auth');

const User = require('../models/User');

app.get('/', auth, async (req, res) => {
  if (req.user.id) {
    let user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(500).json({ msg: `Cannot log in with this token` });
    }

    let userData = {
      id: req.user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      following: user.following,
      followers: user.followers,
      bio: user.bio,
    };

    return res.json(userData);
  }
  return res.status(400).json({ msg: 'You are not logged in' });
});

module.exports = app;
