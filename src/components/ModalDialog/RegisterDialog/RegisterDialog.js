import React, { useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';

import './RegisterDialog.styles.css';

const RegisterDialog = ({ switchPage }) => {
  const authContext = useContext(AuthContext);

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
          <div className="password-field">
            <input
              placeholder="Repeat password"
              type="password"
              className="password-input"
              name="password2"
            />
          </div>
          <button className="submit-register">Sign up</button>
        </form>
      </div>
      <hr />
      <div className="login-proposal">
        <span>Already have an account?</span>
        <span onClick={switchPage} className="login-link">
          Sign in
        </span>
      </div>
    </>
  );
};

export default RegisterDialog;
