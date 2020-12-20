import React, { useState, useEffect } from "react";
import "./Friends.scss";

import Header from "layout/Header";

const Friends = () => {
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
  return (
    <div className="friends">
      <header>
        <span>Followers</span>
        <span>Following</span>
      </header>

      <ul className="friends__list">
        <li className="friends__item">
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
        </li>
      </ul>
    </div>
  );
};

export default Friends;
