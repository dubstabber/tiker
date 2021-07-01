import React, {useState, useEffect, useContext} from 'react'
import {AppContext} from '../../context'
import './Card.styles.css'

function Card({post, follow, followedUsers}) {
    const [isFollowed, setIsFollowed] = useState(false)
    const [isMyPost, setIsMyPost] = useState(false)
    const {user} = useContext(AppContext)
    const timestamp = post.timestamp
    const timeStampReformat = timestamp.slice(2, timestamp.indexOf('T'))

    useEffect(() => {
      if(user.id === post.userId)
        setIsMyPost(true)
      else
        setIsFollowed(!followedUsers.every(followed => followed.id !== post.userId))
    },[followedUsers, post.userId, user.id])

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
          <i className="far fa-heart"></i>
          <div className="social-tag">{post.likes}</div>
          <i className="far fa-comment-dots"></i>
          <div className="social-tag">{post.comments}</div>
          <i className="far fa-share-square"></i>
        </div>
      </div>
    );
}

export default Card
