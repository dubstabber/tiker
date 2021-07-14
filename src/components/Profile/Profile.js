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
      <div className="profile__info">
        <img
          className="user-profile-big"
          src={userData.avatar ? userData.avatar : './images/user-icon.jpg'}
          alt="profile-avatar"
        />
        <div className="profile__data">
          <div className="profile__username">{userData.username}</div>
          <div className="profile__name">{userData.name}</div>
          {user.id !== showProfile && (
            <div className={isFollowed ? 'followed-button' : 'follow-button'}>
              {isFollowed ? 'Following' : 'Follow'}
            </div>
          )}
        </div>
        <div className="profile__stats">
          <div className="profile__following">
            <span className="profile__following--number">
              {userData.following && userData.following.length}
            </span>{' '}
            Following
          </div>
          <div className="profile__followers">
            <span className="profile__followers--number">
              {userData.followers && userData.followers.length}
            </span>{' '}
            Followers
          </div>
        </div>
        <div className="profile__bio">
          <div>{userData.bio}</div>
        </div>
      </div>

      <div className="profile__posts"></div>
    </div>
  );
};

export default Profile;
