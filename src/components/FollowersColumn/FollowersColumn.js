import React, {useContext} from 'react'
import MicroCard from '../MicroCard/MicroCard'
import {AppContext} from '../../context'
import './FollowersColumn.styles.css'


const FollowersColumn = (topFiveFollowing) => {
  const {user, setShowModalDialog} = useContext(AppContext)
  const users = topFiveFollowing.users

  const handleLogin = () => {
    setShowModalDialog(true)
  }

  return (
    <div className="followers-column">
      <div className="followers-section">
        <div className="home" />
        <h2 className="bold red">For You</h2>
      </div>
      <div className="followers-section">
        <div className="following" />
        <h2>Following</h2>
      </div>
      {(users && user.isAuth) && <p>Your top accounts</p>}
      <hr />
      {(users && user.isAuth) ? users.map((user, index) => (
        <MicroCard 
            key={index} user={user}
        />)) : <><span className="login-caption">Log in to follow creators, like videos, and view comments.</span>
        <div onClick={handleLogin} className="white-btn">Login</div></>}
      <hr />
    </div>
  )
}

export default FollowersColumn