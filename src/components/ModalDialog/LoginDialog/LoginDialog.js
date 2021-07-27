import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';
import DialogContext from '../../../context/dialog/dialogContext';

import './LoginDialog.styles.css';

const LoginDialog = () => {
  const [error, setError] = useState(false);
  const authContext = useContext(AuthContext);
  const dialogContext = useContext(DialogContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    authContext.login(loginData);
    window.location.reload();
    return <Redirect to="/" />;
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-title">Log in to Tiker</div>
          <div className="email-field">
            <input
              placeholder="Email"
              type="email"
              className="email-input"
              name="email"
            />
          </div>
          <div className="password-field">
            <input
              placeholder="Password"
              type="password"
              className="password-input"
              name="password"
            />
          </div>
          {error && (
            <span className="login-error">Invalid login or password</span>
          )}
          <button className="submit-login">Log in</button>
        </form>
      </div>
      <hr />
      <div className="register-proposal">
        <span className="register-info">Don't have an account?</span>
        <span
          onClick={() => dialogContext.showModalDialog(true)}
          className="register-link"
        >
          Sign up
        </span>
      </div>
    </>
  );
};

export default LoginDialog;
