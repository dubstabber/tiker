const express = require('express');
const app = express();

const User = require('../models/User');

app.get('/:username', async (req, res) => {
  try {
    const users = await User.find({
      username: { $regex: '^' + req.params.username, $options: 'i' },
    });

    const readyUsers = [];

    users.forEach((user) => {
      const readyUser = {
        id: user._id,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        bio: user.bio,
        following: user.following,
        followers: user.followers,
      };
      readyUsers.push(readyUser);
    });

    res.send(readyUsers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = app;
