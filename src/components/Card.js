import React from 'react'

function Card({user}) {
    const timestamp = user.timestamp
    const timeStampReformat = timestamp.slice(2, 7)

    return (
      <div className="card">
        <div className="break" />
        <div className="section">
          <div className="user-info">
            <img className="user-profile" src={user.avatar} width={"100%"} alt="user-profile" />
            <div>
              <div className="section">
                <h3 className="bold">{user.username}</h3>
                <p className="username">{user.name}</p>
                <p>{timeStampReformat}</p>
              </div>
              <p>{user.caption}</p>
            </div>
          </div>
          {user.button_visible && <div className={user.is_followed ? "followed-button" : "follow-button"}>
              {user.is_followed ? "Following" : "Follow"}
            </div>}
        </div>
        <video className="video" controls>
          <source src={user.video} type="video/mp4" />
        </video>
        <div className="section socials">
          <i className="far fa-heart"></i>
          <div className="social-tag">{user.likes}</div>
          <i className="far fa-comment-dots"></i>
          <div className="social-tag">{user.comments}</div>
          <i className="far fa-share-square"></i>
        </div>
      </div>
    );
}

export default Card
