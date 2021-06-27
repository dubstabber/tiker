import React, {useEffect} from 'react'
import './MiniCard.styles.css'

function MiniCard({user, follow}) {

    useEffect(() => {
        
    })

    return (
        <div className="section minicard">
            <div className="section">
                    <img className="user-profile" src={user.avatar ? user.avatar : './images/user-icon.jpg'} width={'100%'} alt="user-profile"/>
                <div>
                    <h3 className="bold">{user.username}</h3>
                    <p>{user.name}</p>
                </div>
            </div>
            {<div onClick={() => follow(user.username)} className={user.is_followed ? "followed-button" : "follow-button"}>
              {user.is_followed ? "Following" : "Follow"}
            </div>}
        </div>
    )
}

export default MiniCard
