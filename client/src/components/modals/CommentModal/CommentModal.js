import React, {useState} from 'react';
import './CommentModal.scss';
import {createPost} from '../../../redux/post/post.actions';
import {useDispatch} from 'react-redux';

import GifIcon from '@material-ui/icons/Gif';
import ConnectLine from 'components/ConnectLine';

const CommentModal = ({post, hideModal}) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(post._id, text));
    hideModal();
  };

  const lineStyles = {
    diff: '40px',
    top: '50px',
  };

  return (
    <div className="commentModal">
      <header>
        <i onClick={hideModal} className="fas fa-times"></i>
      </header>
      <div className="commentModal__body">
        <div className="commentModal__bodyImage">
          <img alt="" />
          <ConnectLine lineStyles={lineStyles} />
        </div>
        <div className="commentModal__bodyRight">
          <div className="commentModal__bodyRightTop">
            <div className="commentModal__displayName">Nasa</div>
            <div className="commentModal__username">@Joe</div>
            <div className="commentModal__timeFromPost"> * 3h</div>
          </div>
          <p className="commentModal__content">{post.text}</p>

          <div className="commentModal__replyWrap">
            <span>Replying To</span>{' '}
            <span className="commentModal__replyTo">@Joe</span>
          </div>
        </div>
      </div>
      <div className="commentModal__replier">
        <img src="" alt="" />
        <textarea
          onChange={handleChange}
          value={text}
          placeholder="Tweet your reply"
          name=""
          id=""
          cols="30"
          rows="6"
        ></textarea>
      </div>
      <div className="commentModal__footer">
        <div className="commentModal__iconsWrap">
          <span>
            {' '}
            <i class="fas fa-image fa-2x"></i>
          </span>
          <span>
            {' '}
            <GifIcon style={{color: '#1da1f2'}} />
          </span>
        </div>

        <button onClick={handleSubmit}>Reply</button>
      </div>
    </div>
  );
};

export default CommentModal;
