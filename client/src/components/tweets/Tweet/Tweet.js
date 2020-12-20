import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Tweet.scss";

import { useSelector, useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../../redux/post/post.actions";

const Tweet = ({ post }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user._id);

  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [likeCounter, setLikeCounter] = useState(post.likes.length);

  console.log("Post: ", post);

  const handleUserDetails = () => {
    console.log("Post from tweet", post);
    history.push(`/user/${post.user}`);
  };

  const handleLike = () => {
    if (liked) {
      setLikeCounter(likeCounter - 1);
      dispatch(unlikePost(post._id));
      setLiked(false);
    } else {
      setLikeCounter(likeCounter + 1);
      dispatch(likePost(post._id));
      setLiked(true);
    }
  };

  const likeValue = liked ? { color: "red" } : { color: "gray" };

  useEffect(() => {
    post.likes.forEach((like) => like.user === authUser && setLiked(true));
  }, []);

  return (
    <div className="tweet">
      <img
        onClick={handleUserDetails}
        className="tweet__profileImage"
        src=""
        alt=""
      />
      <section>
        <header>
          <div className="tweet__displayName">{post.handle}</div>
          <div className="tweet__handle">@{post.handle}</div>
        </header>
        <p className="tweet__text">{post.text}</p>
        <img className="tweet__graphic" src="" alt="" />
        <footer className="tweet__footer">
          <ul>
            <li>
              <i class="far fa-comment"></i> <span>4</span>
            </li>
            <li>
              {" "}
              <i class="fas fa-retweet"></i>
              <span>12</span>
            </li>
            <li onClick={handleLike}>
              {liked ? (
                <i style={{ color: "red" }} class="fas fa-heart"></i>
              ) : (
                <i class="far fa-heart"></i>
              )}{" "}
              <span style={likeValue}>
                {likeCounter === 0 ? "" : likeCounter}
              </span>
            </li>
            <li>
              <i class="fas fa-external-link-alt"></i>
            </li>
          </ul>
        </footer>
      </section>
    </div>
  );
};

export default Tweet;
