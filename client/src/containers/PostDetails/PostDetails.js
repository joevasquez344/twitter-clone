import React, {useState, useEffect} from 'react';
import './PostDetails.scss';
import {useHistory, useParams} from 'react-router-dom';

import Header from 'layout/Header/Header';
import LikedByModal from 'components/modals/LikedByModal/LikedByModal';
import CommentModal from 'components/modals/CommentModal/CommentModal';

import {useSelector, useDispatch} from 'react-redux';
import {getPostById, unlikePost, likePost} from '../../redux/post/post.actions';
import Tweet from 'components/tweets/Tweet/Tweet';

const PostDetails = ({match}) => {
  const history = useHistory();
  const {postId} = useParams();

  console.log('PARAMS: ', postId);
  const dispatch = useDispatch();
  const {posts, post, isLoading} = useSelector((state) => state.post);
  const authUser = useSelector((state) => state.auth.user._id);

  const [likedByModal, setLikedByModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);

  const showCommentModal = () => setCommentModal(true)

  const hideLikedByModal = () => {
    history.push(`/${post.handle}/status/${post._id}`);
    setLikedByModal(false);
  };
  const hideCommentModal = () => {
    setCommentModal(false);
  };

  const postFound = posts.find((p) => p._id === postId);
  const [likeCounter, setLikeCounter] = useState(postFound.likes.length);

  const handleUserDetails = (e) => {
    history.push(`/${post.handle}`);

    e.stopPropagation();
  };

  const handlePostDetails = () =>
    history.push(`/${post.handle}/status/${post._id}`);

  const handleLike = (e) => {
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

  const handleLikes = () => {
    history.push(`/${post.handle}/status/${post._id}/likes`);
    setLikedByModal(true);
  };

  useEffect(() => {
    dispatch(getPostById(match.params.postId));

    if (
      match.params.handle &&
      match.params.postId &&
      match.url.split('/')[4] === 'likes'
    ) {
      setLikedByModal(true);
    }

    postFound.likes.forEach((like) =>
      like.user === authUser ? setLiked(true) : setLiked(false)
    );
  }, []);

  console.log('POST FROM DETAILS: ', post);
  return (
    <>
      {' '}
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Header></Header>
          <div onClick={handlePostDetails} className="postDetails">
            <section className="postDetails__body">
              <img
                onClick={handleUserDetails}
                className="postDetails__profileImage"
                src=""
                alt=""
              />
              <header>
                <div className="postDetails__displayName">{post.handle}</div>
                <div className="postDetails__handle">@{post.handle}</div>
              </header>
            </section>
            <p className="postDetails__text">{post.text}</p>
            <img className="postDetails__graphic" src="" alt="" />
            <footer className="postDetails__footer">
              <ul className="postDetails__interactions">
                <li className="postDetails__interactionsItem">
                  <span>7</span>
                  <span>Retweets</span>
                </li>
                <li
                  className="postDetails__interactionsItem"
                  onClick={handleLikes}
                >
                  <span>{post.likes.length}</span>
                  <span>Likes</span>
                </li>
              </ul>
              <ul className="postDetails__icons">
                <li onClick={showCommentModal} className="postDetails__icon">
                  <i class="far fa-comment"></i>
                </li>
                <li className="postDetails__icon">
                  {' '}
                  <i class="fas fa-retweet"></i>
                </li>
                <li className="postDetails__icon" onClick={handleLike}>
                  {liked ? (
                    <i style={{color: 'red'}} class="fas fa-heart"></i>
                  ) : (
                    <i class="far fa-heart"></i>
                  )}{' '}
                </li>
                <li className="postDetails__icon">
                  <i class="fas fa-external-link-alt"></i>
                </li>
              </ul>
            </footer>
          </div>
          <div className="postDetails__comments">
            {post.comments.map((comment) => {
              return <Tweet post={comment} />;
            })}
          </div>
          {likedByModal ? <LikedByModal hideModal={hideLikedByModal} /> : null}
          {commentModal ? (
            <CommentModal post={post} hideModal={hideCommentModal} />
          ) : null}
        </>
      )}
    </>
  );
};

export default PostDetails;
