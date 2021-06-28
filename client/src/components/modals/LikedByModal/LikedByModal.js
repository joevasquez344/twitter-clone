import React from "react";
import './LikedByModal.scss';

const LikedByModal = ({ hideModal }) => {

  return (
    <div className="likedByModal">
        <h1 onClick={() => hideModal()} style={{color: 'white'}}>Close</h1>
    </div>
  );
};

export default LikedByModal;
