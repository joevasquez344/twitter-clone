import React, { useState } from "react";
import "./SignUpModal.scss";

import {connect} from 'react-redux';
import {register} from 'redux/auth/auth.actions';

const SignUpModal = ({ hideModal, register }) => {
  const [emailClick, setEmailClick] = useState(true);
  const [passwordClick, setPasswordClick] = useState(false);
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");

  const handleHandleChange = (e) => setHandle(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const birthday = '12/10/1997'
    register(handle, password, birthday)
  };

  const handleEmailInputClick = () => {
    setEmailClick(true);
    setPasswordClick(false);
  };

  const handlePasswordInputClick = () => {
    setEmailClick(false);
    setPasswordClick(true);
  };
  return (
    <div className="sign-up-modal-screen">
      <div className="sign-up-modal">
        <header className="sign-up-modal-header">
          <i
            onClick={hideModal}
            className="far fa-times-circle fa-2x close-modal-icon"
          ></i>
          <i className="fab fa-twitter fa-2x"></i>
          <button onClick={handleSubmit}>Next</button>
        </header>
        <div className="sign-up-modal-main-content">
          <h4 className="create-account-header">Create your account</h4>
          <form>
            <input
              value={handle}
              onChange={handleHandleChange}
              name="email"
              onClick={handleEmailInputClick}
              type="text"
              placeholder="Email"
              className={
                emailClick
                  ? "sign-up-modal-input-clicked"
                  : "sign-up-modal-input"
              }
            />
            <input
              value={password}
              onChange={handlePasswordChange}
              name="password"
              onClick={handlePasswordInputClick}
              type="text"
              placeholder="Password"
              className={
                passwordClick
                  ? "sign-up-modal-input-clicked"
                  : "sign-up-modal-input"
              }
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {register})(SignUpModal);
