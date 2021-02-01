import React, {useState, useEffect} from 'react';
import './Friends.scss';

import {useSelector, useDispatch} from 'react-redux';
import {
  getFollowers,
  getFollowing,
  unfollow,
  follow,
} from '../../redux/auth/auth.actions';

import {useHistory} from 'react-router-dom';

import Header from 'layout/Header';
import FollowingButton from 'components/buttons/FollowingButton/FollowingButton';
import UnfollowModal from 'components/modals/UnfollowModal/UnfollowModal';

const Friends = ({match, location}) => {
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

  const [isModalPresent, setIsModalPresent] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);

  const dispatch = useDispatch();

  const history = useHistory();

  const followers = useSelector((state) => state.auth.userDetails.followers);
  const following = useSelector((state) => state.auth.userDetails.following);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const showModal = () => setIsModalPresent(true);
  const hideModal = () => {
    setIsModalPresent(false);
  };

  const unfollowConfirmation = () => showModal();

  const setFollowButton = () => {
    setIsFollowing(false);
  };

  const handleUnfollow = (id) => {
    const match = following.find((u) => u._id === id);
    if (match) return dispatch(unfollow(id));
  };

  const handleFollow = (id) => {
    dispatch(follow(id));
    setIsFollowing(true);
  };

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

    history.push(`/${userDetails.handle}/${newActiveTab.label.toLowerCase()}`);

    if (newActiveTab.label === 'Followers') {
      dispatch(getFollowers(match.params.handle));
    } else if (newActiveTab.label === 'Following') {
      dispatch(getFollowing(match.params.handle));
    }

    setTabs(updatedTabs);
  };

  useEffect(() => {
    console.log('Split: ', history.location.pathname.split('/')[2]);
    if (history.location.pathname.split('/')[2] === 'followers') {
      dispatch(getFollowers(match.params.handle));

      const updatedTabs = tabs.map((tab) => {
        if (tab.label === 'Followers') {
          tab.isActive = true;
        }

        return tab;
      });
      setTabs(updatedTabs);
    } else if (history.location.pathname.split('/')[2] === 'following') {
      dispatch(getFollowing(match.params.handle));

      const updatedTabs = tabs.map((tab) => {
        if (tab.label === 'Following') {
          tab.isActive = true;
        }

        return tab;
      });

      setTabs(updatedTabs);
    }
  }, [history.location.pathname]);

  return (
    <>
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
          ) : history.location.pathname.split('/')[2] === 'followers' ? (
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
                    <p>{user.bio}</p>
                  </div>
                </li>
              );
            })
          ) : history.location.pathname.split('/')[2] === 'following' ? (
            following.map((user) => {
              return (
                <>
                  {' '}
                  <li className="friends__item">
                    <img src="" alt="" />
                    <div className="friends__item-container">
                      <div className="friends__item-top">
                        <div className="friends__names-wrapper">
                          <div className="friends__name">{user.handle}</div>
                          <span className="friends__username">
                            {user.handle}
                          </span>
                          <span className="friends__status">Follows You</span>
                        </div>
                        {isFollowing ? (
                          <FollowingButton
                            unfollowConfirmation={unfollowConfirmation}
                          />
                        ) : (
                          <button
                            onClick={() => handleFollow(user._id)}
                            className="friends__followBtn"
                          >
                            Follow
                          </button>
                        )}
                      </div>
                      <p>{user.bio}</p>
                    </div>
                  </li>
                  {isModalPresent ? (
                    <UnfollowModal
                      setFollowButton={setFollowButton}
                      handleUnfollow={handleUnfollow}
                      user={user}
                      hideModal={hideModal}
                    />
                  ) : null}
                </>
              );
            })
          ) : null}
        </ul>
      </div>
    </>
  );
};

export default Friends;
