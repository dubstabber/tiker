const express = require('express')
const { body, check, validationResult } = require('express-validator')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const axios = require('axios')
const jwt = require('jsonwebtoken')

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
            } else {
                return res.send(`An unknown error occured`)
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

app.post('/login', 
    body('email').isEmail(),
    check('password').exists(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try{
            let user = await User.findOne({email: req.body.email})
            if(!user){
                res.status(401).json({ msg: 'Your email or password is invalid' })
            }

            const isMatch = req.body.password === user.password
            if(!isMatch){
                res.status(401).json({ msg: 'Your email or password is invalid' })
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                'jwtSecret', {
                expiresIn: 360000
            }, (err, token) => {
                if(err) throw err
                return res.json({ token })
            })

        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
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

app.get('/getUsers/:quantity', async (req, res) => {
    let limit = parseInt(req.params.quantity)
    if(isNaN(limit)) limit = 1

    let users = await User.find({}).limit(limit)
    if(!users) return res.send('Users cannot be retrieved')

    let usersData = users.map((el) => {
        return {
            name: el.name,
            username: el.username,
            avatar: el.avatar,
            following: el.following,
            followers: el.followers,
        }
    })

    return res.json(usersData)
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

app.get('/getProfile',
    auth,
    async (req, res) => {
        if(req.user.id){
            let user = await User.findOne({_id: req.user.id})
            if(!user) {
                return res.send(`Cannot log in with this token`)
            }

            let userData = {
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                following: user.following,
                followers: user.followers
            }

            return res.json(userData)
        }
        return res.json('You are not logged in')
})

app.post('/add', 
    auth,
    (req, res) => {
    if(req.body){
        User.create(req.body).then(data => {
            res.send('OK')
        })
    }
})

function auth(req, res, next){
    const token = req.header('x-auth-token')

    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    try{
        const decoded = jwt.verify(token, 'jwtSecret')

        req.user = decoded.user
        next()
    }catch(err){
        res.status(401).json({ msg: 'Token is not valid' })
    }
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))