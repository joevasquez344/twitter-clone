import React, { useState } from "react";
import "./Login.scss";

import TwitterIcon from "components/icons/TwitterIcon";
import SignUpModal from "components/modals/SignUpModal/SignUpModal";

import { useDispatch, useSelector } from "react-redux";
import { login } from "redux/auth/auth.actions";

const Login = () => {
  const [isModalPresent, setIsModalPresent] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const handleUsername = (e) => setUsername(e.target.value);
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
    dispatch(login(username, password));
  };

  return (
    <div className="login">
      <TwitterIcon />
      <h4 className="login-header">Log in to Twitter</h4>
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-form-grouping">
          <label className="login-label">username</label>
          <input
            value={username}
            onChange={handleUsername}
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

export default Login;
