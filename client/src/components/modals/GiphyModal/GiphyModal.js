import { GraphicEq } from "@material-ui/icons";
import React, { useState } from "react";
import "./GiphyModal.scss";

const GiphyModal = () => {
  const [gifs, setGifs] = useState([
    {
      id: 1,
      name: "Gif One",
    },

    {
      id: 2,
      name: "Gif Two",
    },
    {
      id: 3,
      name: "Gif Three",
    },
  ]);
  return (
    <div className="giphy-modal">
      <div className="gif-container">
        {gifs.map((gif) => {
          return <div className="gif-item">{gif.name}</div>;
        })}
      </div>
    </div>
  );
};

export default GiphyModal;
