import React, { useState, useContext } from 'react';
import MicroCard from '../MicroCard/MicroCard';
import AuthContext from '../../context/auth/authContext';
import DialogContext from '../../context/dialog/dialogContext';
import HomeContext from '../../context/home/homeContext';
import './FollowersColumn.styles.css';

const FollowersColumn = ({ users }) => {
  const authContext = useContext(AuthContext);
  const [navigationActive, setNavigationActive] = useState(false);
  const { showModalDialog, postDialog } = useContext(DialogContext);
  const { allPosts, getAllPosts, getFollowedPosts, foundUsers } =
    useContext(HomeContext);

  const handleLogin = () => {
    showModalDialog();
  };

  const toggleNavigation = () => {
    setNavigationActive((prev) => !prev);
  };

  return (
    <>
      {!foundUsers && !postDialog && (
        <div onClick={toggleNavigation} className="followers-navigation">
          <div
            className={
              navigationActive
                ? 'followers-hamburger--black'
                : 'followers-hamburger--white'
            }
          ></div>
        </div>
      )}
      <div
        className={
          navigationActive ? 'followers-column--mobile' : 'followers-column'
        }
      >
        {navigationActive && <div className="mobile-logo"></div>}
        <div onClick={getAllPosts} className="followers-section">
          <div className={allPosts === 2 ? 'home-red' : 'home'} />
          <h2
            className={
              allPosts === 2 ? 'bold red followers-text' : 'followers-text'
            }
          >
            For You
          </h2>
        </div>
        <div
          onClick={authContext.isAuth ? getFollowedPosts : handleLogin}
          className="followers-section"
        >
          <div className={allPosts === 1 ? 'following-red' : 'following'} />
          <h2
            className={
              allPosts === 1 ? 'bold red followers-text' : 'followers-text'
            }
          >
            Following
          </h2>
        </div>
        {authContext.isAuth && (
          <p className="followers-text">Your top accounts</p>
        )}
        <hr />
        {authContext.isAuth ? (
          users &&
          users.map((user, index) => <MicroCard key={index} user={user} />)
        ) : (
          <>
            <span className="login-caption">
              Log in to follow creators, like videos, and view comments.
            </span>
            <div onClick={handleLogin} className="white-btn">
              Login
            </div>
          </>
        )}
        <div onClick={toggleNavigation} className="mobile-shadow"></div>
        <hr />
      </div>
    </>
  );
};

export default FollowersColumn;
