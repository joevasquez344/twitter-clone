import React from 'react';
import './Tabs.scss';
import {useSelector} from 'react-redux';

const Tabs = ({tabs, handleTabClick, routing: {param}}) => {

  return (
    <div className="profile__tabs">
      <ul>
        {tabs.map((tab) => (
          <li
            className={tab.isActive ? 'profile__tab--active' : 'profile__tab'}
            onClick={() => handleTabClick(tab.id, tab.route(param))}
            key={tab.id}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
