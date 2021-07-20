import React, { useContext } from 'react';
import MicroCard from '../MicroCard/MicroCard';
import { AppContext } from '../../context';
import './FollowersColumn.styles.css';

const FollowersColumn = ({ users, allPosts, setAllPosts }) => {
  const { user, setShowModalDialog, setShowProfile } = useContext(AppContext);

  const handleLogin = () => {
    setShowModalDialog(true);
  };

  return (
    <div className="followers-column">
      <div
        onClick={() => {
          setShowProfile(null);
          setAllPosts(2);
        }}
        className="followers-section"
      >
        <div className={allPosts === 2 ? 'home-red' : 'home'} />
        <h2 className={allPosts === 2 ? 'bold red' : ''}>For You</h2>
      </div>
      <div
        onClick={() => {
          setShowProfile(null);
          setAllPosts(1);
        }}
        className="followers-section"
      >
        <div className={allPosts === 1 ? 'following-red' : 'following'} />
        <h2 className={allPosts === 1 ? 'bold red' : ''}>Following</h2>
      </div>
      {user.isAuth && <p>Your top accounts</p>}
      <hr />
      {user.isAuth ? (
        users &&
        users.map((user, index) => (
          <MicroCard key={index} user={user} setAllPosts={setAllPosts} />
        ))
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
      <hr />
    </div>
  );
};

export default FollowersColumn;
