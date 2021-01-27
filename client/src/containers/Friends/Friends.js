import React, {useState, useEffect} from 'react';
import './Friends.scss';

import {useSelector, useDispatch} from 'react-redux';
import {getFollowers, getFollowing} from '../../redux/auth/auth.actions';

import {useHistory} from 'react-router-dom';

import Header from 'layout/Header';
import FollowingButton from 'components/buttons/FollowingButton/FollowingButton';

const Friends = ({match}) => {
  const [tabs, setTabs] = useState([
    {
      id: 1,
      label: 'Followers',
      isActive: false,
    },
    {
      id: 2,
      label: 'Following',
      isActive: false,
    },
  ]);

  const dispatch = useDispatch();

  const history = useHistory();

  const followers = useSelector((state) => state.auth.userDetails.followers);
  const following = useSelector((state) => state.auth.userDetails.following);
  const isLoading = useSelector((state) => state.auth.isLoading);

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

    history.push(
      `/user/${match.params.id}/${newActiveTab.label.toLowerCase()}`
    );

    if (newActiveTab.label === 'Followers') {
      dispatch(getFollowers(match.params.id));
    } else if (newActiveTab.label === 'Following') {
      dispatch(getFollowing(match.params.id));
    }

    setTabs(updatedTabs);
  };

  useEffect(() => {
    if (match.path.split('/')[3] === 'followers') {
      dispatch(getFollowers(match.params.id));

      const updatedTabs = tabs.map((tab) => {
        if (tab.label === 'Followers') {
          tab.isActive = true;
        }

        return tab;
      });
      setTabs(updatedTabs);
    } else if (match.path.split('/')[3] === 'following') {
      dispatch(getFollowing(match.params.id));

      const updatedTabs = tabs.map((tab) => {
        if (tab.label === 'Following') {
          tab.isActive = true;
        }

        return tab;
      });

      setTabs(updatedTabs);
    }
  }, []);

  return (
    <div className="friends">
      <header className="friends__header">
        {tabs.map((tab) => (
          <span
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={tab.isActive ? 'friends__tab--active' : 'friends__tab'}
          >
            {tab.label}
          </span>
        ))}
      </header>

      <ul className="friends__list">
        {isLoading ? (
          <h1>Loading</h1>
        ) : match.path.split('/')[3] === 'followers' ? (
          followers.map((user) => {
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sit distinctio molestias maiores nihil suscipit, amet
                    consequatur voluptatem optio qui! Vel ipsa veniam possimus
                    libero neque dolores, repudiandae vero nisi veritatis.
                  </p>
                </div>
              </li>
            );
          })
        ) : match.path.split('/')[3] === 'following' ? (
          following.map((user) => {
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
                    <FollowingButton />
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sit distinctio molestias maiores nihil suscipit, amet
                    consequatur voluptatem optio qui! Vel ipsa veniam possimus
                    libero neque dolores, repudiandae vero nisi veritatis.
                  </p>
                </div>
              </li>
            );
          })
        ) : null}
      </ul>
    </div>
  );
};

export default Friends;
