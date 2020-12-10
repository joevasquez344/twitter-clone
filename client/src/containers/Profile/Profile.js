import React, { useState, useEffect } from "react";
import "./Profile.scss";

import { useDispatch, useSelector } from "react-redux";

import TweetFeed from "components/tweets/TweetFeed/TweetFeed";
import UpdateProfileModal from "components/modals/UpdateProfileModal";
import { getUserDetails, getUsersLikedPosts } from "redux/auth/auth.actions";

const Profile = ({ match }) => {
  const [isModalPresent, setIsModalPresent] = useState(false);
  const [tabContent, setTabContent] = useState([]);
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
  // const { posts } = useSelector((state) => state.post);
  const { userDetails, isLoading } = useSelector((state) => state.auth);

  const hideModal = () => setIsModalPresent(false);
  const showModal = () => setIsModalPresent(true);

  const getUserLikes = () => userDetails.likes;
  const getUserTweets = () => userDetails.posts;

  const handleTabClick = (id) => {
    const currentActiveTab = tabs.find((tab) => tab.isActive === true);

    const updatedTabs = tabs.map((tab) => {
      if (tab.id === id) {
        tab.isActive = true;
      } else if (currentActiveTab && tab.id === currentActiveTab.id) {
        tab.isActive = false;
      }

      return tab;
    });

    console.log("Updated Tabs: ", updatedTabs);

    setTabs(updatedTabs);
  };

  // BACKEND WORK - TODO
  // Create new routes that target specifics, such as getUsersPosts, getUsersLikedPosts (already done), getUsersMedia, etc.
  // Every one of these end points will give a rerender for the TweetFeed component
  // This will help keep up to date with new user data
  // EXAMPLE: Say you click on another users profile... you would have that users current data at that time, but say 
  // you have been idle for 10 minutes on that users profile and that user has been tweeting and liking posts in the mean time, you would be 
  // able to have this users new/updated data if you click on the tabs: tweets, likes, etc. due to fetching this data every time you click on those tabs

  // FRONTEND WORK - TODO
  // When the Profile components mounts, check to see which tab is active... fetch data according to the tab status
  // (tweets - getUsersTweets, likes - getUsersLikedPosts, etc.)

  // Once the Profile component mounts and the tab status checker has ran, for every tab click after, fetch data based on tab status and check to see if state has changed, then rerender
  // if there is new data

  // Keep in mind, whenever a new tab is active/clicked, no matter what, fetch relevant data from the DB, and check to see if that recent data fetched 
  // is different from the current state of your redux store, if so, rerender with the new data, if not dont rerender and keep 
  // current state
  // PURPOSE - Eliminates unnecessary rerenders and helps perfomance

  const renderTabContent = () => {
    const activeTab = tabs.find((tab) => tab.isActive === true);
    if (activeTab.label === "Tweets") {
      return <TweetFeed isLoading={isLoading} posts={userDetails.posts} />;
    } else if (activeTab.label === "Likes") {
      dispatch(getUsersLikedPosts(match.params.id));
      return <TweetFeed isLoading={isLoading} posts={userDetails.likes} />;
    }
  };

  useEffect(() => {
    dispatch(getUserDetails(match.params.id));
  }, []);

  console.log("User Details: ", userDetails);

  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="profile">
          {isModalPresent ? <UpdateProfileModal hideModal={hideModal} /> : null}
          <div className="profile__banner">
            <img src="" alt="" />
          </div>

          <div className="profile__info">
            <div className="profile__config">
              <img src="" className="profile__image" />
              <button onClick={showModal} className="profile__editBtn">
                Edit Profile
              </button>
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
              <div>
                <span className="profile__followingCount">37</span>
                <span className="profile__followingText">Following</span>
              </div>
              <div>
                <span className="profile__followersCount">36</span>
                <span className="profile__followersText">Followers</span>
              </div>
            </div>
          </div>

          <div className="profile__tabs">
            <ul>
              {tabs.map((tab) => {
                return (
                  <li
                    className={
                      tab.isActive ? "profile__tab--active" : "profile__tab"
                    }
                    onClick={() => handleTabClick(tab.id)}
                    key={tab.id}
                  >
                    {tab.label}
                  </li>
                );
              })}
            </ul>
          </div>
          {renderTabContent()}
        </div>
      )}
    </>
  );
};

export default Profile;
