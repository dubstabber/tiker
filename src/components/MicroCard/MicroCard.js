import React, { useContext } from 'react';
import HomeContext from '../../context/home/homeContext';
import './MicroCard.styles.css';

const MicroCard = ({ user }) => {
  const { getProfile } = useContext(HomeContext);

  const handleShowProfile = () => {
    getProfile(user.id);
  };

  return (
    <div className="section microcard">
      <img
        onClick={handleShowProfile}
        className="user-profile"
        src={user.avatar ? user.avatar : './images/user-icon.jpg'}
        width={'100%'}
        alt="user-profile"
      />
      <div>
        <h3 className="bold">{user.username}</h3>
        <p>{user.name}</p>
      </div>
    </div>
  );
};

export default MicroCard;
