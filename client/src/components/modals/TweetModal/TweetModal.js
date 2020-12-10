import React, { useState } from "react";
import "./TweetModal.scss";
import { createPost } from "../../../redux/post/post.actions";
import { useDispatch, useSelector } from "react-redux";

import GifIcon from "@material-ui/icons/Gif";

const TweetModal = ({ hideModal }) => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.post);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Text: ', text)
    dispatch(createPost(text));
    hideModal();
  };
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
            onChange={handleChange}
            value={text}
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

            <button onClick={handleSubmit}>Tweet</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetModal;
