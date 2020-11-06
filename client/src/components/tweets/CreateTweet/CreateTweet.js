import React from "react";
import "./CreateTweet.scss";

import GifIcon from "@material-ui/icons/Gif";

const CreateTweet = () => {
  return (
    <div className="createTweet">
      <div className="createTweet__body">
        <div className="createTweet__bodyImage">
          <img src="" alt="" />
        </div>
        <div className="createTweet__bodyRight">
          <textarea
            placeholder="What's happening?"
            name=""
            id=""
          ></textarea>

          <div className="createTweet__bodyRightBottom">
            <div className="createTweet__iconsWrap">
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

export default CreateTweet;
