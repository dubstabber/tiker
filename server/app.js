const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb://localhost/tikerDB', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongoDB!')
});

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    avatar: String,
    following: Array,
    followers: Array
});

const postSchema = new mongoose.Schema({
    id: String,
    content: String,
    caption: String,
    likes: Number,
    comments: Number,
    timestamp: String
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({
        status: 'server works!'
    });
});

app.get('/posts', (req, res) => {
    User.find(null, (err, arr)=>{
        res.json(arr);
    })
});

app.put('/edit/:id', (req, res) => {
    const data = JSON.parse(req.query.data)

    if(data){
        User.updateOne({_id: req.params.id}, data, (err, arr) => {
            res.json(arr);
        });
    }
})

app.post('/add', (req, res) => {
    if(req.body){
        User.create(req.body).then(data => {
            res.send('OK')
        });
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));