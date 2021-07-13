import React, {useContext} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {AppContext} from '../../context'
import './Header.styles.css'

const Header = (props) => {
  const {user, setShowModalDialog, setShowProfile, resetState} = useContext(AppContext)

  const handleLogin = () => {
    setShowModalDialog(true);
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    resetState()
    window.location.reload()
    return <Redirect to='/' />
  }

  return (
    <div className="header">
      <Link to='/'>
        <div onClick={() => setShowProfile(null)} className="logo"></div>
      </Link>
      <div className="upload-container">
        <div className="section">
          {user.isAuth ? <Link to='/upload'>
            <div className="upload" />
          </Link>: <div onClick={handleLogin} className="upload" />}
          {user.isAuth ? 
            <div>
              <img className="personal" src={user.avatar ? user.avatar : './images/user-icon.jpg'} alt='personal'/>
              <div className='personal-options'>
                <Link to='/profile' style={{ textDecoration: 'none' }}>
                  <p className="personal-option">View profile</p>
                </Link>
                <Link to='/settings' style={{ textDecoration: 'none' }}>
                  <p className="personal-option">Settings</p>
                </Link>
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