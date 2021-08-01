import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

import './Settings.styles.css';

const Settings = () => {
  const authContext = useContext(AuthContext);
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [bio, setBio] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    document.querySelector('body').classList.add('hide-scroll');
  }, []);

  useEffect(() => {
    if (authContext.user) {
      setAvatar('');
      setUsername(`${authContext.user.username}`);
      setName(`${authContext.user.name}`);
      setEmail(`${authContext.user.email}`);
      setPassword('');
      setPassword2('');
      setBio(`${authContext.user.bio}`);
    } else {
      authContext.loadUser();
    }
  }, [authContext]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateData = {
      username,
      name,
      email,
      avatar,
      password,
      password2,
      bio,
    };

    await axios
      .put('/updateAccount', updateData)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        if (typeof err.response.data.msg === 'string') {
          setStatus(err.response.data.msg);
        } else if (err.response.data.msg[0].param === 'password') {
          setStatus('Password length must be greater than 6');
        } else {
          setStatus('Something went wrong');
        }
      });
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <form onSubmit={handleUpdate} className="settings-form">
          <div className="settings-title">Manage your account</div>
          <div className="settings-item">
            <img
              className="user-profile"
              src={
                authContext.avatar
                  ? authContext.avatar
                  : './images/user-icon.jpg'
              }
              width={'100%'}
              alt="user-profile"
            />
            <input
              onChange={(e) => setAvatar(e.target.value)}
              className="settings-input"
              placeholder="Enter a link to change your photo"
              value={avatar}
            />
          </div>
          <div className="settings-item">
            <div className="settings-label">User name:</div>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="settings-input"
              value={username}
              required
            />
          </div>
          <div className="settings-item">
            <div className="settings-label">Name:</div>
            <input
              onChange={(e) => setName(e.target.value)}
              className="settings-input"
              value={name}
            />
          </div>
          <div className="settings-item">
            <div className="settings-label">Email:</div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="settings-input"
              value={email}
              required
            />
          </div>
          <div className="settings-item">
            <div className="settings-label">New password:</div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="settings-input"
              placeholder="Change password"
              value={password}
            />
          </div>
          <div className="settings-item">
            <div className="settings-label">Repeat password:</div>
            <input
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
              className="settings-input"
              placeholder="Change password"
              value={password2}
            />
          </div>
          <div className="settings-item">
            <div className="settings-label">Your bio:</div>
            <textarea
              onChange={(e) => setBio(e.target.value)}
              className="settings-input settings-textarea"
              cols="40"
              rows="5"
              value={bio}
            ></textarea>
          </div>
          <div className="settings-status">{status}</div>
          <button className="settings-submit">Update account</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
