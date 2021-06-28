import React from 'react';
import './UnfollowModal.scss';

const UnfollowModal = ({hideModal, handleUnfollow, user, setFollowButton}) => {
  const unfollow = () => {
    handleUnfollow(user.handle);
    hideModal();
    setFollowButton();
  };

  return (
    <div className="unfollowModal">
      <h4>Unfollow @{user.handle}</h4>
      <p>
        Their Tweets will no longer show up in your home timeline. You can still
        view their profile, unless their Tweets are protected.{' '}
      </p>
      <footer>
        <button onClick={hideModal} className="unfollowModal__cancel">
          Cancel
        </button>
        <button onClick={unfollow} className="unfollowModal__unfollow">
          Unfollow
        </button>
      </footer>
    </div>
  );
};

export default UnfollowModal;
