const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
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
    avatar: String,
    is_followed: Boolean,
    video: String,
    caption: String,
    likes: Number,
    comments: Number,
    timestamp: String,
    button_visible: Boolean
});

const User = mongoose.model('User', userSchema);


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
    const {is_followed} = JSON.parse(req.query.data)
    User.updateOne({_id: req.params.id}, {is_followed}, (err, arr) => {
        res.json(arr);
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));