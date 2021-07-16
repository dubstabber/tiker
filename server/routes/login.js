const express = require('express');
const app = express();
const { body, check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

app.post(
  '/',
  body('email').isEmail(),
  check('password').exists(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(401).json({ msg: 'Your email or password is invalid' });
      }

      const isMatch = req.body.password === user.password;
      if (!isMatch) {
        res.status(401).json({ msg: 'Your email or password is invalid' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        'jwtSecret',
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = app;
