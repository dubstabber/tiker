import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {AppContext} from '../../context'
import './Header.styles.css'

const Header = () => {
  const {user, setShowModalDialog} = useContext(AppContext)

  const handleLogin = () => {
    setShowModalDialog(true);
  }

  return (
    <div className="header">
      <Link to='/'>
        <div className="logo"></div>
      </Link>
      <div className="upload-container">
        <div className="section">
          <Link to='/upload'>
            <div className="upload" />
          </Link>
          {user.isAuth ? <img className="personal" src={user.avatar ? user.avatar : './images/user-icon.jpg'} alt='personal'/>
        : <button onClick={handleLogin} className='login-btn'>Login</button>  
        }
        </div>
      </div>
    </div>
  )  
}
  
export default Header