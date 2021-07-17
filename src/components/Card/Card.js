import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context';
import PostDialog from '../PostDialog/PostDialog';
import './Card.styles.css';

function Card({ post, followedUsers }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);
  const [likes, setLikes] = useState(0);
  const { user, setShowModalDialog, setShowProfile, followUser, likePost } =
    useContext(AppContext);
  const [postDialogVisibility, setPostDialogVisibility] = useState(false);
  const timestamp = post.timestamp;
  const timeStampReformat = timestamp.slice(2, timestamp.indexOf('T'));

  useEffect(() => {
    if (user.isAuth) {
      if (user.id === post.userId) setIsMyPost(true);
      else
        setIsFollowed(
          !followedUsers.every((followed) => followed.id !== post.userId)
        );

      setLikes(post.likes.length);
    }
  }, [followedUsers, post, user]);

  const handleShowProfile = () => {
    setShowProfile(post.userId);
  };

  const handleLike = async () => {
    if (user.isAuth) {
      const likesCount = await likePost(post._id);
      setLikes(likesCount);
    } else {
      setShowModalDialog(true);
    }
  };

  const handleComment = async () => {
    if (user.isAuth) {
      setPostDialogVisibility(true);
      document.querySelector('body').classList.add('hide-scroll');
    } else {
      setShowModalDialog(true);
    }
  };

  if (postDialogVisibility)
    return (
      <PostDialog
        post={post}
        isFollowed={isFollowed}
        isMyPost={isMyPost}
        setPostDialogVisibility={setPostDialogVisibility}
        handleComment={handleComment}
        likes={likes}
      />
    );

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
            <div className="section">
              <h3 className="bold">{post.username}</h3>
              <p className="username">{post.name}</p>
              <p>{timeStampReformat}</p>
            </div>
            <p>{post.caption}</p>
          </div>
        </div>
        {!isMyPost && (
          <div
            onClick={() => followUser(post.username)}
            className={isFollowed ? 'followed-button' : 'follow-button'}
          >
            {isFollowed ? 'Following' : 'Follow'}
          </div>
        )}
      </div>
      <video className="video" controls>
        <source src={post.video} type="video/mp4" />
      </video>
      <div className="section socials">
        <i onClick={handleLike} className="far fa-heart social-mini-icon"></i>
        <div className="social-tag">{likes}</div>
        <i
          onClick={handleComment}
          className="far fa-comment-dots social-mini-icon"
        ></i>
        <div className="social-tag">{post.comments.length}</div>
        <i className="far fa-share-square social-mini-icon"></i>
      </div>
    </div>
  );
}

export default Card;
