const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    password: String,
    email: String,
    avatar: String,
    following: Array,
    followers: Array,
    bio: String,
    createdAt: String,
  },
  { collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
