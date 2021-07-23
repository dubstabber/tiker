import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/home/authContext';
import HomeContext from '../../context/home/homeContext';
import Video from './Video/Video';

import './Profile.styles.css';

const Profile = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [viewContent, setViewContent] = useState(true);
  const [videos, setVideos] = useState([]);
  const authContext = useContext(AuthContext);
  const homeContext = useContext(HomeContext);

  useEffect(() => {
    setIsFollowed(
      !homeContext.profile.following.every((id) => id.id !== showProfile)
    );
  }, [showProfile, homeContext.profile]);

  useEffect(() => {
    if (viewContent) {
      axios.get('/getPosts/user/' + showProfile).then((data) => {
        setVideos(data.data);
      });
    } else {
      axios.get('/getPosts/liked/' + showProfile).then((data) => {
        setVideos(data.data);
      });
    }
  }, [viewContent, showProfile]);

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
          {authContext.user.id !== showProfile && (
            <div
              onClick={() => followUser(userData.username)}
              className={isFollowed ? 'followed-button' : 'follow-button'}
            >
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

      <div className="profile__posts">
        <div
          onClick={() => setViewContent(true)}
          className={viewContent ? 'posts__owned--active' : 'posts__owned'}
        >
          Videos
        </div>
        <div
          onClick={() => setViewContent(false)}
          className={viewContent ? 'posts__liked' : 'posts__liked--active'}
        >
          Liked
        </div>
        <div className="profile__content">
          {videos.map((video) => (
            <Video key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
