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
})

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
    video: String,
    likes: Array,
    comments: Array,
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
        let pending = true
        while(pending){
            User.find({username: defaultUsername}, (err, arr) => {
                if(!err){
                    if(arr.length !== 0){
                        defaultUsername += "1"
                    }else {
                        pending = false
                    }
                } else {
                    return res.send(`An unknown error occured`)
                }
            })
        }
        const newUser = {
            name: "",
            username: defaultUsername,
            password: req.body.password,
            email:req.body.email,
            avatar: null,
            following: [],
            followers: [],
            likedPosts: [],
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

app.post('/postComments',
    auth,
    async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.body.postId})
        if(!post) return res.send(`Could not fetch post's comments`)

        const comments = []
        let currentUser

        for(let comment of post.comments){
            currentUser = await User.findOne({_id: comment.userId})
            if(!currentUser) {
                comments.push({})
            }else{
                comments.push({
                    name: currentUser.name,
                    username: currentUser.username,
                    avatar: currentUser.avatar,
                    comment: comment.comment,
                    likes: comment.likes,
                    subComments: comment.subComments,
                    timestamp: comment.timestamp
                })
            }
        }

        return res.json(comments)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

app.get('/getSuggestedUsers',
    auth,
    async (req, res) => {
        try{
            let loggedUser = await User.findOne({_id: req.user.id})
            if(!loggedUser) return res.send('Logged user cannot be retrieved')

            let skipIndex = 0
            let users = []
            let currentUsers = await User.find({}).skip(skipIndex).limit(5)
            if(!currentUsers) return res.send('Users cannot be retrieved')
            skipIndex += 5
            
            while((users.length < 5) && currentUsers.length){
                currentUsers = currentUsers.filter(user => {
                    if(user.id === req.user.id) return false
                    return loggedUser.following.every(followed => {
                        if(followed.id !== user.id){
                            return true
                        } else return false
                    })
                })
                
                users.push(...currentUsers)
                currentUsers = await User.find({}).skip(skipIndex).limit(5)
                if(!currentUsers) return res.send('Users cannot be retrieved')
                skipIndex += 5
            }
            
            return res.json(users)
        }catch(err){
            console.error(err.message)
            res.status(500).send('Server Error')
        }
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
            followers: el.followers
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
                id: req.user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                following: user.following,
                followers: user.followers,
                likedPosts: user.likedPosts
            }

            return res.json(userData)
        }
        return res.json('You are not logged in')
})

app.get('/getFollowing', 
    auth,
    async (req, res) => {
    let user = await User.findOne({_id: req.user.id})
    if(!user) return res.send(`Something went wrong. Cannot get users for user with id ${req.user.id}.`)

    let followers = []
    
    for(const el of user.following){
        let follower = await User.findOne({_id: el.id})
        if(!follower)return res.send(`Follower could not be found`)
        let sanitizedFollower = {
            id: el.id,
            name: follower.name,
            username: follower.username,
            avatar: follower.avatar
        }
        followers.push(sanitizedFollower)
    }

    return res.json(followers)
})

app.get('/getFollowing/:username', async (req, res) => {
    let user = await User.findOne({username: req.params.username})
    if(!user) return res.send(`Something went wrong. Cannot get users for ${req.params.username}.`)

    return res.json(user.following)
})

app.get('/getFollowers/:username', async (req, res) => {
    let user = await User.findOne({username: req.params.username})
    if(!user) return res.send(`Something went wrong. Cannot get users for ${req.params.username}.`)

    return res.json(user.followers)
})

app.put('/follow/:username',
    auth,
    async (req, res) => {
        if(req.user.id){
            let followUser = await User.findOne({username: req.params.username})
            if(!followUser) return res.send(`Something went wrong. User: ${req.params.username} cannot be followed`)

            if(followUser.id === req.user.id) return res.send(`You cannot follow yourself.`)

            let userData = await User.findOne({_id: req.user.id})
            if(!userData) return res.send(`Something went wrong.`)

            let isNotFollowed = userData.following.every((el) => el.id !== followUser.id)
            if(isNotFollowed) {
                userData.following.push({id: followUser.id})
                await User.updateOne({_id: req.user.id}, {following: userData.following})

                followUser.followers.push({id: req.user.id})
                await User.updateOne({_id: followUser.id}, {followers: followUser.followers})

                return res.send(`User successfully followed`)
            }else {
                let index = userData.following.findIndex((el) => el.id === followUser.id)
                userData.following.splice(index, 1)
                await User.updateOne({_id: req.user.id}, {following: userData.following})

                index = followUser.followers.findIndex((el) => el.id === req.user.id)
                followUser.followers.splice(index, 1)
                await User.updateOne({_id: followUser.id}, {followers: followUser.followers})

                return res.send(`User successfully unfollowed`)
            }

            
        }
    })

app.put('/likePost',
    auth,
    async (req, res) => {
        try{
            let post = await Post.findOne({_id: req.body.id})
            if(!post) return res.status(401).json({msg: 'Error: Post could not be liked'})

            let isNotLiked = post.likes.every(userId => userId !== req.user.id)
            if(isNotLiked) {
                post.likes.push(req.user.id)
                await Post.updateOne({_id: req.body.id}, {likes: post.likes})
                
                return res.send(`${post.likes.length}`)
            }else{
                let index = post.likes.indexOf(`${req.user.id}`)
                post.likes.splice(index, 1)
                await Post.updateOne({_id: req.body.id}, {likes: post.likes})

                return res.send(`${post.likes.length}`)
            }

        }catch(err) {
            console.error(err.message)
            res.status(500).send('Server Error') 
        }
})

app.post('/comment',
    auth,
    async (req, res) => {
    let comment = req.body.comment
    comment = comment.trim()
    try{
        if(comment){
            const date = new Date()
            let formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

            const newComment = {
                userId: req.user.id,
                comment: comment,
                timestamp: formattedDate,
                likes: [],
                subComments: []
            }
            
            const post = await Post.findOne({_id : req.body.postId})
            if(!post) return res.send('This post cannot be commented')

            post.comments.push(newComment)
            await Post.updateOne({_id : req.body.postId}, {comments: post.comments}).catch(err =>{
                console.log(err)
            })

            return res.json(newComment)
        }else{
            return res.send('This comment cannot be published')
        }
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error') 
    }
})

app.post('/add', 
    auth,
    async (req, res) => {

    const timestamp = new Date()
    const timestampString = `${timestamp.getFullYear()}-${timestamp.getMonth() +1}-${timestamp.getDate()}T${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`

    const newPost = {
        userId: req.user.id,
        caption: req.body.caption,
        video: req.body.video,
        likes: 0,
        comments: 0,
        timestamp: timestampString
    }
    
    await Post.create(newPost, (err, arr) => {
        if(err) return res.status(401).json({msg: 'Error: Post could not be created'})
        if(arr) return res.json('Post has been created')
    })

    
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