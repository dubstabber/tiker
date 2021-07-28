import React, { useState, useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';
import DialogContext from '../../../context/dialog/dialogContext';

import './RegisterDialog.styles.css';

const RegisterDialog = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const authContext = useContext(AuthContext);
  const dialogContext = useContext(DialogContext);

  const registerUser = (e) => {
    e.preventDefault();
    const registerData = {
      email: e.target.email.value,
      password: e.target.password.value,
      password2: e.target.password2.value,
    };
    authContext.register(registerData);
  };

  return (
    <>
      <div className="register-container">
        <form onSubmit={registerUser} className="register-form">
          <div className="register-title">Sign up for Tiker</div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="email-input"
            name="email"
            id="email"
            value={email}
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
          />
          <label
            className={
              password ? 'password-label label--focus' : 'password-label'
            }
            htmlFor="password"
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword2(e.target.value)}
            type="password"
            className="password-input"
            name="password2"
            id="password2"
            value={password2}
          />
          <label
            className={
              password2 ? 'password2-label label--focus' : 'password2-label'
            }
            htmlFor="password2"
          >
            Repeat password
          </label>
          <button className="submit-register">Sign up</button>
        </form>
      </div>
      <hr />
      <div className="login-proposal">
        <span className="login-info">Already have an account?</span>
        <span
          onClick={() => dialogContext.showModalDialog(false)}
          className="login-link"
        >
          Sign in
        </span>
      </div>
    </>
  );
};

export default RegisterDialog;
