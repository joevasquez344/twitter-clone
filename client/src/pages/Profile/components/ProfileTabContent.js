import React from 'react';
import PropTypes from 'prop-types';
import TweetFeed from 'components/tweets/TweetFeed/TweetFeed';
import Spinner from 'react-bootstrap/Spinner';

const ProfileTabContent = ({tabs, userDetails, isLoading}) => {
  const activeTab = tabs.find((tab) => tab.isActive === true);

  if (activeTab) {
    switch (activeTab.label) {
      case 'Tweets':
        const updatedPosts = userDetails.posts.filter((post) => !post.replyTo);
        return (
          <>
        
              <TweetFeed isLoading={isLoading} posts={updatedPosts} />
        
          </>
        );

      case 'Tweets & Replies':
        return <TweetFeed isLoading={isLoading} posts={userDetails.posts} />;

      case 'Likes':
        return <TweetFeed isLoading={isLoading} posts={userDetails.likes} />;

 
    }
  } else {
    return null
  }
} 

ProfileTabContent.propTypes = {
  tabs: PropTypes.array,
  userDetails: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default ProfileTabContent;
