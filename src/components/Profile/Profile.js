import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context';

import './Profile.styles.css';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  const { user, showProfile } = useContext(AppContext);

  useEffect(() => {
    axios
      .get('/getUser/' + showProfile)
      .then((data) => {
        setUserData(data.data);
        setIsFollowed(!user.following.every((id) => id.id !== showProfile));
      })
      .catch((err) => {
        console.error('User could not be fetched');
      });
  }, [showProfile, user]);

  return (
    <div className="profile__container">
      <img
        className="user-profile-big"
        src={userData.avatar ? userData.avatar : './images/user-icon.jpg'}
        alt="profile-avatar"
      />
      <div>{userData.username}</div>
      <div>{userData.name}</div>
      {user.id !== showProfile && (
        <div>{isFollowed ? 'Following' : 'Follow'}</div>
      )}
      <div>{userData.following && userData.following.length} Following</div>
      <div>{userData.followers && userData.followers.length} Followers</div>
      <div>{userData.bio}</div>
    </div>
  );
};

export default Profile;
