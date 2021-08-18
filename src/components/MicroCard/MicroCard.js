import React, { useContext } from 'react';
import HomeContext from '../../context/home/homeContext';
import './MicroCard.styles.css';

const MicroCard = ({ user }) => {
  const { getProfile } = useContext(HomeContext);

  const handleShowProfile = () => {
    getProfile(user.id);
  };

  return (
    <div onClick={handleShowProfile} className="section microcard">
      <img
        className="user-profile"
        src={user.avatar ? user.avatar : './images/user-icon.jpg'}
        width={'100%'}
        alt="user-profile"
      />
      <div className="microcard-user">
        <h3 className="bold">{user.username}</h3>
        <p className="microcard-name">{user.name}</p>
      </div>
    </div>
  );
};

export default MicroCard;
