import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import HomeContext from '../../context/home/homeContext';
import DialogContext from '../../context/dialog/dialogContext';
import './Card.styles.css';
import axios from 'axios';

function Card({ post }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);
  const [likes, setLikes] = useState(0);
  const authContext = useContext(AuthContext);
  const { getProfile, followUser } = useContext(HomeContext);
  const { showModalDialog, showPostDialog } = useContext(DialogContext);
  const timestamp = post.timestamp;
  const timeStampReformat = timestamp.slice(2, timestamp.indexOf('T'));

  useEffect(() => {
    if (authContext.isAuth && authContext.user) {
      if (authContext.user.id === post.userId) setIsMyPost(true);
      else
        setIsFollowed(
          !authContext.user.following.every(
            (followedUser) => followedUser.id !== post.userId
          )
        );

      setLikes(post.likes.length);
    }
  }, [authContext.user, post, authContext]);

  const handleShowProfile = () => {
    getProfile(post.userId);
  };

  const handleLike = async () => {
    if (authContext.isAuth) {
      const res = await axios.put('/likePost', { id: post._id });
      if (res) setLikes(res.data);
    } else {
      showModalDialog();
    }
  };

  const handleFollow = () => {
    followUser(post.username);
  };

  return (
    <div className="card">
      <div className="break" />
      <div className="section">
        <div className="user-info">
          <img
            onClick={handleShowProfile}
            className="user-profile"
            src={post.avatar ? post.avatar : './images/user-icon.jpg'}
            width={'100%'}
            alt="user-profile"
          />
          <div>
            <div onClick={handleShowProfile} className="user-infoData">
              <h3 className="bold">{post.username}</h3>
              <p className="username">{post.name}</p>
              <p className="user-timestamp">{timeStampReformat}</p>
            </div>
            <p className="user-caption">{post.caption}</p>
          </div>
        </div>
        {!isMyPost && (
          <div
            onClick={handleFollow}
            className={isFollowed ? 'followed-button' : 'follow-button'}
          >
            {isFollowed ? 'Following' : 'Follow'}
          </div>
        )}
      </div>
      <video key={post._id} className="video" controls>
        <source src={post.video} type="video/mp4" />
      </video>
      <div className="section socials">
        <i onClick={handleLike} className="far fa-heart social-mini-icon"></i>
        <div className="social-tag">{likes}</div>
        <i
          onClick={() => showPostDialog(post._id)}
          className="far fa-comment-dots social-mini-icon"
        ></i>
        <div className="social-tag">{post.comments.length}</div>
        <i className="far fa-share-square social-mini-icon"></i>
      </div>
    </div>
  );
}

export default Card;
