const express = require('express');
const app = express();
const auth = require('../middleware/auth');

const User = require('../models/User');

app.get('/', auth, async (req, res) => {
  try {
    let loggedUser = await User.findOne({ _id: req.user.id });
    if (!loggedUser)
      return res.status(500).json({ msg: 'Logged user cannot be retrieved' });

    let skipIndex = 0;
    let users = [];
    let currentUsers = await User.find({}).skip(skipIndex).limit(5);
    if (!currentUsers)
      return res.status(500).json({ msg: 'Users cannot be retrieved' });
    let readyUsers;
    skipIndex += 5;

    while (users.length < 5 && currentUsers.length) {
      readyUsers = currentUsers.map((user) => {
        return {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
          followers: user.followers,
          following: user.following,
        };
      });
      readyUsers = readyUsers.filter((user) => {
        if (user.id === req.user.id) return false;
        return loggedUser.following.every((followed) => {
          if (followed.id !== user.id) {
            return true;
          } else return false;
        });
      });

      users.push(...readyUsers);
      currentUsers = await User.find({}).skip(skipIndex).limit(5);
      if (!currentUsers)
        return res.status(500).json({ msg: 'Users cannot be retrieved' });
      skipIndex += 5;
    }

    while (users.length > 5) {
      users.pop();
    }

    return res.json(users);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = app;
