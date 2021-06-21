const express = require('express')
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

mongoose.connect('mongodb://localhost/tikerDB', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
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
    followers: Array,
    createdAt: String
},{ collection : 'users' })

const postSchema = new mongoose.Schema({
    userId: String,
    caption: String,
    contentType: String,
    content: String,
    likes: Number,
    comments: Number,
    timestamp: String
},{ collection : 'posts' })

const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', postSchema)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.json({
        status: 'server works!'
    })
})

app.post('/register', 
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('password2').isLength({ min: 6 }),
    (req, res) => {
        if(req.body.password !== req.body.password2){
            return res.send('Passwords do not match')
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        User.find({email: req.body.email}, (err, arr) => {
            if(!err){
                if(arr.length !== 0){
                    return res.send(`account ${req.body.email} exists`)
                }
            }
        })
        const defaultUsername = req.body.email.slice(0,req.body.email.indexOf('@'))
        const newUser = {
            name: "",
            username: defaultUsername,
            password: req.body.password,
            email:req.body.email,
            avatar: null,
            following: [],
            followers: [],
            createdAt: new Date()
        }
        User.create(newUser, (err, arr) => {
            if(err){
                console.log(`Account could not be created: ${err}`)
                return res.send("Account could not be created")
            } else {
                return res.send(`Account '${req.body.email}' has been created`)
            }
        })
})

app.get('/posts', (req, res) => {
    Post.find(null, (err, arr)=>{
        if(!err) {
            let posts = []
            let promises = []
            arr.forEach(post => {
                promises.push(axios.get('http://localhost:5000/getUser/' + post.userId ).then(user => {
                    readyPost = JSON.parse(JSON.stringify(post))
                    Object.assign(readyPost, user.data)
                    posts.push(readyPost)
                }))
            })
            Promise.all(promises).then(() => {
                res.json(posts);
            }) 
        }
    })

})

app.get('/getUser/:id', (req, res) => {
    User.findOne({_id: req.params.id}, (err, arr) => {
        if(!err){
            if(arr.length !== 0){
                const user = {
                    username: arr.username,
                    name: arr.name,
                    avatar: arr.avatar
                }
                res.json(user)
            }else {
                res.json([])
            }
        } else{
            res.json([])
        }
    })
})

app.post('/add', (req, res) => {
    if(req.body){
        User.create(req.body).then(data => {
            res.send('OK')
        })
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))