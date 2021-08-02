import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/auth/authContext';
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
    if (authContext.isAuth) {
      setIsFollowed(
        !authContext.user.following.every(
          (id) => id.id !== homeContext.profile.id
        )
      );
    }
  }, [homeContext.profile.id, homeContext.profile, authContext]);

  useEffect(() => {
    if (viewContent) {
      axios.get('/getPosts/user/' + homeContext.profile.id).then((data) => {
        setVideos(data.data);
      });
    } else {
      axios.get('/getPosts/liked/' + homeContext.profile.id).then((data) => {
        setVideos(data.data);
      });
    }
  }, [viewContent, homeContext.profile.id]);

  return (
    <div className="profile__container">
      <div className="profile__info">
        <img
          className="user-profile-big user-profile-scale"
          src={
            homeContext.profile.avatar
              ? homeContext.profile.avatar
              : './images/user-icon.jpg'
          }
          alt="profile-avatar"
        />
        <div className="profile__data">
          <div className="profile__username">
            {homeContext.profile.username}
          </div>
          <div className="profile__name">{homeContext.profile.name}</div>
          {authContext.user && authContext.user.id !== homeContext.profile.id && (
            <div
              onClick={() =>
                homeContext.followUser(homeContext.profile.username)
              }
              className={isFollowed ? 'followed-button' : 'follow-button'}
            >
              {isFollowed ? 'Following' : 'Follow'}
            </div>
          )}
        </div>
        <div className="profile__stats">
          <div className="profile__following">
            <span className="profile__following--number">
              {homeContext.profile.following &&
                homeContext.profile.following.length}
            </span>{' '}
            Following
          </div>
          <div className="profile__followers">
            <span className="profile__followers--number">
              {homeContext.profile.followers &&
                homeContext.profile.followers.length}
            </span>{' '}
            Followers
          </div>
        </div>
        <div className="profile__bio">
          <div>{homeContext.profile.bio}</div>
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
            <Video key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
