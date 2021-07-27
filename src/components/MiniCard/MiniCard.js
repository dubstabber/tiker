import React, { useContext } from 'react';
import HomeContext from '../../context/home/homeContext';
import './MiniCard.styles.css';

function MiniCard({ notFollowingUser }) {
  const { getProfile, followUser } = useContext(HomeContext);

  const handleFollow = () => {
    followUser(notFollowingUser.username);
  };

  return (
    <div className="section minicard">
      <div onClick={() => getProfile(notFollowingUser.id)} className="section">
        <img
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
        <div onClick={handleFollow} className="follow-button">
          Follow
        </div>
      }
    </div>
  );
}

export default MiniCard;
