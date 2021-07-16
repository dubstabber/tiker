const express = require('express');
const app = express();
const { body } = require('express-validator');

const User = require('../models/User');

app.post(
  '/',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('password2').isLength({ min: 6 }),
  (req, res) => {
    if (req.body.password !== req.body.password2) {
      return res.send('Passwords do not match');
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.find({ email: req.body.email }, (err, arr) => {
      if (!err) {
        if (arr.length !== 0) {
          return res.send(`account ${req.body.email} exists`);
        }
      } else {
        return res.send(`An unknown error occured`);
      }
    });
    const defaultUsername = req.body.email.slice(
      0,
      req.body.email.indexOf('@')
    );
    let pending = true;
    while (pending) {
      User.find({ username: defaultUsername }, (err, arr) => {
        if (!err) {
          if (arr.length !== 0) {
            defaultUsername += '1';
          } else {
            pending = false;
          }
        } else {
          return res.send(`An unknown error occured`);
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
    User.create(newUser, (err, arr) => {
      if (err) {
        console.log(`Account could not be created: ${err}`);
        return res.send('Account could not be created');
      } else {
        return res.send(`Account '${req.body.email}' has been created`);
      }
    });
  }
);

module.exports = app;
