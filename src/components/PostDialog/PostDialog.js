import React, { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import DialogContext from '../../context/dialog/dialogContext';
import HomeContext from '../../context/home/homeContext';
import axios from 'axios';
import CommentCard from './CommentCard/CommentCard';

import './PostDialog.styles.css';

const PostDialog = () => {
  const authContext = useContext(AuthContext);
  const { postDialog, showPostDialog, showModalDialog, closePostDialog } =
    useContext(DialogContext);
  const { followUser } = useContext(HomeContext);
  const [likes, setLikes] = useState(0);
  const [isMyPost, setIsMyPost] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [comment, setComment] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [commentToReply, setCommentToReply] = useState(null);
  const [replyPlaceholder, setReplyPlaceholder] = useState('');
  const inputElement = useRef(null);
  const timestamp = postDialog && postDialog.timestamp.split('T')[0];

  useEffect(() => {
    if (authContext.isAuth && authContext.user && postDialog) {
      if (authContext.user.id === postDialog.userId) setIsMyPost(true);
      else
        setIsFollowed(
          !authContext.user.following.every(
            (followedUser) => followedUser.id !== postDialog.userId
          )
        );
      setLikes(postDialog.likes.length);
      setPostComments(postDialog.comments);
    }
  }, [postDialog, authContext]);

  const refreshPost = () => {
    showPostDialog(postDialog.id);
  };

  const checkComment = (e) => {
    if (e.target.value.slice(0, replyPlaceholder.length) !== replyPlaceholder) {
      setCommentToReply(null);
      setComment('');
      setReplyPlaceholder('');
    } else {
      setComment(e.target.value);
    }
  };

  const reply = (index) => {
    setCommentToReply(index);
    setReplyPlaceholder(`@${postComments[index].username} :`);
    setComment((prev) => `@${postComments[index].username} :${prev}`);
    inputElement.current.focus();
  };

  const likeComment = async (index) => {
    await axios
      .post('/likeComment', { postId: postDialog.id, commentToLike: index })
      .catch((err) => {
        console.log(err);
      });
    refreshPost();
  };

  const likeSubcomment = async (commentIndex, subCommentIndex) => {
    await axios
      .post('/likeSubcomment', {
        postId: postDialog.id,
        commentIndex,
        subCommentIndex,
      })
      .catch((err) => {
        console.log(err);
      });
    refreshPost();
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (comment) {
      if (commentToReply || commentToReply === 0) {
        await axios
          .post('/commentTheComment', {
            postId: postDialog.id,
            comment,
            commentToReply,
            replyPlaceholder,
          })
          .then((data) => {
            setComment('');
            setCommentToReply(null);
            setReplyPlaceholder('');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await axios
          .post('/comment', { postId: postDialog.id, comment })
          .then((data) => {
            setComment('');
            setCommentToReply(null);
            setReplyPlaceholder('');
          })
          .catch((err) => {
            console.log(err);
          });
      }
      refreshPost();
    }
  };

  const handleLike = async () => {
    if (authContext.isAuth) {
      await axios.put('/likePost', { id: postDialog.id });
      refreshPost();
    } else {
      showModalDialog(false);
    }
  };

  const close = () => {
    closePostDialog();
    document.querySelector('body').classList.remove('hide-scroll');
  };

  if (!postDialog) return <></>;

  return (
    <div className="post-container">
      <span onClick={close} className="post-close"></span>
      <div className="post-left-side">
        <video className="video-page" controls loop>
          <source src={postDialog.video} type="video/mp4" />
        </video>
        <div className="mobile__icons">
          <div className="mobile__icon">
            <img
              className="user-profile"
              src={postDialog.avatar}
              alt="user-avatar"
            />
          </div>
          <div className="mobile__icon">
            <i onClick={handleLike} className="fas fa-heart mobile-icon"></i>
            <div className="social-tag">{likes}</div>
          </div>
          <div className="mobile__icon">
            <i className="fas fa-comment-dots mobile-icon"></i>
            <div className="social-tag">{postDialog.comments.length}</div>
          </div>
          <div className="mobile__icon">
            <i className="far fa-share-square mobile-icon"></i>
          </div>
        </div>
      </div>

      <div className="post-right-side">
        <div className="post-info">
          <div className="post-follow-btn">
            {!isMyPost && (
              <div
                onClick={() => followUser(postDialog.username)}
                className={isFollowed ? 'followed-button' : 'follow-button'}
              >
                {isFollowed ? 'Following' : 'Follow'}
              </div>
            )}
          </div>
          <div className="post-user">
            <img
              className="user-profile"
              src={
                postDialog.avatar ? postDialog.avatar : './images/user-icon.jpg'
              }
              alt="user-avatar"
            />
            <div>
              <h3 className="bold">{postDialog.username}</h3>
              <span>{postDialog.name}</span>
              <span> · </span>
              <span>{timestamp}</span>
            </div>
          </div>
          <div className="post-caption">{postDialog.caption}</div>
          <div className="post-socials">
            <div className="section socials">
              <i
                onClick={handleLike}
                className="far fa-heart social-mini-icon"
              ></i>
              <div className="social-tag">{likes}</div>
              <i className="far fa-comment-dots"></i>
              <div className="social-tag">{postDialog.comments.length}</div>
              <i className="far fa-share-square social-mini-icon"></i>
            </div>
          </div>
        </div>
        <div
          className={
            authContext.isAuth
              ? 'post-comments post-comments--scroll'
              : 'post-comments'
          }
        >
          {authContext.isAuth ? (
            postComments.map((postComment, index) => {
              return (
                <CommentCard
                  key={index}
                  postComment={postComment}
                  index={index}
                  reply={reply}
                  likeComment={likeComment}
                  likeSubcomment={likeSubcomment}
                />
              );
            })
          ) : (
            <div className="post-login">
              <div className="post-login__h1">Login to see the comments</div>
              <div className="post-login__h6">
                Login to see the comments and like the video
              </div>
              <div
                onClick={() => showModalDialog(false)}
                className="post-login__button"
              >
                Login
              </div>
              <div className="post-login__signup">
                <span className="post-login__signup-info">
                  Don't have an account?
                </span>{' '}
                <span
                  onClick={() => showModalDialog(true)}
                  className="post-login__signup-btn"
                >
                  Sign up
                </span>
              </div>
            </div>
          )}
        </div>
        {authContext.isAuth && (
          <div className="post-add-comment">
            <form onSubmit={addComment} className="post-form">
              <input
                onChange={checkComment}
                value={comment}
                name="addComment"
                className="post-input"
                placeholder="Add comment..."
                ref={inputElement}
              />
              <button className={comment ? 'post-button-ready' : 'post-button'}>
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDialog;
