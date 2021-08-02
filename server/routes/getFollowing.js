const express = require('express');
const app = express();
const auth = require('../middleware/auth');

const User = require('../models/User');

app.get('/', auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user.id });
  if (!user)
    return res.status(500).json({
      msg: `Something went wrong. Cannot get users for user with id ${req.user.id}.`,
    });

  let followers = [];

  for (const el of user.following) {
    let follower = await User.findOne({ _id: el.id });
    if (!follower)
      return res.status(500).json({ msg: `Follower could not be found` });
    let sanitizedFollower = {
      id: el.id,
      name: follower.name,
      username: follower.username,
      avatar: follower.avatar,
    };
    followers.push(sanitizedFollower);
  }

  return res.json(followers);
});

app.get('/:username', async (req, res) => {
  let user = await User.findOne({ username: req.params.username });
  if (!user)
    return res.status(500).json({
      msg: `Something went wrong. Cannot get users for ${req.params.username}.`,
    });

  return res.json(user.following);
});

module.exports = app;
