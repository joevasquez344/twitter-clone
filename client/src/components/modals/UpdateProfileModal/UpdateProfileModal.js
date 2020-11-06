import React, { useState } from "react";
import "./UpdateProfileModal.scss";

import GifIcon from "@material-ui/icons/Gif";

const UpdateProfileModal = ({ hideModal }) => {
  const [nameClick, setNameClick] = useState(false);
  const [bioClick, setBioClick] = useState(false);
  const [locationClick, setLocationClick] = useState(false);
  const [websiteClick, setWebsiteClick] = useState(false);

  const handleNameClick = () => {
    setNameClick(true);
    setBioClick(false);
    setLocationClick(false);
    setWebsiteClick(false);
  };

  const handleBioClick = () => {
    setBioClick(true);
    setNameClick(false);
    setLocationClick(false);
    setWebsiteClick(false);
  };

  const handleLocationClick = () => {
    setLocationClick(true);
    setNameClick(false);
    setBioClick(false);
    setWebsiteClick(false);
  };

  const handleWebsiteClick = () => {
    setWebsiteClick(true);
    setNameClick(false);
    setBioClick(false);
    setLocationClick(false);
  };

  return (
    <div className="updateProfile">
        
      <header>
        <i onClick={hideModal} className="fas fa-times fa-2x"></i>
        <h3>Edit profile</h3>
        <button>Save</button>
      </header>
      <div className="updateProfile__banner">
        <img src="" alt="" />
      </div>
      <div className="updateProfile__info">
        <div className="updateProfile__config">
          <img src="" className="updateProfile__image" />
        </div>
      </div>
      <form>
        <div onClick={handleNameClick} className={nameClick ? "updateProfileInput--clicked" : "form-grouping"}>
          <label>Name</label>
          <input placeholder="Joe" type="text" />
        </div>
        <div onClick={handleBioClick} className={bioClick ? "updateProfileInput--clicked" : "form-grouping"}>
          <label>Bio</label>
          <input placeholder="Add your bio" type="text" />
        </div>
        <div onClick={handleLocationClick} className={locationClick ? "updateProfileInput--clicked" : "form-grouping"}>
          <label>Location</label>
          <input placeholder="California, USA" type="text" />
        </div>
        <div onClick={handleWebsiteClick} className={websiteClick ? "updateProfileInput--clicked" : "form-grouping"}>
          <label>Website</label>
          <input placeholder="Add your website" type="text" />
        </div>
      </form>
      <footer>
        <span>Birth Date</span> <span>*</span> <a href="">Edit</a>
        <h3>Add your date of birth</h3>
      </footer>
    </div>
  );
};

export default UpdateProfileModal;
