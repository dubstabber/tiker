const express = require('express');
const app = express();
const auth = require('../middleware/auth');

const User = require('../models/User');

app.put('/:username', auth, async (req, res) => {
  if (req.user.id) {
    let followUser = await User.findOne({ username: req.params.username });
    if (!followUser)
      return res.status(500).json({
        msg: `Something went wrong. User: ${req.params.username} cannot be followed`,
      });

    if (followUser.id === req.user.id)
      return res.status(400).json({ msg: `You cannot follow yourself.` });

    let userData = await User.findOne({ _id: req.user.id });
    if (!userData)
      return res.status(500).json({ msg: `Something went wrong.` });

    let isNotFollowed = userData.following.every(
      (el) => el.id !== followUser.id
    );
    if (isNotFollowed) {
      userData.following.push({ id: followUser.id });
      await User.updateOne(
        { _id: req.user.id },
        { following: userData.following }
      );

      followUser.followers.push({ id: req.user.id });
      await User.updateOne(
        { _id: followUser.id },
        { followers: followUser.followers }
      );

      return res.send(`User successfully followed`);
    } else {
      let index = userData.following.findIndex((el) => el.id === followUser.id);
      userData.following.splice(index, 1);
      await User.updateOne(
        { _id: req.user.id },
        { following: userData.following }
      );

      index = followUser.followers.findIndex((el) => el.id === req.user.id);
      followUser.followers.splice(index, 1);
      await User.updateOne(
        { _id: followUser.id },
        { followers: followUser.followers }
      );

      return res.send(`User successfully unfollowed`);
    }
  }
});

module.exports = app;
