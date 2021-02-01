import React, {useState} from 'react';
import './UnfollowModal.scss';

const UnfollowModal = ({hideModal, handleUnfollow, user, setFollowButton}) => {
  console.log('The USER: ', user);
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
    // <div className="tweetModal">
    //   <header>
    //     <i onClick={hideModal} class="fas fa-times"></i>
    //   </header>
    //   <div className="tweetModal__body">
    //     <div className="tweetModal__bodyImage">
    //       <img src="" alt="" />
    //     </div>
    //     <div className="tweetModal__bodyRight">
    //       <textarea
    //         onChange={handleChange}
    //         value={text}
    //         placeholder="What's happening?"
    //         name=""
    //         id=""
    //         cols="30"
    //         rows="10"
    //       ></textarea>

    //       <div className="tweetModal__bodyRightBottom">
    //         <div className="tweetModal__iconsWrap">
    //           <span>
    //             {" "}
    //             <i class="fas fa-image fa-2x"></i>
    //           </span>
    //           <span>
    //             {" "}
    //             <GifIcon style={{ color: "#1da1f2" }} />
    //           </span>
    //         </div>

    //         <button onClick={handleSubmit}>Tweet</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UnfollowModal;
