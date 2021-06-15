import React from 'react'
import './MiniCard.styles.css'

function MiniCard({user, toggleFollow}) {
    return (
        <div className="section minicard">
            <div className="section">
                    <img className="user-profile" src={user.avatar} width={'100%'} alt="user-profile"/>
                <div>
                    <h3 className="bold">{user.username}</h3>
                    <p>{user.name}</p>
                </div>
            </div>
            {<div className={user.is_followed ? "followed-button" : "follow-button"}
            onClick={() => toggleFollow(user)}
            >
              {user.is_followed ? "Following" : "Follow"}
            </div>}
        </div>
    )
}

export default MiniCard
