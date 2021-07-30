import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import HomeContext from '../../context/home/homeContext';
import axios from 'axios';
import './Upload.styles.css';

const Upload = () => {
  const [error, setError] = useState('');
  const [captionInput, setCaptionInput] = useState('');
  const [postLink, setPostLink] = useState('');
  const authContext = useContext(AuthContext);
  const { getAllPosts } = useContext(HomeContext);

  if (!authContext.isAuth) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authContext.isAuth) {
      const postData = {
        caption: e.target.caption.value,
        video: e.target.video.value,
      };

      await axios
        .post('/addPost', postData)
        .then(() => {
          getAllPosts();
          window.location.reload();
        })
        .catch((err) => {
          setError(`${err.response.data.msg}`);
        });
    }
  };

  return (
    <div className="upload-page">
      <br />
      <h1>Upload video</h1>
      <p>This video will be published to @{authContext.user.username}</p>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="section">
            <div className="form-section">
              <div className="section input-section">
                <label className="bold">Caption</label>
                <input
                  onChange={(e) => setCaptionInput(e.target.value)}
                  className="input"
                  name="caption"
                  placeholder="Add caption"
                  value={captionInput}
                />
              </div>
              <div className="break"></div>
              <div className="section input-section">
                <label className="bold">Video Url</label>
                <input
                  onChange={(e) => setPostLink(e.target.value)}
                  className="input"
                  name="video"
                  placeholder="Direct video link"
                  value={postLink}
                />
              </div>
            </div>
          </div>
          <div className="form-bottom">
            <p className="post-error">{error}</p>
            <button
              className={
                captionInput && postLink
                  ? 'upload-button--ready'
                  : 'upload-button'
              }
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
