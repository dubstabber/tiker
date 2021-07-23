import React, { useContext } from 'react';
import MicroCard from '../MicroCard/MicroCard';
import AuthContext from '../../context/home/authContext';
import DialogContext from '../../context/home/dialogContext';
import HomeContext from '../../context/home/homeContext';
import './FollowersColumn.styles.css';

const FollowersColumn = ({ users }) => {
  const authContext = useContext(AuthContext);
  const { showModalDialog } = useContext(DialogContext);
  const { allPosts, getAllPosts, getFollowedPosts, getProfile } =
    useContext(HomeContext);

  const handleLogin = () => {
    showModalDialog();
  };

  return (
    <div className="followers-column">
      <div onClick={getAllPosts} className="followers-section">
        <div className={allPosts === 2 ? 'home-red' : 'home'} />
        <h2 className={allPosts === 2 ? 'bold red' : ''}>For You</h2>
      </div>
      <div onClick={getFollowedPosts} className="followers-section">
        <div className={allPosts === 1 ? 'following-red' : 'following'} />
        <h2 className={allPosts === 1 ? 'bold red' : ''}>Following</h2>
      </div>
      {authContext.isAuth && <p>Your top accounts</p>}
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
      <hr />
    </div>
  );
};

export default FollowersColumn;
