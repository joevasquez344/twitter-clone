import React, {useState} from 'react';
import './FollowingButton.scss';


const FollowingButton = ({ unfollowConfirmation }) => {
  const [hovering, setHovering] = useState(false);

  const handleHoverOver = () => setHovering(true);
  const handleHoverOut = () => setHovering(false);


  return (
    <button
      onClick={unfollowConfirmation}
      onMouseOver={handleHoverOver}
      onMouseOut={handleHoverOut}
      className={hovering ? 'followingButton--active' : 'followingButton'}
    >
      {hovering ? 'Unfollow' : 'Following'}
    </button>
  );
};

export default FollowingButton;
