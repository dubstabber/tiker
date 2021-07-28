import React, { useState, useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';
import DialogContext from '../../../context/dialog/dialogContext';

import './LoginDialog.styles.css';

const LoginDialog = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const dialogContext = useContext(DialogContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    authContext.login(loginData);
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-title">Log in to Tiker</div>

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="email-input"
            name="email"
            id="email"
            value={email}
            required
          />
          <label
            className={email ? 'email-label label--focus' : 'email-label'}
            htmlFor="email"
          >
            E-mail address
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="password-input"
            name="password"
            id="password"
            value={password}
            required
          />
          <label
            className={
              password ? 'password-label label--focus' : 'password-label'
            }
            htmlFor="password"
          >
            Password
          </label>
          {authContext.error && (
            <div className="login-error">{authContext.error}</div>
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
