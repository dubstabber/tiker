import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import HomeContext from '../../context/auth/homeContext';
import axios from 'axios';
import './Upload.styles.css';

const Upload = () => {
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

      axios
        .post('/addPost', postData)
        .then(() => {
          getAllPosts();
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="upload-page">
      <br />
      <h1>Upload video</h1>
      <p>This video will be published to @{user.username}</p>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="section">
            <div className="image-upload"></div>
            <div className="form-section">
              <div className="section input-section">
                <label className="bold">Caption</label>
                <input className="input" name="caption" />
              </div>
              <div className="break"></div>
              <div className="section input-section">
                <label className="bold">Video Url</label>
                <input className="input" name="video" />
              </div>
            </div>
          </div>
          <button>Post</button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
