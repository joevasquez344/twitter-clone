import React, {useState, useEffect} from 'react';
import './Profile.scss';
import {useHistory, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import useTabs from 'hooks/useTabs';
import {TABS_DATA} from './data';
import Tabs from 'components/Tabs/Tabs';
import ProfileTabContent from './components/ProfileTabContent';
import UpdateProfileModal from 'components/modals/UpdateProfileModal/UpdateProfileModal';
import UnfollowModal from 'components/modals/UnfollowModal/UnfollowModal';
import FollowingButton from 'components/buttons/FollowingButton/FollowingButton';
import Spinner from 'react-bootstrap/Spinner';
import Header from 'layout/Header/Header';

import {
  getUserDetails,
  getUsersPosts,
  getUsersLikedPosts,
  getFollowers,
  follow,
  unfollow,
} from 'redux/auth/auth.actions';

const Profile = () => {
  const [isFollowing, setFollowing] = useState(false);
  const [unfollowModal, setUnfollowModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);

  const {user, userDetails, isLoading} = useSelector((state) => state.auth);

  const {handleTabClick, tabs, updateTabs} = useTabs(TABS_DATA);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const handleFollow = () => {
    follow(userDetails.handle);
    setFollowing(true);
  };

  const handleUnfollow = (handle) => {
    const match = userDetails.followers.find((u) => u === user._id);
    if (match) unfollow(handle);
  };

  const handleFollowersRoute = () =>
    history.push(`/${userDetails.handle}/followers`);

  const handleFollowingRoute = () =>
    history.push(`/${userDetails.handle}/following`);

  useEffect(() => {
    dispatch(getUserDetails(params.handle));

    const updateTabByParam = () => {
      const parameter =
        history.location.pathname.split('/')[1] ||
        history.location.pathname.split('/')[2];

      return parameter === userDetails.handle
        ? updateTabs('Tweets')
        : parameter === 'likes'
        ? updateTabs('Likes')
        : parameter === 'with_replies'
        ? null
        : parameter === 'media'
        ? null
        : updateTabs('Tweets');
    };

    updateTabByParam();

    if (userDetails.followers.length === 0) setFollowing(false);
    else {
      const following = userDetails.followers.find((u) => u === user._id);
      if (following) setFollowing(true);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="profile">
          <Header />
          {editProfileModal ? (
            <UpdateProfileModal hideModal={() => setEditProfileModal(false)} />
          ) : null}
          <div className="profile__banner">
            <img src="" alt="" />
          </div>

          <div className="profile__info">
            <div className="profile__config">
              <img src="" className="profile__image" />
              {user._id === userDetails._id ? (
                <button
                  onClick={() => setEditProfileModal(true)}
                  className="profile__editBtn"
                >
                  Edit Profile
                </button>
              ) : isFollowing ? (
                <>
                  <div className="profile__followingBtn">
                    {' '}
                    <FollowingButton
                      unfollowConfirmation={() => setUnfollowModal(true)}
                    />
                  </div>
                  {unfollowModal ? (
                    <UnfollowModal
                      hideModal={() => setUnfollowModal(false)}
                      handleUnfollow={handleUnfollow}
                      user={userDetails}
                      setFollowButton={() => setFollowing(false)}
                    />
                  ) : null}
                </>
              ) : (
                <div onClick={handleFollow} className="profile__editBtn">
                  Follow
                </div>
              )}
            </div>

            <div className="profile__names">
              <h5>{userDetails.handle}</h5>
              <small>@{userDetails.handle}</small>
            </div>

            <div className="profile__locationAndDate">
              <div>
                <span>
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <span>California, USA</span>
              </div>
              <div>
                <span>
                  <i className="far fa-calendar-alt"></i>
                </span>
                <span>Joined July 2015</span>
              </div>
            </div>

            <div className="profile__follow">
              <div onClick={handleFollowingRoute}>
                <span className="profile__followingCount">
                  {userDetails.following.length}
                </span>
                <span className="profile__followingText">Following</span>
              </div>
              <div onClick={handleFollowersRoute}>
                <span className="profile__followersCount">
                  {userDetails.followers.length}
                </span>
                <span className="profile__followersText">Followers</span>
              </div>
            </div>
          </div>

          <Tabs tabs={tabs} handleTabClick={handleTabClick} routing={{param: userDetails.handle, url: ''}} />
          {/* {isLoading ? <Spinner /> : renderTabContent()} */}

          <ProfileTabContent
            tabs={tabs}
            userDetails={userDetails}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
};

export default Profile;
