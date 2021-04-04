import React, {useState, useEffect} from 'react';
import './Login.scss';

import {useHistory} from 'react-router-dom';

import TwitterIcon from 'components/icons/TwitterIcon';
import SignUpModal from 'components/modals/SignUpModal/SignUpModal';

import {useDispatch, useSelector} from 'react-redux';
import {login} from 'redux/auth/auth.actions';

const Login = () => {
  const [isModalPresent, setIsModalPresent] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const dispatch = useDispatch();
  const {user, isLoading, error} = useSelector((state) => state.auth);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const hideModal = () => setIsModalPresent(false);
  const showModal = () => setIsModalPresent(true);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login(username, password));
  };

  useEffect(() => {
    if (user) {
      history.push('/');
    }

  }, [user]);

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
        <span>Forgot Password?</span> <span>*</span>{' '}
        <span onClick={showModal}>Sign up for Twitter</span>
      </small>
      <div className="login__error">{error}</div>
      {isModalPresent ? <SignUpModal hideModal={hideModal} /> : null}
    </div>
  );
};

export default Login;
