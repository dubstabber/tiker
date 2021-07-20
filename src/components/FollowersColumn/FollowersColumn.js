import React, { useContext } from 'react';
import MicroCard from '../MicroCard/MicroCard';
import { AppContext } from '../../context';
import './FollowersColumn.styles.css';

const FollowersColumn = ({ users, allPosts, setAllPosts }) => {
  const { user, setShowModalDialog } = useContext(AppContext);

  const handleLogin = () => {
    setShowModalDialog(true);
  };

  return (
    <div className="followers-column">
      <div onClick={() => setAllPosts(true)} className="followers-section">
        <div className={allPosts ? 'home-red' : 'home'} />
        <h2 className={allPosts && 'bold red'}>For You</h2>
      </div>
      <div onClick={() => setAllPosts(false)} className="followers-section">
        <div className={allPosts ? 'following' : 'following-red'} />
        <h2 className={!allPosts && 'bold red'}>Following</h2>
      </div>
      {user.isAuth && <p>Your top accounts</p>}
      <hr />
      {user.isAuth ? (
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
