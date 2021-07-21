import React, { useContext } from 'react';
import { AppContext } from '../../context';
import './MiniCard.styles.css';

function MiniCard({ notFollowingUser, setAllPosts }) {
  const { setShowProfile, followUser } = useContext(AppContext);

  const handleShowProfile = () => {
    setAllPosts(0);
    setShowProfile(notFollowingUser.id);
  };

  return (
    <div className="section minicard">
      <div className="section">
        <img
          onClick={handleShowProfile}
          className="user-profile"
          src={
            notFollowingUser.avatar
              ? notFollowingUser.avatar
              : './images/user-icon.jpg'
          }
          width={'100%'}
          alt="user-profile"
        />
        <div>
          <h3 className="bold">{notFollowingUser.username}</h3>
          <p>{notFollowingUser.name}</p>
        </div>
      </div>
      {
        <div
          onClick={() => followUser(notFollowingUser.username)}
          className="follow-button"
        >
          Follow
        </div>
      }
    </div>
  );
}

export default MiniCard;
