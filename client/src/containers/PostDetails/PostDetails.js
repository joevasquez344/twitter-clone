import React from "react";
import TweetFeed from "components/tweets/TweetFeed/TweetFeed";

const PostDetails = () => {
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
    <div className="post-details">
      <header>
        <i>back</i>
        <h3>Tweet</h3>
      </header>

      <section className="section-a">
          
      </section>

      <section className="section-b">
        <TweetFeed />
      </section>
    </div>
  );
};

export default PostDetails;
