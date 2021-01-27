import {Divider} from '@material-ui/core';
import {SpaRounded} from '@material-ui/icons';
import React, {useState} from 'react';
import './FollowingButton.scss';

const FollowingButton = () => {
  const [hovering, setHovering] = useState(false);

  const handleHoverOver = () => setHovering(true);
  const handleHoverOut = () => setHovering(false);

  return (
    <button
      onMouseOver={handleHoverOver}
      onMouseOut={handleHoverOut}
      className={hovering ? 'followingButton--active' : 'followingButton'}
    >
      {hovering ? 'Unfollow' : 'Following'}
    </button>
  );
};

export default FollowingButton;
