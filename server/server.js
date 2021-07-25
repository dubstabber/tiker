const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost/tikerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongoDB!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/updateAccount', require('./routes/updateAccount'));
app.use('/getPosts', require('./routes/getPosts'));
app.use('/getPost', require('./routes/getPost'));
app.use('/getFollowedPosts', require('./routes/getFollowedPosts'));
app.use('/getPostComments', require('./routes/getPostComments'));
app.use('/getSuggestedUsers', require('./routes/getSuggestedUsers'));
app.use('/getUsers', require('./routes/getUsers'));
app.use('/getUser', require('./routes/getUser'));
app.use('/getProfile', require('./routes/getProfile'));
app.use('/searchUsers', require('./routes/searchUsers'));
app.use('/getFollowing', require('./routes/getFollowing'));
app.use('/follow', require('./routes/follow'));
app.use('/likePost', require('./routes/likePost'));
app.use('/comment', require('./routes/comment'));
app.use('/commentTheComment', require('./routes/commentTheComment'));
app.use('/likeComment', require('./routes/likeComment'));
app.use('/likeSubcomment', require('./routes/likeSubcomment'));
app.use('/addPost', require('./routes/addPost'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
