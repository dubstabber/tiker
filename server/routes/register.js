const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

app.post(
  '/',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('password2').isLength({ min: 6 }),
  async (req, res) => {
    if (req.body.password !== req.body.password2) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(401).json({ msg: `account ${req.body.email} exists` });
    }

    let defaultUsername = req.body.email.slice(0, req.body.email.indexOf('@'));
    let pending = true;
    while (pending) {
      await User.find({ username: defaultUsername }, (err, arr) => {
        if (!err) {
          if (arr.length !== 0) {
            defaultUsername += '1';
          } else {
            pending = false;
          }
        } else {
          pending = false;
          return res.status(401).json({ msg: `An unknown error occured` });
        }
      });
    }
    const newUser = {
      name: '',
      username: defaultUsername,
      password: req.body.password,
      email: req.body.email,
      avatar: null,
      following: [],
      followers: [],
      bio: '',
      createdAt: new Date(),
    };
    await User.create(newUser, (err, arr) => {
      if (err) {
        return res.status(400).json({ msg: 'Account could not be created' });
      } else {
        res.send(`Account '${req.body.email}' has been created`);
      }
    });
  }
);

module.exports = app;
