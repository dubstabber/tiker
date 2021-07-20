import React, { useContext } from 'react';
import { AppContext } from '../../context';
import './MiniCard.styles.css';

function MiniCard({ notFollowingUser, setAllPosts }) {
  const { setShowProfile, followUser } = useContext(AppContext);

  return (
    <div className="section minicard">
      <div className="section">
        <img
          onClick={() => {
            setAllPosts(0);
            setShowProfile(notFollowingUser.id);
          }}
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
