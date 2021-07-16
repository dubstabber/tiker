const mongoose = require('mongoose');

const subCommentSchema = new mongoose.Schema({
  username: String,
  name: String,
  avatar: String,
  userId: String,
  comment: String,
  timestamp: String,
  likes: Array,
});

const commentSchema = new mongoose.Schema({
  userId: String,
  comment: String,
  timestamp: String,
  likes: Array,
  subComments: [subCommentSchema],
});

const postSchema = new mongoose.Schema(
  {
    userId: String,
    caption: String,
    video: String,
    likes: Array,
    comments: [commentSchema],
    timestamp: String,
  },
  { collection: 'posts' }
);

module.exports = mongoose.model('Post', postSchema);
