import React, {useState, useEffect} from 'react'
import './Card.styles.css'

function Card({post, follow, followedUsers}) {
    const [isFollowed, setIsFollowed] = useState(false)
    const timestamp = post.timestamp
    const timeStampReformat = timestamp.slice(2, timestamp.indexOf('T'))

    useEffect(() => {
      setIsFollowed(!followedUsers.every(user => user.id !== post.userId))
    },[followedUsers, post.userId])

    return (
      <div className="card">
        <div className="break" />
        <div className="section">
          <div className="user-info">
            <img className="user-profile" src={post.avatar} width={"100%"} alt="user-profile" />
            <div>
              <div className="section">
                <h3 className="bold">{post.username}</h3>
                <p className="username">{post.name}</p>
                <p>{timeStampReformat}</p>
              </div>
              <p>{post.caption}</p>
            </div>
          </div>
          {<div onClick={() => follow(post.username)} className={isFollowed ? "followed-button":"follow-button"}>
              {isFollowed ? "Following" :"Follow"}
            </div>}
        </div>
        {post.contentType === 'video' && <video className="video" controls>
          <source src={post.content} type="video/mp4" />
        </video>}
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
