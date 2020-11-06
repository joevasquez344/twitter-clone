import React, { useState } from "react";
import "./Sidebar.scss";
import { useHistory } from "react-router-dom";

import TwitterIcon from "components/icons/TwitterIcon";
import DownArrowIcon from "components/icons/DownArrowIcon";
import TweetModal from "components/modals/TweetModal/TweetModal";

const Sidebar = () => {
  const [isModalPresent, setIsModalPresent] = useState(false);

  const showModal = () => setIsModalPresent(true);
  const hideModal = () => setIsModalPresent(false);

  const history = useHistory();

  const handleHomeRoute = () => {
    history.push("/home");
  };
  const handleProfileRoute = () => history.push("/profile");

  return (
    <>
      {" "}
      <div className="sidebar">
        <header>
          <TwitterIcon />
        </header>
        <ul>
          <li onClick={handleHomeRoute}>
            <div className="sidebar__shortWrap">
              <span>
                {" "}
                <i className="fas fa-home fa-2x"></i>
              </span>

              <span>Home</span>
            </div>
          </li>
          <li>
            <div className="sidebar__shortWrap">
              <span>
                <i className="fas fa-hashtag fa-2x"></i>
              </span>
              <span>Explore</span>
            </div>
          </li>
          <li>
            <div className="sidebar__shortWrap">
              <span>
                <i className="fas fa-bell fa-2x"></i>
              </span>
              <span>Notifications</span>
            </div>
          </li>
          <li onClick={handleProfileRoute}>
            <div className="sidebar__shortWrap">
              <span>
                <i className="far fa-user fa-2x"></i>
              </span>
              <span>Profile</span>
            </div>
          </li>
          <li>
            <button onClick={showModal}>Tweet</button>
          </li>
        </ul>
        <footer>
          <img src="" alt="" />
          <div className="sidebar-user-info">
            <div className="sidebar-display-name">Joe</div>
            <div className="sidebar-handle">@Zook_sc</div>
          </div>
          <div className="sidebar-util-wrapper">
            <DownArrowIcon />
          </div>
        </footer>
      </div>
      {isModalPresent ? <TweetModal hideModal={hideModal} /> : null}
    </>
  );
};

export default Sidebar;
