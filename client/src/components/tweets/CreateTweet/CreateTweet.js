import React, {useState, useEffect} from 'react';
import './CreateTweet.scss';
import {Grid, fetchGifs, fetchCategories, fetchTrending} from 'services/giphy';
import GifIcon from '@material-ui/icons/Gif';
import GiphyModal from 'components/modals/GiphyModal/GiphyModal';

const CreateTweet = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="createTweet">
        <div className="createTweet__body">
          <div className="createTweet__bodyImage">
            <img src="" alt="" />
          </div>
          <div className="createTweet__bodyRight">
            <textarea placeholder="What's happening?" name="" id=""></textarea>

            <div className="createTweet__bodyRightBottom">
              <div className="createTweet__iconsWrap">
                <span>
                  {' '}
                  <i className="fas fa-image fa-2x"></i>
                </span>
                <span onClick={() => setModal(true)}>
                  {' '}
                  <GifIcon style={{color: '#1da1f2'}} />
                </span>
              </div>

              <button>Tweet</button>
            </div>
          </div>
        </div>
      </div>
      {modal ? <GiphyModal /> : null}
    </>
  );
};

export default CreateTweet;
