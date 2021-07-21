const express = require('express');
const app = express();

const User = require('../models/User');

app.get('/:quantity', async (req, res) => {
  let limit = parseInt(req.params.quantity);
  if (isNaN(limit)) limit = 1;

  let users = await User.find({}).limit(limit);
  if (!users) return res.send('Users cannot be retrieved');

  let usersData = users.map((el) => {
    return {
      id: el.id,
      name: el.name,
      username: el.username,
      avatar: el.avatar,
      following: el.following,
      followers: el.followers,
    };
  });

  return res.json(usersData);
});

module.exports = app;
