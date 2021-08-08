import React, { useContext } from 'react';
import HomeContext from '../../context/home/homeContext';

import './MediumCard.styles.css';

const MediumCard = ({ user }) => {
  const { getProfile } = useContext(HomeContext);

  return (
    <div onClick={() => getProfile(user.id)} className="mediumCard__container">
      <img
        className="user-profile"
        src={user.avatar ? user.avatar : './images/user-icon.jpg'}
        alt="user-avatar"
      />
      <div className="mediumCard__info">
        <h3 className="bold">{user.username}</h3>

        <div>
          <span className="mediumCard__name">
            {user.name}
            {' · '}
          </span>{' '}
          <span className="mediumCard__followers--number bold">
            {user.followers.length}
          </span>{' '}
          <span>Followers</span>
        </div>
        <div className="mediumCard__bio">{user.bio}</div>
      </div>
    </div>
  );
};

export default MediumCard;
