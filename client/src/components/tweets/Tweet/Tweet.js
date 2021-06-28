import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './Tweet.scss';

import ConnectLine from 'components/ConnectLine';
import CommentModal from 'components/modals/CommentModal/CommentModal';

import {useSelector, useDispatch} from 'react-redux';
import {likePost, unlikePost} from '../../../redux/post/post.actions';

const Tweet = ({post, hasReply}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user._id);
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [likeCounter, setLikeCounter] = useState(post.likes.length);
  const [commentModal, setCommentModal] = useState(false);

  const showModal = (e) => {
    setCommentModal(true);
    e.stopPropagation();
  };

  const hideModal = () => setCommentModal(false);

  const handleUserDetails = (e) => {
    history.push(`/${post.user.handle}`);
    e.stopPropagation();
  };

  const handlePostDetails = () =>
    history.push(`/${post.handle}/status/${post._id}`);

  const handleLike = (e) => {
    console.log('Like/Unlike');
    if (liked) {
      setLikeCounter(likeCounter - 1);
      dispatch(unlikePost(post._id));
      setLiked(false);
    } else {
      setLikeCounter(likeCounter + 1);
      dispatch(likePost(post._id));
      setLiked(true);
    }

    e.stopPropagation();
  };

  useEffect(() => {
    post.likes.forEach((like) =>
      like.user === authUser ? setLiked(true) : setLiked(false)
    );
  }, []);

  const likeValue = liked ? {color: 'red'} : {color: 'gray'};
  const lineStyles = {
    diff: '40px',
    top: '50px',
  };

  return (
    <>
      <div
        onClick={handlePostDetails}
        className="tweet"
        style={hasReply && {borderBottom: 'none'}}
      >
        {hasReply ? <ConnectLine lineStyles={lineStyles} /> : null}
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
              <li onClick={showModal}>
                <i className="far fa-comment"></i> <span>4</span>
              </li>
              <li>
                {' '}
                <i className="fas fa-retweet"></i>
                <span>12</span>
              </li>
              <li onClick={handleLike}>
                {liked ? (
                  <i style={{color: 'red'}} className="fas fa-heart"></i>
                ) : (
                  <i className="far fa-heart"></i>
                )}{' '}
                <span style={likeValue}>
                  {likeCounter === 0 ? '' : likeCounter}
                </span>
              </li>
              <li>
                <i className="fas fa-external-link-alt"></i>
              </li>
            </ul>
          </footer>
        </section>
      </div>
      {commentModal ? <CommentModal post={post} hideModal={hideModal} /> : null}
    </>
  );
};

export default Tweet;
