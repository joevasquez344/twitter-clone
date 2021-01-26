import React, { useState, useEffect } from "react";
import "./Friends.scss";

import { useSelector, useDispatch } from "react-redux";
import { getFollowers } from '../../redux/auth/auth.actions'

import Header from "layout/Header";

const Friends = ({match}) => {
  const [tabs, setTabs] = useState([
    {
      id: 1,
      label: "Tweets",
      isActive: true,
    },
    {
      id: 2,
      label: "Tweets & Replies",
      isActive: false,
    },
    {
      id: 3,
      label: "Media",
      isActive: false,
    },
    {
      id: 4,
      label: "Likes",
      isActive: false,
    },
  ]);

  const dispatch = useDispatch();

  const followers = useSelector((state) => state.auth.userDetails.followers);

  const handleTabClick = (id) => {
    const currentActiveTab = tabs.find((tab) => tab.isActive === true);

    let newActiveTab = null;

    const updatedTabs = tabs.map((tab) => {
      if (tab.id === id) {
        tab.isActive = true;
        newActiveTab = tab;
      } else if (currentActiveTab && tab.id === currentActiveTab.id) {
        tab.isActive = false;
      }

      return tab;
    });

    setTabs(updatedTabs);
  };

  useEffect(() => {
dispatch(getFollowers(match.params.id))
  }, [])
  return (
    <div className="friends">
      <header className="friends__header">
        <span>Followers</span>
        <span>Following</span>
      </header>

      <ul className="friends__list">
        {followers.map((user) => {
          return (
            <li className="friends__item">
              <img src="" alt="" />
              <div className="friends__item-container">
                <div className="friends__item-top">
                  <div className="friends__names-wrapper">
                    <div className="friends__name">{user.handle}</div>
                    <span className="friends__username">{user.handle}</span>
                    <span className="friends__status">Follows You</span>
                  </div>
                  <button>Follow</button>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                  distinctio molestias maiores nihil suscipit, amet consequatur
                  voluptatem optio qui! Vel ipsa veniam possimus libero neque
                  dolores, repudiandae vero nisi veritatis.
                </p>
              </div>
            </li>
          );
        })}
        {/* <li className="friends__item">
          <div className="friends__item-top">
            <img src="" alt="" />
            <div>
              <h5>Name</h5>
              <span>Handle</span>
              <span>Status</span>
            </div>
            <button>Following</button>
          </div>

          <p className="friends__item-bottom">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
            itaque!
          </p>
        </li> */}
      </ul>
    </div>
  );
};

export default Friends;
