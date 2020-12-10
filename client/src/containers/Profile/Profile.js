import React, { useState, useEffect } from "react";
import "./Profile.scss";

import { useDispatch, useSelector } from "react-redux";

import TweetFeed from "components/tweets/TweetFeed/TweetFeed";
import UpdateProfileModal from "components/modals/UpdateProfileModal";
import { getUserDetails } from "redux/auth/auth.actions";

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

  const renderTabContent = () => {
    const activeTab = tabs.find((tab) => tab.isActive === true);
    if (activeTab.label === "Tweets") {
      return <TweetFeed posts={userDetails.posts} />;
    } else if (activeTab.label === "Likes") {
      return <TweetFeed posts={userDetails.likes} />;
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
