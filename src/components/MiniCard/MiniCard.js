import React, {useContext} from 'react'
import { AppContext } from '../../context'
import './MiniCard.styles.css'

function MiniCard({notFollowingUser, follow}) {
    const {setShowProfile} = useContext(AppContext)
    // console.log(notFollowingUser.id)
    return (
        <div className="section minicard">
            <div className="section">
                    <img onClick={() => setShowProfile(notFollowingUser.id)} className="user-profile" src={notFollowingUser.avatar ? notFollowingUser.avatar : './images/user-icon.jpg'} width={'100%'} alt="user-profile"/>
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
