import React, { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '../../context/dialog/authContext';
import DialogContext from '../../context/dialog/dialogContext';
import axios from 'axios';
import CommentCard from './CommentCard/CommentCard';

import './PostDialog.styles.css';

const PostDialog = () => {
  const authContext = useContext(AuthContext);
  const { postDialog, showPostDialog, showModalDialog, closeDialog } =
    useContext(DialogContext);
  const [likes, setLikes] = useState(0);
  const [isMyPost, setIsMyPost] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [comment, setComment] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [commentToReply, setCommentToReply] = useState(null);
  const [replyPlaceholder, setReplyPlaceholder] = useState('');
  const inputElement = useRef(null);
  const timestamp = post.timestamp.split('T')[0];

  useEffect(() => {
    if (authContext.isAuth) {
      if (authContext.user.id === postDialog.userId) setIsMyPost(true);
      else
        setIsFollowed(
          !followed.every((followedUser) => followedUser.id !== post.userId)
        );
      setLikes(postDialog.likes.length);
      setPostComments(postDialog.comments);
    }
  }, [postDialog]);

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
            postId: post._id,
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
          .post('/comment', { postId: post._id, comment })
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
      showModalDialog();
    }
  };

  const close = () => {
    closeDialog();
    document.querySelector('body').classList.remove('hide-scroll');
  };

  if (!postDialog) return <></>;

  return (
    <div className="post-container">
      <span onClick={close} className="post-close"></span>
      <div className="post-left-side">
        <video className="video-page" controls>
          <source src={postDialog.video} type="video/mp4" />
        </video>
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
        <div className="post-comments">
          {postComments.map((postComment, index) => {
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
          })}
        </div>
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
      </div>
    </div>
  );
};

export default PostDialog;
