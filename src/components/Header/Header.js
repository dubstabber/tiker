import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AppContext} from '../../context'
import './Header.styles.css'

const Header = (props) => {
  const {user, setShowModalDialog} = useContext(AppContext)

  const handleLogin = () => {
    setShowModalDialog(true);
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <div className="header">
      <Link to='/' onClick={() => window.location.reload()}>
        <div className="logo"></div>
      </Link>
      <div className="upload-container">
        <div className="section">
          <Link to='/upload'>
            <div className="upload" />
          </Link>
          {user.isAuth ? 
            <div>
              <img className="personal" src={user.avatar ? user.avatar : './images/user-icon.jpg'} alt='personal'/>
              <div className='personal-options'>
                <p className="personal-option">View profile</p>
                <p className="personal-option">Settings</p>
                <hr/>
                <p onClick={handleLogout} className="personal-option">Log out</p>
              </div>
            </div>
        : <button onClick={handleLogin} className='login-btn'>Login</button>  
        }
        </div>
      </div>
    </div>
  )  
}
  
export default Header