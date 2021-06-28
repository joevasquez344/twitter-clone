import React, {useState, useEffect} from 'react';
import './GiphyModal.scss';
import {
  Grid,
  fetchGifs,
  fetchCategories,
  fetchTrending,
  giphyFetch,
} from 'services/giphy';

const GiphyModal = () => {
  const [isLoading, setLoading] = useState(true);
  const [giphyResults, setGiphyResults] = useState([]);

  const fetchGifs = () =>  {
    const data = giphyFetch.categories()
  }

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setLoading(false);
        setGiphyResults(data);
      })
      .catch((err) => console.log(err));
  }, []);


  console.log('results: ', giphyResults.map(result => result.gif));
  return (
    <div className="giphy-modal">
      <div className="gif-container">
        {isLoading ? (
          <h1 style={{color: 'white'}}>Loading</h1>
        ) : (
          // giphyResults.map((result) => {
          //   const image = result.gif.images.downsized.url;

          //   return <div key={result.id} style={{color: 'white'}}>
          //     <img src={image} alt=""/>
          //   </div>;
          // })
          <Grid width={800} columns={3} gutter={6} fetchGifs={giphyResults.map(result => result.gif)} />
        )}
      </div>
    </div>
  );
};

export default GiphyModal;
