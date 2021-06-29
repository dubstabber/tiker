import React from 'react'
import './MiniCard.styles.css'

function MiniCard({notFollowingUser, follow}) {
    return (
        <div className="section minicard">
            <div className="section">
                    <img className="user-profile" src={notFollowingUser.avatar ? notFollowingUser.avatar : './images/user-icon.jpg'} width={'100%'} alt="user-profile"/>
                <div>
                    <h3 className="bold">{notFollowingUser.username}</h3>
                    <p>{notFollowingUser.name}</p>
                </div>
            </div>
            {<div onClick={() => follow(notFollowingUser.username)} className="follow-button">
              Follow
            </div>}
        </div>
    )
}

export default MiniCard
