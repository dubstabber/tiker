import React, {useState, useEffect, useContext} from 'react'
import {AppContext} from '../../context'
import axios from 'axios'
import './Card.styles.css'

function Card({post, follow, followedUsers}) {
    const [isFollowed, setIsFollowed] = useState(false)
    const [isMyPost, setIsMyPost] = useState(false)
    const [likes, setLikes] = useState(0)
    const {user, setShowModalDialog, setPostDialog, setCurrentPost} = useContext(AppContext)
    const timestamp = post.timestamp
    const timeStampReformat = timestamp.slice(2, timestamp.indexOf('T'))

    useEffect(() => {
      if(user.isAuth){
        if(user.id === post.userId)
          setIsMyPost(true)
        else
          setIsFollowed(!followedUsers.every(followed => followed.id !== post.userId))

        setLikes(post.likes.length)
      }
    },[followedUsers, post, user])

    const handleLike = async () => {
      if(user.isAuth){
        await axios.put('/likePost', {id: post._id}).then((data) => {
          setLikes(data.data)
        })
      }else {
        setShowModalDialog(true)
      }
    }

    const handleComment = async () => {
      if(user.isAuth){
        setCurrentPost(post)
        setPostDialog(true)
      }else {
        setShowModalDialog(true)
      }
    }

    return (
      <div className="card">
        <div className="break" />
        <div className="section">
          <div className="user-info">
            <img className="user-profile" src={post.avatar ? post.avatar : "./images/user-icon.jpg"} width={"100%"} alt="user-profile" />
            <div>
              <div className="section">
                <h3 className="bold">{post.username}</h3>
                <p className="username">{post.name}</p>
                <p>{timeStampReformat}</p>
              </div>
              <p>{post.caption}</p>
            </div>
          </div>
          {!isMyPost && <div onClick={() => follow(post.username)} className={isFollowed ? "followed-button":"follow-button"}>
              {isFollowed ? "Following" :"Follow"}
            </div>}
        </div>
        <video className="video" controls>
          <source src={post.video} type="video/mp4" />
        </video>
        <div className="section socials">
          <i onClick={handleLike} className="far fa-heart social-mini-icon"></i>
          <div className="social-tag">{likes}</div>
          <i onClick={handleComment} className="far fa-comment-dots social-mini-icon"></i>
          <div className="social-tag">{post.comments}</div>
          <i className="far fa-share-square social-mini-icon"></i>
        </div>
      </div>
    );
}

export default Card
