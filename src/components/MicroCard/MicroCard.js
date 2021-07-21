import React, { useContext } from 'react';
import { AppContext } from '../../context';
import './MicroCard.styles.css';

const MicroCard = ({ user, setAllPosts }) => {
  const { setShowProfile } = useContext(AppContext);

  const handleShowProfile = () => {
    setAllPosts(0);
    setShowProfile(user.id);
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
