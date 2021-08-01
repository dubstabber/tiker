import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import HomeContext from '../../context/home/homeContext';
import DialogContext from '../../context/dialog/dialogContext';
import './Header.styles.css';

const Header = () => {
  const authContext = useContext(AuthContext);
  const { getAllPosts, getProfile, findUser } = useContext(HomeContext);
  const { showModalDialog } = useContext(DialogContext);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      findUser(search);
    }
  };

  const handleLogin = () => {
    showModalDialog();
  };

  const handleLogout = () => {
    authContext.logout();
    window.location.reload();
    return <Redirect to="/" />;
  };

  return (
    <div className="header">
      <Link to="/">
        <div onClick={getAllPosts} className="logo"></div>
      </Link>
      <form onSubmit={handleSearch} className="search-container">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          placeholder="Search accounts"
          value={search}
        />
        {search && (
          <div onClick={() => setSearch('')} className="search-clear"></div>
        )}
        <span className="search-split"></span>
        <button className="search-btn"></button>
      </form>

      <div className="section">
        <div className="upload-container">
          {authContext.isAuth ? (
            <Link to="/upload">
              <div className="upload" />
              <div className="upload-tooltip">Upload video</div>
            </Link>
          ) : (
            <div onClick={handleLogin} className="upload" />
          )}
          <div className="upload-tooltip">Upload video</div>
        </div>
        {authContext.isAuth ? (
          <div className="personal-user">
            <img
              className="personal"
              src={
                authContext.user && authContext.user.avatar
                  ? authContext.user.avatar
                  : './images/user-icon.jpg'
              }
              alt="personal"
            />
            <div className="personal-options">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <p
                  onClick={() => getProfile(authContext.user.id)}
                  className="personal-option"
                >
                  View profile
                </p>
              </Link>
              <Link to="/settings" style={{ textDecoration: 'none' }}>
                <p className="personal-option">Settings</p>
              </Link>
              <hr />
              <p onClick={handleLogout} className="personal-option">
                Log out
              </p>
            </div>
          </div>
        ) : (
          <button onClick={handleLogin} className="login-btn">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
