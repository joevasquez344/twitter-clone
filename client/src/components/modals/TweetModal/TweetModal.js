import React from "react";
import "./TweetModal.scss";

import GifIcon from "@material-ui/icons/Gif";

const TweetModal = ({hideModal}) => {
  return (
    <div className="tweetModal">
      <header>
        <i onClick={hideModal} class="fas fa-times"></i>
      </header>
      <div className="tweetModal__body">
        <div className="tweetModal__bodyImage">
          <img src="" alt="" />
        </div>
        <div className="tweetModal__bodyRight">
          <textarea
            placeholder="What's happening?"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>

          <div className="tweetModal__bodyRightBottom">
            <div className="tweetModal__iconsWrap">
              <span>
                {" "}
                <i class="fas fa-image fa-2x"></i>
              </span>
              <span>
                {" "}
                <GifIcon style={{ color: "#1da1f2" }} />
              </span>
            </div>

            <button>Tweet</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetModal;
