const express = require('express');
const app = express();
const { body } = require('express-validator');
const axios = require('axios');
const auth = require('../middleware/auth');

const User = require('../models/User');

app.put(
  '/',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  auth,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id });
      if (!user)
        return res.status(500).json({
          msg: 'Something went wrong. Your profile cannot be updated',
        });

      const updateUser = {};

      if (req.body.username !== user.username) {
        const usernameExists = await User.findOne({
          username: req.body.username,
        });
        if (usernameExists)
          return res.status(500).json({ msg: 'Username already exists' });
        else updateUser.username = req.body.username;
      }

      updateUser.name = req.body.name;

      if (req.body.email !== user.email) {
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists)
          return res.status(500).json({ msg: 'Email already exists' });
        else updateUser.email = req.body.email;
      }

      if (req.body.avatar) {
        await axios
          .head(req.body.avatar)
          .then((data) => {
            const isImage = data.headers['content-type'].includes('image');
            if (isImage) updateUser.avatar = req.body.avatar;
            else
              return res
                .status(500)
                .json({ msg: 'Link does not contain an image' });
          })
          .catch((err) => {
            console.log(`error occured ${err}`);
            return res.status(500).json({ msg: 'Something went wrong' });
          });
      }

      if (req.body.password) {
        if (req.body.password !== req.body.password2)
          return res.status(500).json({ msg: 'Password does not match' });
        else updateUser.password = req.body.password;
      }

      updateUser.bio = req.body.bio;

      await User.updateOne({ _id: req.user.id }, updateUser)
        .then(() => {
          return res.send('Your profile has been updated');
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ msg: `Your profile could not be updated: ${err}` });
        });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = app;
