import React, { useState } from "react";
import "./Login.scss";

import emailValidator from "email-validator";
import passwordValidator from "password-validator";

import TwitterIcon from "components/icons/TwitterIcon";
import SignUpModal from "components/modals/SignUpModal/SignUpModal";

import { connect } from "react-redux";
import { login } from "redux/auth/auth.actions";

const Login = ({ login, error }) => {
  const [isModalPresent, setIsModalPresent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const hideModal = () => setIsModalPresent(false);
  const showModal = () => setIsModalPresent(true);

  const handleLogin = (e) => {
    // const _email = emailValidator.validate(email);

    // const validatedPassword = new passwordValidator();

    // validatedPassword
    //   .is()
    //   .min(6)
    //   .is()
    //   .max(30)
    //   .has()
    //   // .digits(2)
    //   .has()
    //   .not()
    //   .spaces();
    e.preventDefault();
    // console.log("Form Cred: ", _email, validatedPassword);

    // if(!email) {
    //   console.log('Email validation failed')
    //   return false
    // }

    // login(_email, validatedPassword)
    login(email, password);
  };

  return (
    <div className="login">
      <TwitterIcon />
      <h4 className="login-header">Log in to Twitter</h4>
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-form-grouping">
          <label className="login-label">Email</label>
          <input
            value={email}
            onChange={handleEmail}
            className="login-input"
            type="text"
          />
        </div>
        <div className="login-form-grouping">
          <label className="login-label">Password</label>
          <input
            value={password}
            onChange={handlePassword}
            className="login-input"
            type="text"
          />
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      <small className="login-extra">
        <span>Forgot Password?</span> <span>*</span>{" "}
        <span onClick={showModal}>Sign up for Twitter</span>
      </small>
      <div className="login__error">{error}</div>
      {isModalPresent ? <SignUpModal hideModal={hideModal} /> : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

export default connect(mapStateToProps, { login })(Login);
