import React, { useState } from "react";
// import "./Landing.css";
import "./Landing.scss";
import { useHistory } from "react-router-dom";

import SignUpModal from "components/modals/SignUpModal/SignUpModal";
import TwitterIcon from "components/icons/TwitterIcon";

const Landing = () => {
  const [isModalPresent, setIsModalPresent] = useState(false);

  const history = useHistory();

  const hideModal = () => setIsModalPresent(false);
  const showModal = () => setIsModalPresent(true);

  return (
    <div className="landing">
      <div className="landing__left">
        <ul>
          <li>
            <i className="fas fa-search fa-2x"></i>
            <p>Follow your interests.</p>
          </li>
          <li>
            <i className="fas fa-user-friends fa-2x"></i>
            <p>Hear what people are talking about.</p>
          </li>
          <li>
            <i className="far fa-comment fa-2x"></i>
            <p>Join the conversation.</p>
          </li>
        </ul>
      </div>
      <div className="landing__right">
        <form>
          <div className="landing__formGrouping">
            <label>Phone, email, or username</label>
            <input type="text" />
          </div>
          <div className="landing__formGrouping">
            <label>Password</label>
            <input type="text" />
            <small>Forgot password?</small>
          </div>
          <button>Log In</button>
        </form>
        <section className="landing__register">
          <TwitterIcon />
          <h2>See what's happening in the world right now</h2>
          <small className="small">Join Twitter today</small>
          <div className="landing__buttonGrouping">
            <button onClick={() => setIsModalPresent(true)}>Sign Up</button>
            <button onClick={() => history.push("/login")}>Log In</button>
          </div>
        </section>
      </div>
      {isModalPresent ? <SignUpModal hideModal={hideModal} /> : null}
    </div>
  );
};

export default Landing;
