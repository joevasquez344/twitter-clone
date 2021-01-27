import React, {useState, useEffect} from 'react';
import './PostDetails.scss';

import TweetFeed from 'components/tweets/TweetFeed/TweetFeed';
import Tweet from 'components/tweets/Tweet/Tweet';

import {useSelector, useDispatch} from 'react-redux';
import {getPostById} from '../../redux/post/post.actions';

const PostDetails = ({match}) => {
  const dispatch = useDispatch();
  const {post, isLoading} = useSelector((state) => state.post);

  

  useEffect(() => {
    dispatch(getPostById(match.params.postId));
  }, []);


  console.log('Post from Post Details: ', post.likes);
  return (
    // <div className="postDetails">
    //   <header>
    //     <img src="" alt="" className="postDetails__profileImage" />
    //     <div className="postDetails__names">
    //       <h5>Call of Duty News</h5>
    //       <small>@charlieIntel</small>
    //     </div>
    //     <i class="fas fa-ellipsis-h"></i>
    //     <p>
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum laborum
    //       quisquam magnam fugiat eaque non dolorem modi dolor rerum ullam,
    //       quibusdam architecto illum odio soluta blanditiis est cum error
    //       explicabo accusantium esse nam pariatur. Sapiente sint eligendi quod
    //       cum non?
    //     </p>
    //     <img src="" className="postDetails__graphic" />
    //     <div className="postDetails__date">
    //         <span>1:08 PM</span> *
    //         <span>Nov 8, 2020</span> *
    //         <span>Twitter for iPhone</span>
    //     </div>
    //   </header>
    // </div>
    <div className="postDetails">
      <header>
        <i>back</i>
        <h3>Tweet</h3>
      </header>
      {
       !isLoading ? <Tweet post={post} /> : <h1 style={{color: 'white'}}>Loading Tweet</h1>
      }
  
   {/* <Tweet post={post} />  */}
 
      <section className="section-a"></section>

      <section className="section-b">{/* <TweetFeed /> */}</section>
    </div>
  );
};

export default PostDetails;
