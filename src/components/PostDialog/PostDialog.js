import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../context/dialog/authState';
import { DialogContext } from '../../context/dialog/dialogState';
import axios from 'axios';
import CommentCard from './CommentCard/CommentCard';

import './PostDialog.styles.css';

const PostDialog = () => {
  const authContext = useContext(AuthContext);
  const { postDialog } = useContext(DialogContext);
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
    showPostDialog(postDialog.id);
  }, [postDialog]);

  useEffect(() => {
    if (authContext.isAuth) {
      if (authContext.user.id === postDialog.userId) setIsMyPost(true);
      else
        setIsFollowed(
          !followed.every((followedUser) => followedUser.id !== post.userId)
        );
      setLikes(postDialog.likes.length);
    }
  }, [followed, postDialog, user]);

  const getPostComments = () => {
    axios
      .post('/getPostComments', { postId: post._id })
      .then((data) => {
        setPostComments(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
      .post('/likeComment', { postId: post._id, commentToLike: index })
      .catch((err) => {
        console.log(err);
      });
    getPostComments();
  };

  const likeSubcomment = async (commentIndex, subCommentIndex) => {
    await axios
      .post('/likeSubcomment', {
        postId: post._id,
        commentIndex,
        subCommentIndex,
      })
      .catch((err) => {
        console.log(err);
      });
    getPostComments();
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
      getPostComments();
    }
  };

  const handleLike = async () => {
    if (user.isAuth) {
      await likePost(post._id).then((data) => {
        setLikes(data.data);
      });
    } else {
      setShowModalDialog(true);
    }
  };

  const closeDialog = () => {
    setPostDialogToShow(null);
    document.querySelector('body').classList.remove('hide-scroll');
  };

  return (
    <div className="post-container">
      <span onClick={closeDialog} className="post-close"></span>
      <div className="post-left-side">
        <video className="video-page" controls>
          <source src={post.video} type="video/mp4" />
        </video>
      </div>
      <div className="post-right-side">
        <div className="post-info">
          <div className="post-follow-btn">
            {!isMyPost && (
              <div
                onClick={() => followUser(post.username)}
                className={isFollowed ? 'followed-button' : 'follow-button'}
              >
                {isFollowed ? 'Following' : 'Follow'}
              </div>
            )}
          </div>
          <div className="post-user">
            <img
              className="user-profile"
              src={post.avatar ? post.avatar : './images/user-icon.jpg'}
              alt="user-avatar"
            />
            <div>
              <h3 className="bold">{post.username}</h3>
              <span>{post.name}</span>
              <span> · </span>
              <span>{timestamp}</span>
            </div>
          </div>
          <div className="post-caption">{post.caption}</div>
          <div className="post-socials">
            <div className="section socials">
              <i
                onClick={handleLike}
                className="far fa-heart social-mini-icon"
              ></i>
              <div className="social-tag">{likes}</div>
              <i className="far fa-comment-dots"></i>
              <div className="social-tag">{post.comments.length}</div>
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
