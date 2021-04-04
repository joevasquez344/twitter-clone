import React, {useState, useEffect} from 'react';
import './Friends.scss';

import {useSelector, useDispatch} from 'react-redux';
import {
  getFollowers,
  getFollowing,
  unfollow,
  follow,
  getUserDetails,
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

  // const followers = useSelector((state) => state.auth.userDetails.followers);
  // const following = useSelector((state) => state.auth.userDetails.following);
  const {isLoading, userDetails, user} = useSelector((state) => state.auth);

  const showModal = () => setIsModalPresent(true);
  const hideModal = () => {
    setIsModalPresent(false);
  };

  const unfollowConfirmation = () => showModal();

  const setFollowButton = () => {
    setIsFollowing(false);
  };

  const handleUnfollow = (handle) => {
    const match = userDetails.following.find((u) => u.handle === handle);
    if (match) return dispatch(unfollow(handle));
  };

  const handleFollow = (handle) => {
    dispatch(follow(handle));
    setIsFollowing(true);
  };

  const handleTabClick = (id) => {
    dispatch(getUserDetails(userDetails.handle));

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

    // if (newActiveTab.label === 'Followers') {
    //   // dispatch(getFollowers(match.params.handle));
    //   dispatch(getUserDetails(userDetails.handle));
    // } else if (newActiveTab.label === 'Following') {
    //   // dispatch(getFollowing(handle));
    //   dispatch(getUserDetails(userDetails.handle));
    // }

    setTabs(updatedTabs);
  };

  const renderNotFound = () => {
    return <p style={{color: 'white'}}>Something went wrong</p>;
  };

  // PROBLEM:
  // When I try to access this route/component from a URL search, I don't have access to the userDetails object
  //
  useEffect(() => {
    const handleParam = history.location.pathname.split('/')[1];
    const followParam = history.location.pathname.split('/')[2];

    if (followParam === 'followers') {
      dispatch(getUserDetails(handleParam));

      const updatedTabs = tabs.map((tab) => {
        if (tab.label === 'Followers') {
          tab.isActive = true;
        }

        return tab;
      });
      setTabs(updatedTabs);
    } else if (followParam === 'following') {
      dispatch(getUserDetails(handleParam));

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
            userDetails.followers.map((follower) => {
              return (
                <>
                  {' '}
                  <li className="friends__item">
                    <img src="" alt="" />
                    <div className="friends__item-container">
                      <div className="friends__item-top">
                        <div className="friends__names-wrapper">
                          <div className="friends__name">{follower.handle}</div>
                          <span className="friends__username">
                            {follower.handle}
                          </span>
                          <span className="friends__status">Follows You</span>
                        </div>
                        {follower._id === user._id ? null : (
                          <button>Follow</button>
                        )}
                      </div>
                      <p>{follower.bio}</p>
                    </div>
                  </li>{' '}
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
          ) : history.location.pathname.split('/')[2] === 'following' ? (
            userDetails.following.map((follow) => {
              return (
                <>
                  {' '}
                  <li className="friends__item">
                    <img src="" alt="" />
                    <div className="friends__item-container">
                      <div className="friends__item-top">
                        <div className="friends__names-wrapper">
                          <div className="friends__name">{follow.handle}</div>
                          <span className="friends__username">
                            {follow.handle}
                          </span>
                          <span className="friends__status">Follows You</span>
                        </div>
                        { follow._id === user._id ? null : isFollowing ? (
                          <FollowingButton
                            unfollowConfirmation={unfollowConfirmation}
                          />
                        ) : (
                          <button
                            onClick={() => handleFollow(follow._id)}
                            className="friends__followBtn"
                          >
                            Follow
                          </button>
                        )}
                      </div>
                      <p>{follow.bio}</p>
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
